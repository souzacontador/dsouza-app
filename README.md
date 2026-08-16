# DSouza — Herramientas Fiscales

Colección de calculadoras y utilidades fiscales de **DSouza Consultores Fiscales**, publicadas como sitio web estático mediante GitHub Pages.

**Sitio en vivo:** https://souzacontador.github.io/dsouza-app/

## Herramientas disponibles

| Herramienta | URL |
|---|---|
| Menú principal | https://souzacontador.github.io/dsouza-app/ |
| Calculadora de IVA y Retenciones (2026) | https://souzacontador.github.io/dsouza-app/iva-retenciones/ |

## Estructura del proyecto

Cada calculadora vive en **su propia carpeta**, con su propio `index.html` autocontenido (HTML, CSS y JS embebidos en un solo archivo). El `index.html` de la raíz es la página menú que enlaza a todas.

```
dsouza-app/
├── index.html              Página menú (lista de herramientas)
└── iva-retenciones/
    └── index.html          Calculadora de IVA y Retenciones
```

## Cómo agregar una nueva calculadora

1. **Crea la carpeta con su archivo.** En GitHub: *Add file → Upload files*. Antes de subir, en la barra de ruta superior escribe el nombre de la carpeta seguido de `/` (por ejemplo `nomina/`) y sube el archivo como `index.html`. Quedará en `dsouza-app/nomina/index.html` y su URL será `.../dsouza-app/nomina/`.

2. **Agrégala al menú.** Edita el `index.html` de la raíz y duplica el bloque `<a class="card">` (hay un comentario que indica dónde). Cambia el `href` a la carpeta nueva, el título y la descripción.

## Notas

- Las calculadoras son archivos estáticos autocontenidos: no requieren servidor, base de datos ni dependencias externas.
- Herramientas de apoyo interno: no sustituyen el análisis del caso concreto.

## Autor

C.P. Daniel Souza Vázquez — DSouza Consultores Fiscales · Mexicali, B.C.

## Licencia

Uso personal. Todos los derechos reservados salvo indicación en contrario.
