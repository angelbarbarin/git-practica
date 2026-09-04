# Práctica de Git — Tecnologías de Desarrollo en el Servidor

Repositorio de práctica para la Tarea 2: Introducción a Git y control de versiones.

Autor: Angel Ibarbarin

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

## Parte 1 — Investigación

### ¿Qué es un sistema de control de versiones?

Es una herramienta que registra y conserva el historial de cambios de un proyecto a lo
largo del tiempo, permitiendo saber qué se modificó, cuándo, quién lo hizo y por qué, así
como regresar a cualquier versión anterior.

**Qué problema resuelve.** Sin control de versiones, la única forma de conservar estados
anteriores es duplicar carpetas (`proyecto_final`, `proyecto_final_v2`,
`proyecto_final_bueno_este_si`). Ese método falla rápido: nadie sabe cuál es la versión
vigente, no hay registro del motivo de cada cambio, y si dos personas editan el mismo
archivo, uno de los dos trabajos se pierde al copiarse encima del otro.

**Ventajas frente a guardar copias manuales:**

| Copias manuales | Control de versiones |
|---|---|
| Se duplica el proyecto completo | Solo se guardan las diferencias entre versiones |
| No se sabe qué cambió entre copias | Cada cambio queda documentado línea por línea |
| No hay explicación del cambio | Cada commit lleva autor, fecha y mensaje |
| Difícil volver atrás con precisión | Se puede regresar a cualquier punto exacto |
| El trabajo simultáneo se pisa | Ramas y merges permiten trabajo paralelo |
| Copia local, se pierde con el equipo | Respaldo distribuido en cada clon y en el remoto |

### ¿Qué es Git?

Git es un sistema de control de versiones distribuido y de código abierto.

- **Quién lo creó:** Linus Torvalds, el creador de Linux.
- **En qué año:** en 2005.
- **Para qué proyecto:** para el desarrollo del kernel de Linux. El equipo usaba una
  herramienta llamada BitKeeper y perdió el permiso para seguir usándola gratuitamente, así
  que Torvalds desarrolló su propio sistema en pocas semanas, con tres prioridades:
  velocidad, un diseño simple y soporte real para el desarrollo distribuido con miles de
  colaboradores en paralelo.

**Qué significa que sea distribuido.** En los sistemas centralizados anteriores (como CVS o
Subversion) existía un único servidor con el historial completo; los desarrolladores solo
tenían una copia de trabajo y dependían de la conexión al servidor para casi cualquier
operación. En Git, **cada clon del repositorio contiene el historial completo**. Esto
implica que:

- Se puede trabajar sin conexión: crear commits, ramas y consultar el historial es local.
- Las operaciones son mucho más rápidas, porque no viajan por la red.
- Cada copia funciona como respaldo del proyecto entero.
- No existe un servidor imprescindible; el repositorio "oficial" lo es por convención del
  equipo, no por una limitación técnica.

## Parte 2 — Git vs GitHub

**Git** es el programa de control de versiones que se instala y ejecuta en la computadora.
**GitHub** es un servicio web que aloja repositorios Git en internet y agrega herramientas
de colaboración alrededor de ellos. Git funciona perfectamente sin GitHub; GitHub no existe
sin Git.

| | Git | GitHub |
|---|---|---|
| Qué es | Software de control de versiones | Plataforma web que aloja repositorios |
| Dónde se ejecuta | En tu computadora | En servidores en internet |
| Creado por | Linus Torvalds (2005) | Chris Wanstrath y socios (2008); hoy de Microsoft |
| Requiere internet | No | Sí |
| Aporta | Commits, ramas, merges, historial | Respaldo remoto, pull requests, issues, Actions |
| Alternativa | Mercurial, Subversion | GitLab, Bitbucket |

**Plataformas similares:**

- **GitLab** (2011): plataforma completa de DevOps. Su rasgo distintivo es que puede
  instalarse en servidores propios de la organización (*self-hosted*), algo valorado por
  empresas con requisitos de control o privacidad de datos, y que incluye CI/CD integrado
  desde el inicio.
- **Bitbucket** (2008, de Atlassian): su ventaja principal es la integración nativa con el
  resto de herramientas de Atlassian, sobre todo Jira y Trello, por lo que es común en
  equipos que ya gestionan proyectos con ese ecosistema.

## Parte 3 — Entorno de trabajo

- **Sistema operativo:** Windows
- **Versión de Git:** git version 2.47.1.windows.2
- **Comando utilizado para verificar la instalación:** `git --version`
- **Comandos de configuración:**
  `git config --global user.name "..."` y `git config --global user.email "..."`

## Parte 9 — El ciclo normal de trabajo

    Modificar código  →  git status  →  git diff  →  git add  →  git commit  →  git push
                                                                        ↑            │
                                                                        └── ¿más cambios?

Se revisa el estado, se confirma qué cambió, se selecciona lo que entra al commit, se
registra en el historial local y, cuando el trabajo está listo, se envía al remoto.

## Parte 14 — Repositorio local y remoto

Un cambio recorre cuatro espacios hasta llegar a GitHub:

    Working Directory  ──git add──▶  Staging Area  ──git commit──▶  Repositorio local
                                                                            │
                                                                       git push
                                                                            ▼
                                                                  Repositorio remoto
                                                                       (GitHub)
                                                                            │
                                                                    git pull / git clone
                                                                            ▼
                                                                  Otra copia local

