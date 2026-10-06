# Pipeline de assets y QA

Herramientas de apoyo. Nada de esto se ejecuta en producción.

## Assets

```bash
python3 build_assets.py
```
Fotografía original → WebP (borde largo 1800–2400 px) y logotipos → máscaras
alpha en modo LA. Escribe `assets.manifest.json` con dimensiones, proporciones y
el color medio de cada foto.

```bash
swiftc -O -o transcode transcode.swift
./transcode <entrada> <salida> <ancho> <kbps vídeo> <kbps audio|0>
```
Transcodificador H.264 con bitrate explícito. Existe porque `avconvert`, lo
único disponible en macOS sin Homebrew, no permite fijarlo: producía 21 MB para
23 segundos de vídeo.

```bash
swiftc -O -o grab grab.swift
./grab <entrada> <carpeta> <prefijo> <ancho> <t1> [t2 …]
```
Extrae fotogramas. Se usó para los pósters y para las portadas de HOM y Yupick.

## QA visual

Requiere Chrome con el puerto de depuración abierto:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-cdp about:blank &
```

```bash
node shoot.mjs      <url> <carpeta> <ancho> <alto> <etiqueta> [nº tiras]
node shoot-one.mjs  <url> <salida.png> <ancho> <alto> <js|-> [reduced]
node audit.mjs      <url> [ancho] [alto]
```

`shoot-one.mjs` admite JS previo a la captura (por ejemplo abrir el menú) y el
modo `reduced` para emular `prefers-reduced-motion`.
`audit.mjs` mide con la caché desactivada y reporta errores de consola, recursos
fallidos, códigos 4xx/5xx y el peso de la primera carga por tipo.
