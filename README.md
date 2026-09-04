# Práctica de Git — Tecnologías de Desarrollo en el Servidor

Repositorio de práctica para la Tarea 2: Introducción a Git y control de versiones.

Autor: Angel Ibarbarin
EOF
cat >> README.md << 'EOF'

## Los tres estados principales de Git

Git organiza el trabajo en tres áreas:

1. **Working Directory (directorio de trabajo):** es la carpeta del proyecto tal como
   la ves en tu computadora. Aquí creas y modificas archivos libremente; Git detecta
   los cambios pero todavía no los registra.

2. **Staging Area (área de preparación):** es una zona intermedia donde se colocan los
   cambios que quieres incluir en el próximo commit. Permite elegir qué se guarda y qué
   no, en lugar de registrar todo de golpe.

3. **Repository (repositorio):** es el historial del proyecto. Cuando se confirma un
   commit, los cambios quedan guardados de forma permanente con autor, fecha y mensaje.

- `git add` mueve los cambios del Working Directory al Staging Area.
- `git commit` toma lo que está en el Staging Area y lo guarda como una nueva versión
  en el Repository.

  ## Ramas y fusión (merge)

**¿Qué es una rama?** Una rama es una línea de desarrollo independiente dentro del mismo
repositorio. Al crear una rama, Git genera un puntero que avanza con sus propios commits
sin modificar la rama principal, de modo que se puede trabajar en algo nuevo sin poner en
riesgo el código que ya funciona.

**¿Por qué los equipos usan ramas?**

- Cada persona o cada nueva funcionalidad trabaja por separado, sin pisarse el trabajo.
- La rama principal (`main`) se mantiene siempre estable y lista para publicarse.
- Permiten probar ideas o corregir errores de forma aislada y descartarlas si no funcionan.
- Facilitan la revisión de código antes de integrar los cambios.

**¿Qué hace `git merge`?** Toma los commits de una rama y los integra en la rama en la que
estás parado, combinando los cambios de ambas. Si las dos ramas modificaron las mismas
líneas de un archivo, Git no puede decidir solo y avisa de un *conflicto*, que debe
resolverse manualmente antes de completar la fusión.

En esta práctica se creó la rama `feature/saludo`, se agregó en ella la función `saludar()`
y después se fusionó con `main` mediante `git merge`.

## El archivo .gitignore

**¿Para qué sirve?** Es un archivo de texto donde se listan los archivos y carpetas que Git
debe ignorar. Todo lo que coincida con esos patrones no aparece en `git status` ni puede
agregarse por accidente con `git add`, de modo que nunca llega al historial del repositorio.

**¿Por qué no se incluye `node_modules`?**

- Contiene las dependencias descargadas desde npm: son miles de archivos y cientos de
  megabytes que harían el repositorio enorme y lento de clonar.
- No es código propio del proyecto, sino código de terceros.
- Es reproducible: cualquier persona puede regenerar la carpeta ejecutando `npm install`,
  porque las dependencias y sus versiones ya están declaradas en `package.json`.

**¿Por qué `.env` no debe publicarse?** Ese archivo guarda variables de entorno sensibles:
contraseñas de bases de datos, llaves de API, tokens de acceso. Si se sube al repositorio
—sobre todo a uno público— esa información queda expuesta a cualquiera y puede usarse para
acceder a los sistemas reales. Además, cada entorno (desarrollo, pruebas, producción)
necesita valores distintos. La práctica habitual es ignorar `.env` y versionar en su lugar
un `.env.example` con los nombres de las variables pero sin los valores reales.