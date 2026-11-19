# Spikes

Spikes: pequeñas investigaciones con datos, hechas con HTML y CSS y publicadas en GitHub Pages. Salen de datasets del máster en IA y de otras cosas que me han dado curiosidad. Usan el mismo diseño que mi web ([cesaenv.github.io](https://cesaenv.github.io)).

Por ahora:

- Humanos frente a bots (clustering de sesiones de un log web)
- Reconocer dígitos (CNN sobre MNIST con demo de dibujo en el navegador)

## Cómo está organizado

Cada investigación es una carpeta con su `index.html` (la pregunta, los datos, el método, los gráficos y la conclusión) y su subcarpeta `figuras/`. Lo común está en `shared/` (la cabecera y el botón de tema) y el menú es el `index.html` de la raíz. El código pesado (cuadernos, modelos, datos) vive en el repositorio de cada proyecto y aquí solo se enlaza.

Los colores y la tipografía vienen de `https://cesaenv.github.io/theme.css`, el mismo archivo que usa mi web, así que aquí solo se usan las variables del tema (`--bg`, `--surface`, `--accent`...) y nunca colores sueltos.

## Probarlo en local

```
python -m http.server 8000
```

y abrir http://localhost:8000.

## Añadir un spike

1. Copiar `_plantilla/` con el nombre de la nueva carpeta y rellenar el `index.html`.
2. Poner los gráficos en su `figuras/` (PNG ligeros; los datos grandes no se suben).
3. Añadir la tarjeta en el `index.html` de la raíz.
