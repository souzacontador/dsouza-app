# DSouza — App (PWA)

Aplicación web progresiva (PWA) construida con **HTML5, CSS3 y JavaScript vanilla (ES6+)**, sin frameworks ni dependencias. Es instalable en el dispositivo y funciona sin conexión.

**App en vivo:** https://souzacontador.github.io/dsouza-app/

## Características

- **Instalable** como app nativa en móvil y escritorio (Add to Home Screen).
- **Funciona sin conexión** gracias a un Service Worker que cachea el "app shell".
- **Indicador de estado de conexión** en tiempo real (en línea / sin conexión).
- **Página de respaldo offline** cuando no hay red ni caché disponible.
- Diseño oscuro, responsivo y accesible, pensado también para pantallas pequeñas.
- Cero dependencias externas.

## Cómo usar la app

1. Abre https://souzacontador.github.io/dsouza-app/ en tu navegador.
2. En móvil: usa el menú del navegador y elige **"Agregar a pantalla de inicio"** / **"Instalar app"**.
3. En escritorio (Chrome/Edge): haz clic en el botón **"Instalar app"** o en el ícono de instalación de la barra de direcciones.
4. Una vez cargada, la app seguirá funcionando aunque pierdas la conexión.

## Estructura del proyecto

```
dsouza-app/
├── index.html                  Página principal
├── manifest.json               Configuración de la PWA (nombre, iconos, colores)
├── sw.js                       Service Worker (caché y modo offline)
├── offline.html                Página mostrada cuando no hay conexión
├── css/
│   └── styles.css              Estilos de la aplicación
├── js/
│   └── app.js                  Lógica: contador, instalación, conexión, SW
└── icons/
    ├── icon-192.png            Icono 192×192
    ├── icon-512.png            Icono 512×512
    └── icon-512-maskable.png   Icono maskable (Android)
```

## Ejecutar en local

Un Service Worker **requiere HTTPS o localhost** para funcionar; no basta con abrir `index.html` como archivo (`file://`). Levanta un servidor local sencillo:

Con Python:

```
python3 -m http.server 8000
```

Con Node (npx):

```
npx serve
```

Luego abre `http://localhost:8000` en tu navegador.

## Tecnologías

HTML5 · CSS3 · JavaScript vanilla (ES6+) · Web App Manifest · Service Worker · Cache API

## Autor

**C.P. Daniel Souza Vázquez** — DSouza

## Licencia

Uso personal. Todos los derechos reservados salvo indicación en contrario.
