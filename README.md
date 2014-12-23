Cookies-warning
===============

Aviso de Cookies genérico en JS puro (no necesita JQuery ni similar).

<h3>Demo de funcionamiento / testeo</h3>

![Smaple snapshop](https://raw.github.com/carloscabo/cookies-warning/master/snapshot.png)

<h3>Demo de funcionamiento auto-init/ estilo 2</h3>

![Smaple snapshop](https://raw.github.com/carloscabo/cookies-warning/master/snapshot2.png)

## Requerimientos

`cookies-warning.js`  
`cookies-warning-locales.js`  
`cookies-warning.css`

**Solo es necesario incluir el `cookies-warning.js`, los otros dos son automáticamente incluídos desde el primero.**

`<script src="/path/cookies-warning.js"></script>`

## Abstract

Aviso de aceptación de Política de Cookies con soporte para internacionalización, personalización de colores básicos, responsive y con un icono SVG (con colores personalizables).

Se ha usado un **_append_** de JS ya que así se evita que los buscadores indexen el mensaje de cookies como _contenido de la páginas_, esto es especialmente importante si el mensaje de cookies se coloca en la parte superior de la página antes de los contenidos.

## Internacionalización

Las internacionalizaciones se encuentran en el fichero:  
`cookies-warning-locales.js`

Hay un fichero a parte con el string que se imprime para cada idioma dependiendo del código que se le pase. **Si no se le pasa ningún código de idioma cogerá por defecto el primer idioma del fichero de locales**.

Se recomienda que los language codes sean en el siguiente formato.  
**es**  
**es-ES**  
...  
**51-AAA-bkk** _(este es el formato más largo en los ISO)_  

Más sinfo sobre language codes:  
<http://msdn.microsoft.com/en-us/library/ee825488(v=cs.20).aspx>  
<http://en.wikipedia.org/wiki/Language_code>

## Mensaje personalizado SIN usar el fichero de locales

Si nos interesa pasar un mensaje personalizado para el aviso, SIN usar el fichero de locales, podemos hacerlo empleando el parámetro `msg` en la inicialización de CW de la siguiente forma:

    <script type="text/javascript">
      window.onload = function() {
        CW.init({
          msg: 'Este es mi mensaje personal <a href="#" id="cookies-warning-close">Acept</a>'
        });
      };
    </script>

## Donde se inserta el aviso

Por defecto si no pasamos ningún parámetro adicional el mensaje de cookies **se insertará al final del `body`**, si queremos que se inserte en otra posición del DOM debemos pasarle el ID del elemento **delante del cual se insertará**, por ejemplo el siguiente código insertará el aviso **antes** del elemento con el **id** `page_container`:

    <script type="text/javascript">
      window.onload = function() {
        CW.init({
          lang: 'es',
          before_element_ID: 'page_container'
        });
      };
    </script>

## Cerrar el aviso de cookies

Si dentro del contenido del aviso de cookies existe algún elemento con el **id** `cookies-warning-close` se asume que ese es el elemento que debe pulsarse para cerrar el aviso.

Si no existe ningún elemento con ese ID haciendo click en cualquier parte dentro del aviso este se cerrará.

## Mostrar solamente una vez

En algunos sitios asumen que el aviso solo debe mostrarse una primera vez y que el usuario acepta la política implícitamente, eso se puede hacer pasando un tercer parámetro a `true`.

    <script type="text/javascript">
      window.onload = function() {
        CW.init({
          lang: 'es',
          before_element_ID: 'page_container',
          show_only_once: true
        });
      };
    </script>

Ten en cuenta que esta funcionalidad podría no funcionar correctamente en entornos locales (usando localhost:xxxx para pruebas, por ejemplo) ya que puede encontrar problemas para establecer el dominio al que asociar la cookie. Estos problemas deberían solucionarse si utilizas alguna herramienta que te permita utilizar nombres de dominio en local del tipo "aplication.dev" como [pow](http://pow.cx/ "pow") o directamente al publicar en un entorno de producción o pruebas.

## Especificar un dominio y todos sus subdominios

Por defecto las cookies que se escriben se asocian al dominio que devuelve `window.location.hostname`. Esto hace que el aviso de cookies pueda estar asociado a un **subdominio**.

Imaginemos que entramos en `http://subdominio.dominio.com` y aceptamos el aviso de cookies, cuando entremos en el root del site `http://dominio.com` al estar la cookie asociada al subdominio **el aviso nos volverá a aparecer y deberemos volver a aceptarlo**.

Si queremos que el aviso de cookies se aplique a lo largo de todo el site, lo ideal es **forzar el dominio cuando inicializamos el aviso** de la siguiente forma.

    <script type="text/javascript">
      window.onload = function() {
        CW.init({
          lang: 'es',
          doamin: 'dominio.co.uk', // Forzar dominio padre de las cookies
          before_element_ID: 'page_container',
          show_only_once: true
        });
      };
    </script>


## Uso

Pasándole el código de lenguaje:

    <script type="text/javascript">
      window.onload = function() {
        CW.init({
          lang: 'es'
        });
      };
    </script>

Pasándole el código de lenguaje desde rails:

    <script type="text/javascript">
      window.onload = function() {
        CW.init({
          lang: '<%= I18n.locale %>'
        });
      };
    </script>

Pasándole directamente un string:

    <script type="text/javascript">
      window.onload = function() {
        CW.init({
          msg: '<b>Aviso de cookies</b><br>Mensaje personalizado<a href="/es/politica-cookies">modificar la configuración.</a>'
        });
      };
    </script>

Por defecto busca la hoja de estilos y el JS de locales en el mismo path que esté la propia librería en JS pero podemos poner un path personalizado cuando la inizializamos:

Pasándole directamente un string:

    <script type="text/javascript">
      window.onload = function() {
        CW.init({
          lang:'es',
          stylesheet: '/assets/css/cookies-warning.css',
          locales: '/assets/js/cookies-warning-locales.js'
        });
      };
    </script>

Si no queremos cargar los estilos desde la libreria porque ya estén cargados en la web (assetes pipeline de Ruby on Rails por ejemplo):

    <script type="text/javascript">
      window.onload = function() {
        CW.init({
          stylesheet: false
        });
      };
    </script>

Si usas JQuery puedes llamarlo dentro del un `$.domready` normal que se ejecutará cuando esté listo el DOM de la página en vez de esperar a que se cargue la página completa, esto es más adecuado que emplear el `window.onload`.

    <script type="text/javascript">
      $(document).ready(function() {
        CW.init({
          lang: 'es',
          before_element_ID: 'page_container'
        });
      });
    </script>

## Autoloading

Si se incluye el JS con la opción "autoloading" intentará hacer todo el proceso, con las opciones por defecto... está sería así:

    <script src="cookies-warning.js?auto_init"></script>

Si queremos especificar un idioma diferente del definido por defecto en el autoloading podemos pasarlo al final del path del script con `lang=XX`. Por ejemplo:

    <script src="cookies-warning.js?auto_init&lang=en"></script>

## SVG

Para hacer el iconito de _información_ he usado un SVG inline. Es lo más pequeño que se me ha ocurrido (dos círculos y un cuadrado). La ventaja del SVG es que por CSS también se puede cambiar el fondo y el color de la "i" (ver estilos en `cookies-warning.css`).

La desventaja es que en IE8 no se vé, pero tampoco pasa nada.

## To-do

Añadir soporte para que el evento de onclick en el botón de cerrar no machaque otros eventos como por ejemplo los de **Google Tag Manager**.
