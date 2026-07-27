# Introducción

¡Oh, lector! Si has llegado hasta aquí, es porque tu curiosidad
—o tu necesidad— te ha traído al mundo de mejia. No esperes
nubes de azúcar ni abstracciones vaporosas: aquí todo es fiero,
concreto y bien medido.

## Hola Mundo

Y allévese el primer ejemplo, que en todo lenguaje de programación
es costumbre comenzar con un saludo al mundo:

```mejia
función principal() -> Entero32 {
    retornar 42;
}
```

Mas habréis de notar que no imprimimos «¡Oh, Mundo!» sino que
retornamos cuarenta y dos, que es número de hondo significado
—y además, el código de salida del proceso.

Compilar y ejecutar:

```bash
mejia build ejemplo.fc
./ejemplo.exe
echo $?  # → 42
```

## Estructura de un programa

Un programa en mejia no es cosa desordenada, sino secuencia
de **declaraciones top-level** que se alinean como soldados:

- **Funciones**: `función nombre(params) -> Tipo { ... }`
- **Structs**: `estructural Nombre { ... }`
- **Enums**: `enumeración Nombre { ... }`

El punto de entrada es la función `principal`, que retorna un entero
—el código de salida del proceso, como ya se ha dicho.

## Comandos CLI

El compilador obedece a estos mandatos:

```bash
mejia build <archivo.fc>   # Compila a binario .exe
mejia run   <archivo.fc>   # Compila y ejecuta en un suspiro
mejia check <archivo.fc>   # Sólo análisis, sin engendrar binario
mejia lsp                   # Servidor LSP (por stdio, como los hidalgos)
mejia version               # Muestra la versión del artefacto
```

