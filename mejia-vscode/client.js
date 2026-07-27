// Mejia LSP Client — Conecta VS Code con el servidor LSP de Mejia
// Se ejecuta como child process via stdio (mejia lsp)

const vscode = require('vscode');
const path = require('path');
const { LanguageClient, TransportKind } = require('vscode-languageclient/node');

let client = null;

/**
 * Activar la extensión — inicia el cliente LSP
 */
function activate(context) {
    // Buscar el ejecutable mejia
    const falcatoExe = findFalcato();
    if (!falcatoExe) {
        vscode.window.showWarningMessage(
            'Mejia: No se encontró "mejia" en PATH. ' +
            'Instálalo desde https://github.com/mejia/mejia'
        );
        return;
    }

    console.log(`Mejia: LSP usando ${falcatoExe}`);

    const serverOptions = {
        run: { command: falcatoExe, args: ['lsp'] },
        debug: { command: falcatoExe, args: ['lsp'] }
    };

    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'mejia' }],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.fc')
        },
        diagnosticCollectionName: 'mejia'
    };

    client = new LanguageClient(
        'mejia',
        'Mejia Language Server',
        serverOptions,
        clientOptions
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('mejia.version', () => {
            const exec = require('child_process').execSync;
            try {
                const output = exec(`${falcatoExe} version`).toString().trim();
                vscode.window.showInformationMessage(`Mejia ${output}`);
            } catch (e) {
                vscode.window.showErrorMessage('Mejia: Error al obtener versión');
            }
        })
    );

    client.start();
}

/**
 * Desactivar la extensión — detiene el cliente LSP
 */
function deactivate() {
    if (client) {
        return client.stop();
    }
}

/**
 * Buscar mejia en PATH o en rutas comunes
 */
function findFalcato() {
    // 1. Buscar en PATH
    const which = require('child_process').execSync;
    try {
        const result = which('where mejia', { encoding: 'utf8', timeout: 3000 });
        const paths = result.trim().split('\n');
        if (paths.length > 0 && paths[0].trim()) {
            return paths[0].trim();
        }
    } catch (e) {
        // No está en PATH
    }

    // 2. Buscar en %USERPROFILE%\.mejia\bin
    const homePath = process.env.USERPROFILE || process.env.HOME;
    if (homePath) {
        const localPath = path.join(homePath, '.mejia', 'bin', 'mejia.exe');
        const fs = require('fs');
        if (fs.existsSync(localPath)) {
            return localPath;
        }
    }

    // 3. Buscar al lado de la extensión
    try {
        const extPath = path.join(__dirname, '..', 'mejia.exe');
        if (require('fs').existsSync(extPath)) {
            return extPath;
        }
    } catch (e) {}

    // 4. Buscar en directorio de desarrollo
    try {
        const devPaths = [
            path.join(__dirname, '..', 'target', 'release', 'mejia.exe'),
            path.join(__dirname, '..', 'target', 'debug', 'mejia.exe'),
        ];
        const fs = require('fs');
        for (const p of devPaths) {
            if (fs.existsSync(p)) return p;
        }
    } catch (e) {}

    return null;
}

module.exports = { activate, deactivate };