Los tres primeros espacios viven en la computadora; el cuarto está en internet. Nada llega
a GitHub por sí solo: hace falta un `git push` explícito.

## Parte 17 — push, pull y trabajo colaborativo

- **`git push`** envía al repositorio remoto los commits que existen en el local.
- **`git pull`** trae del remoto los commits que otras personas subieron y los integra en
  la copia local.
- **`git clone`** crea una copia local completa de un repositorio remoto, con todo su
  historial y sus ramas, y deja configurado el remoto `origin`.

En equipo, el ciclo habitual es: `git pull` antes de empezar para partir de la versión más
reciente, trabajar y hacer commits, y `git push` al terminar. Hacer `pull` con frecuencia
reduce los conflictos, porque las diferencias entre versiones se mantienen pequeñas.

## Preguntas finales

**1. ¿Qué diferencia existe entre `git add` y `git commit`?**
`git add` prepara: mueve los cambios del directorio de trabajo al Staging Area, indicando
qué se quiere incluir en la próxima versión, pero no guarda nada en el historial.
`git commit` confirma: toma exactamente lo que está preparado y lo registra como una versión
permanente con autor, fecha, mensaje e identificador único. En resumen, `add` elige y
`commit` guarda.

**2. ¿Qué ventaja tiene realizar varios commits pequeños en lugar de uno grande?**
Cada commit describe un cambio concreto, así que el historial se vuelve legible y explica la
evolución del proyecto. Si aparece un error, es posible identificar el commit exacto que lo
introdujo y revertir solo ese cambio, sin perder el resto del trabajo. Además, los commits
pequeños son más fáciles de revisar por otras personas y generan menos conflictos al
fusionar ramas. Un único commit gigante hace todo lo contrario: no se puede deshacer una
parte sin deshacerlo todo.

**3. ¿Qué diferencia existe entre Git y GitHub?**
Git es el sistema de control de versiones que se ejecuta localmente y gestiona el historial;
GitHub es una plataforma en internet que aloja repositorios Git y añade colaboración: pull
requests, issues, control de acceso y automatización. Git es la herramienta, GitHub es el
lugar donde se comparte lo que la herramienta produce.

**4. ¿Qué problema resuelven las ramas?**
Permiten desarrollar cambios de forma aislada sin afectar el código estable. Resuelven dos
problemas concretos: poder trabajar en una funcionalidad nueva o en una corrección sin
romper lo que ya funciona en `main`, y permitir que varias personas avancen en paralelo
sobre el mismo proyecto sin sobrescribirse. Si un experimento no resulta, la rama se
descarta sin consecuencias.

**5. ¿Qué información no debería normalmente almacenarse en Git?**
- Credenciales y datos sensibles: contraseñas, llaves de API, tokens, archivos `.env`.
- Dependencias descargables, como `node_modules/`, que se regeneran con `npm install`.
- Archivos generados automáticamente: compilados, `build/`, `dist/`, logs, cachés.
- Archivos propios del sistema o del editor: `.DS_Store`, `Thumbs.db`, configuraciones
  personales del IDE.
- Archivos binarios muy pesados, que hacen crecer el repositorio de forma irreversible.
- Datos personales o confidenciales de usuarios.

Vale la pena subrayar el caso de las credenciales: como Git conserva todo el historial,
borrar una contraseña en un commit posterior **no la elimina** —sigue siendo visible en el
commit anterior—, por lo que la única solución real es rotar esa credencial.

**6. ¿Qué ocurriría si borras tu proyecto local pero está publicado en GitHub?**
No se pierde nada de lo que se haya subido: basta con ejecutar `git clone` para recuperar el
proyecto completo, incluido todo el historial de commits y las ramas, porque cada clon es un
repositorio íntegro. Las dos excepciones son los commits que nunca se enviaron con `git push`
y los archivos excluidos por `.gitignore` (por ejemplo `.env`), que nunca llegaron al remoto
y sí se perderían.

**7. ¿Por qué Git es especialmente importante cuando varias personas trabajan sobre el mismo proyecto?**
Porque resuelve el problema central del trabajo simultáneo: que dos personas modifiquen el
mismo proyecto sin destruir el trabajo de la otra. Git fusiona automáticamente los cambios
que no se solapan y, cuando sí lo hacen, detecta el conflicto y obliga a resolverlo en lugar
de sobrescribir en silencio. Además deja constancia de la autoría de cada línea, permite
revisar los cambios antes de integrarlos y mantiene una versión estable mientras cada
persona trabaja en su propia rama.

**8. ¿Cuál es la diferencia entre `git clone`, `git pull` y `git push`?**
`git clone` se usa una sola vez, al principio: descarga un repositorio remoto completo y crea
la copia local. `git pull` se usa de forma recurrente: trae los commits nuevos del remoto y
los integra en la copia que ya existe. `git push` va en sentido contrario: sube al remoto los
commits hechos localmente. Es decir, `clone` inicia, `pull` baja y `push` sube.

**9. ¿Por qué un commit no aparece automáticamente en GitHub?**
Porque Git es distribuido: el commit se guarda en el repositorio **local**, que es completo e
independiente y no necesita conexión para funcionar. GitHub es solo otra copia del
repositorio, y no se entera de nada hasta que se le envían los cambios explícitamente con
`git push`. Este comportamiento es intencional: permite trabajar sin internet y decidir en
qué momento el trabajo está listo para compartirse.