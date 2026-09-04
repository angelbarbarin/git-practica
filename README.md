cat > README.md << 'EOF'
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
EOF