# Lenguaje de Programación Mejia

**El primer lenguaje de programación de sistemas en español pensado para la educación universitaria y el desarrollo de compiladores.**

Mejia es un lenguaje de programación de bajo nivel compilado de forma nativa a `x86_64` sobre **Cranelift** como backend estratégico. Diseñado con una semántica basada en la gramática española, Mejia aprovecha conceptos lingüísticos naturales para enseñar conceptos avanzados de ingeniería de software como el control de ciclo de vida de memoria (ownership), la mutabilidad estricta, la asincronía y el diseño de compiladores.

---

## 🎯 ¿Por qué Mejia para Universitarios?

Mejia no es simplemente una traducción de palabras clave al español. Es un proyecto educativo y tecnológico diseñado para estudiantes y docentes de ciencias de la computación que deseen:

1. **Aprender Sistemas y Compiladores Sin Barreras**: Explicar y programar conceptos como el *borrow checker*, la convención de llamadas de C y la compilación AOT de forma intuitiva.
2. **Entender el Ownership y Ciclo de Vida de Memoria**: A través de artículos gramaticales en español (`el` / `la`) que definen naturalmente las reglas de posesión y referencia.
3. **Explorar el Backend Cranelift**: Una alternativa moderna y ligera a LLVM, ideal para estudiar la generación de código SSA (Static Single Assignment) y la compilación ultrarrápida.

---

## 💡 Conceptos Clave y Filosofía

Mejia integra las dimensiones gramaticales del español en garantías de compilación:

* **Pilar I: Artículo = Ownership**:
  - `el` define posesión exclusiva y mutable (Affine/Owned type).
  - `la` define una referencia inmutable prestada (Borrowed type).
  - `un` define opcionalidad (`Option`).
* **Pilar II: Ser vs Estar**:
  - `es` representa identidad permanente e inmutable (Constante).
  - `está` representa estado temporal y mutable (Variable mutable).
* **Pilar III: Subjuntivo**:
  - Expresa flujos de ejecución condicionales de baja probabilidad (*cold branches*), optimizando el rendimiento de salto del procesador en tiempo de compilación.

---

## 🚀 Inicio Rápido (3 Pasos)

### 1. Requisitos
- Windows 10/11 de 64 bits.
- Visual Studio Build Tools (para el linker nativo de MSVC).

### 2. Instalación
Descarga la última versión del compilador y ejecuta el instalador interactivo en PowerShell:
```powershell
.\install.ps1
```
El instalador agregará automáticamente `mejia.exe` a tu PATH y configurará la extensión oficial para VS Code con resaltado de sintaxis y LSP (Language Server Protocol).

### 3. Ejecuta tu primer programa
Crea un archivo llamado `principal.fc` (los archivos fuente usan la extensión `.fc` por su compilador original):
```fc
función principal() -> Entero32 {
    decir("¡Hola, mundo desde el Lenguaje Mejia!");
    retornar 0;
}
```

Compila y ejecútalo directamente desde la consola:
```bash
mejia run principal.fc
```

---

## 🛠️ Herramientas Disponibles

El CLI de Mejia incluye todo lo necesario para empezar a programar:
* `mejia check <archivo.fc>` — Realiza el análisis sintáctico y semántico completo (ideal para verificar errores rápidamente).
* `mejia build <archivo.fc>` — Compila el código fuente y genera un binario ejecutable nativo (`.exe`).
* `mejia run <archivo.fc>` — Compila y ejecuta el programa de forma inmediata.
* `mejia lsp` — Inicia el servidor de lenguaje para autocompletado, hover e ir a la definición en tu editor favorito.

---

## 🎓 Ejemplos Educativos

### 1. Variables, Ser y Estar
```fc
// "es" define una constante (identidad permanente)
el PI es 3.14159;

// "está" define un estado temporal (mutable)
el contador está 0;
mientras contador < 10 {
    contador = contador + 1;
}
```

### 2. Concordancia Lingüística y Referencias (Ownership)
El analizador semántico de Mejia verifica la concordancia gramatical:
```fc
estructural Vector {
    x: Entero32,
    y: Entero32
}

función duplicar(la v: &Vector) {
    // v es de tipo "la" (inmutable/prestado), intentar mutarlo dará error en compilación
    // v.x = v.x * 2; // [O001] Error de compilación: constante no es mutable
}
```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
