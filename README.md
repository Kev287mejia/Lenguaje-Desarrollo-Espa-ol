# Lenguaje de Programación Mejia

Mejia es un lenguaje de programación de sistemas de alto rendimiento con sintaxis y semántica estructuradas en español. El compilador genera binarios nativos para la arquitectura x86_64 (Windows/MSVC) utilizando Cranelift como backend de generación de código, garantizando compilaciones ultrarrápidas y compatibilidad directa con C ABI.

Este proyecto está diseñado tanto para la producción de software de infraestructura como para servir de herramienta educativa en facultades de ingeniería y ciencias de la computación, facilitando el estudio práctico de la teoría de lenguajes, análisis semántico, control de ciclo de vida de memoria y diseño de compiladores.

---

## Beneficios y Enfoque Universitario

Para estudiantes y docentes de ciencias de la computación, Mejia ofrece ventajas formativas clave al eliminar la capa de traducción conceptual:

* **Estudio Práctico de Compiladores**: Permite inspeccionar una infraestructura completa y moderna (desde la tokenización hasta el enlazado nativo) escrita con estándares de producción de la industria.
* **Modelo Educativo de Posesión (Ownership)**: Enseña conceptos complejos de gestión de memoria segura en tiempo de compilación utilizando artículos gramaticales en español (`el` para recursos con posesión exclusiva y mutable, `la` para referencias prestadas).
* **Compilación de Bajo Nivel Simplificada**: Facilita la comprensión de la arquitectura de computadoras y sistemas operativos al interactuar directamente con la memoria, tipos nativos y llamadas FFI del sistema (como la API Win32) sin recurrir a runtimes pesados ni recolectores de basura.

---

## Arquitectura y Stack Tecnológico

El compilador de Mejia ha sido construido desde cero utilizando Rust y componentes modulares de alto rendimiento:

* **Sintaxis y Lexer**: Desarrollado sobre **Logos**, permitiendo una tokenización extremadamente rápida y un mapeo preciso de ubicaciones de error (Spans) en el código fuente.
* **Parser**: Analizador sintáctico descendente manual (Pratt Parser) con recuperación de errores incorporada para continuar el análisis sintáctico tras encontrar fallos.
* **Análisis Semántico (Concordancia Lingüística)**: Valida la coherencia de tipos, mutabilidad, ámbitos de variables, monomorfización de genéricos y las reglas de préstamo de memoria (borrow checker gradual de Nivel 0 a 2).
* **Backend de Codegen**: Implementado con **Cranelift (v0.112)** para la generación de código intermedio SSA y compilación nativa AOT (Ahead-of-Time).
* **Language Server Protocol (LSP)**: Integrado con **tower-lsp** para proveer diagnósticos en tiempo real, autocompletado inteligente, información de firmas y navegación de definiciones directamente en editores como VS Code y Cursor.
* **Enlazador (Linker)**: Integra de forma automática el linker nativo de MSVC (`link.exe`) y realiza el auto-link del módulo trampolín para soportar ventanas y mensajería Win32 nativas.

---

## Flujo de Compilación (Pipeline)

El proceso de compilación sigue un flujo directo desde el código fuente hasta el archivo ejecutable final:

```
Código fuente (.fc) -> Lexer -> Parser -> Análisis Semántico -> Codegen (Cranelift) -> Código Objeto (.o) -> Enlazado (link.exe) -> Ejecutable (.exe)
```

---

## Características Principales del Lenguaje

* **Sistema de Tipos e Identidad**:
  - `es` define constantes y vínculos permanentes inmutables.
  - `está` define variables de estado temporal y mutables.
  - Artículos de ownership: `el` (posesión exclusiva/mutable), `la` (referencia/inmutable), `un` (valores opcionales), `los` (posesión compartida/con conteo de referencias).
* **Control de Flujo Avanzado**:
  - Condicionales e iteradores nativos (`si`, `sino`, `mientras`, `para`).
  - Uso del modo subjuntivo (`fuese`) para marcar rutas frías de ejecución (cold branches), permitiendo al backend Cranelift optimizar las instrucciones de salto del hardware.
* **Estructuras de Datos**:
  - Vectores dinámicos (`Vector<T>`) y cadenas en memoria dinámica (`Texto`) con sintaxis de métodos simplificada.
  - Arreglos estáticos de tamaño fijo (`[T; N]`).
  - Estructuras con diseño de memoria compatible con C ABI (`estructural`).
  - Enumeraciones con soporte para variantes de datos y coincidencia de patrones (pattern matching).
* **Programación Genérica**:
  - Soporte de tipos genéricos y constantes genéricas (const generics) con restricciones declarativas (`que Comparable` / `que Ordenable`).
* **Llamadas del Sistema y Entrada/Salida**:
  - Impresión e interpolación de texto seguras y nativas (`imprimir_linea("x = {x}")`).
  - Acceso a FFI sin configuración compleja para invocar funciones externas en C o APIs del sistema operativo.

---

## Guía de Inicio Rápido

### Requisitos Previos
* Sistema operativo Windows 10 o Windows 11 de 64 bits.
* Visual Studio Build Tools instalado (con herramientas de compilación de C++).

### Instalación
Para instalar el compilador en tu sistema local, extrae los archivos del paquete de distribución y ejecuta el instalador desde PowerShell:
```powershell
.\install.ps1
```
Este instalador copiará el ejecutable `mejia.exe` a tu directorio de usuario y configurará la extensión oficial para VS Code.

### Compilación y Ejecución
Para compilar y ejecutar un programa de forma directa:
```bash
mejia run ejemplos\hola_mundo.fc
```

Para generar un ejecutable optimizado de producción:
```bash
mejia build ejemplos\hola_mundo.fc -o mi_programa.exe --release
```

Para validar únicamente la sintaxis y tipos del código (sin compilar):
```bash
mejia check ejemplos\hola_mundo.fc
```
