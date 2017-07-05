Cookie-policy-consent
=====================

Aviso de Cookies genérico en JS puro (no necesita JQuery ni similar).

<h3>Demo de funcionamiento / testeo</h3>

![Smaple snapshop](https://raw.githubusercontent.com/carloscabo/cookie-policy-consent/master/snapshot.png)

<h3>Demo de funcionamiento auto-init/ estilo 2</h3>

![Smaple snapshop](https://raw.githubusercontent.com/carloscabo/cookie-policy-consent/master/snapshot2.png)

## Requerimientos

````javascript
cookie-policy-consent.js
cookie-policy-consent-locales.js
cookie-policy-consent.css
````

**Solo es necesario incluir el** `cookie-policy-consent.js` **, los otros ficheros son automáticamente incluídos desde el primero SOLO si hace falta.**

`<script src="/path/cookie-policy-consent.js"></script>`

## Abstract

Aviso de aceptación de Política de Cookies con soporte para internacionalización.

Se ha usado un **_append_** de JS ya que así se evita que los buscadores indexen el mensaje de cookies como _contenido de la páginas_, esto es especialmente importante si el mensaje de cookies se coloca en la parte superior de la página antes de los contenidos.

## Internacionalización

Las internacionalizaciones se encuentran en el fichero:
`cookie-policy-consent-locales.js`

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

````javascript
<script type="text/javascript">
  window.onload = function() {
    CPC.init({
      msg: 'Este es mi mensaje personal <a href="#" id="cookie-policy-consent-close">Acept</a>'
    });
  };
</script>
````

## Donde se inserta el aviso

Por defecto si no pasamos ningún parámetro adicional el mensaje de cookies **se insertará al final del `body`**, si queremos que se inserte en otra posición del DOM debemos pasarle el ID del elemento **delante del cual se insertará**, por ejemplo el siguiente código insertará el aviso **antes** del elemento con el **id** `page_container`:

````javascript
<script type="text/javascript">
  window.onload = function() {
    CPC.init({
      lang: 'es',
      before_element_ID: 'page_container'
    });
  };
</script>
````

## Cerrar el aviso de cookies

Si dentro del contenido del aviso de cookies existe algún elemento con el **id** `cookie-policy-consent-close` se asume que ese es el elemento que debe pulsarse para cerrar el aviso.

Si no existe ningún elemento con ese ID haciendo click en cualquier parte dentro del aviso este se cerrará.

También podemos forzar a que el aviso se cierre siempre pulsando en cualquier parte del mismo incluyendo el parámetro: `click_anywhere: true`, de la siguiente forma:

````javascript
<script type="text/javascript">
  window.onload = function() {
    CPC.init({
      lang: 'es',
      click_anywhere: true
    });
  };
</script>
````

## Mostrar solamente una vez

En algunos sitios asumen que el aviso solo debe mostrarse una primera vez y que el usuario acepta la política implícitamente, eso se puede hacer pasando un tercer parámetro a `true`.

````javascript
<script type="text/javascript">
  window.onload = function() {
    CPC.init({
      lang: 'es',
      before_element_ID: 'page_container',
      show_only_once: true
    });
  };
</script>
````

Ten en cuenta que esta funcionalidad podría no funcionar correctamente en entornos locales (usando localhost:xxxx para pruebas, por ejemplo) ya que puede encontrar problemas para establecer el dominio al que asociar la cookie. Estos problemas deberían solucionarse si utilizas alguna herramienta que te permita utilizar nombres de dominio en local del tipo "aplication.dev" como [pow](http://pow.cx/ "pow") o directamente al publicar en un entorno de producción o pruebas.

## Especificar un dominio y todos sus subdominios

Por defecto las cookies que se escriben se asocian al dominio que devuelve `window.location.hostname`. Esto hace que el aviso de cookies pueda estar asociado a un **subdominio**.

Imaginemos que entramos en `http://subdominio.dominio.com` y aceptamos el aviso de cookies, cuando entremos en el root del site `http://dominio.com` al estar la cookie asociada al subdominio **el aviso nos volverá a aparecer y deberemos volver a aceptarlo**.

Si queremos que el aviso de cookies se aplique a lo largo de todo el site, lo ideal es **forzar el dominio cuando inicializamos el aviso** de la siguiente forma.

````javascript
<script type="text/javascript">
  window.onload = function() {

    CPC.host = 'dominio.co.uk';
    //...
    CPC.init({
      lang: 'es',
      before_element_ID: 'page_container',
      show_only_once: true
    });
  };
</script>
````

## Uso

Pasándole el código de lenguaje:

````javascript
<script type="text/javascript">
  window.onload = function() {
    CPC.init({
      lang: 'es'
    });
  };
</script>
````

Pasándole el código de lenguaje desde rails:

````javascript
<script type="text/javascript">
  window.onload = function() {
    CPC.init({
      lang: '<%= I18n.locale %>'
    });
  };
</script>
````

Especificar una duración de la cookie (por defecto 999 días desde la fecha actual):

````javascript
<script type="text/javascript">
  window.onload = function() {
    CPC.init({
      expire_days: 2
    });
  };
</script>
````

Pasándole directamente un string:

````javascript
<script type="text/javascript">
  window.onload = function() {
    CPC.init({
      msg: '<b>Aviso de cookies</b><br>Mensaje personalizado<a href="/es/politica-cookies">modificar la configuración.</a>'
    });
  };
</script>
````

Por defecto busca la hoja de estilos y el JS de locales en el mismo path que esté la propia librería en JS pero podemos poner un path personalizado **antes de llamar al init**:


````javascript
<script type="text/javascript">
  window.onload = function() {

    CPC.data.css = '/assets/css/cookie-policy-consent-bubble.css';
    CPC.data.script_locales = '/assets/js/cookie-policy-consent-locales.js';

    //...
    CPC.init({
      lang: $('html').attr('lang') // Coge el idioma del tag HTML
    });
  };
</script>
````

Si no queremos cargar **ni los estilos, ni el JS adicional, ni los locales desde la libreria porque ya estén cargados en la web** ( porque estos ficheros ya estén incluídos en el assets pipeline de Ruby on Rails por ejemplo)

````javascript
<script type="text/javascript">
  window.onload = function() {
    CPC.init({
      lang:'es',
      load_external_files: false
    });
  };
</script>
````

Si usas JQuery puedes llamarlo dentro del un `$.domready` normal que se ejecutará cuando esté listo el DOM de la página en vez de esperar a que se cargue la página completa, esto es más adecuado que emplear el `window.onload`.

````javascript
<script type="text/javascript">
  $(document).ready(function() {
    CPC.init({
      lang: 'es',
      before_element_ID: 'page_container',
      expire_days: 3 // Días para que expire la cookie
    });
  });
</script>
````

## Todas las opciones disponibles en la inicialización

````javascript
<script type="text/javascript">
  $(document).ready(function() {
    CPC.init({
      CPC.init({
        // lang: 'en',
        // show_only_once: true,
        // load_external_files: false, // Disable to autoload locales and CSS
        // click_anywhere: true, // Force closing clicking anywhere
        // msg: '<b>Custom cookie msg without locales</b>.<a href="#" id="cookie-policy-consent-close">Aceptar</a>',
        // expire_days: 999,
        // before_element_ID: 'container',
      });
    });
  });
</script>
````

## Autoloading

Si se incluye el JS con la opción "autoloading" intentará hacer todo el proceso, con las opciones por defecto... está sería así:

````html
<script src="cookie-policy-consent.js?auto_init"></script>
````

Si queremos especificar un idioma diferente del definido por defecto en el autoloading podemos pasarlo al final del path del script con `lang=XX`. Por ejemplo:

````html
<script src="cookie-policy-consent.js?auto_init=1&amp;lang=en"></script>
````

## To-do

Añadir soporte para que el evento de onclick en el botón de cerrar no machaque otros eventos como por ejemplo los de **Google Tag Manager**.

## Changelog

- v2.1.2 | 2017 / 07 / 08 | Fixed bug iwth old parameter
- 2016 / 02 / 01 | Simplificadas varias cosas, corregido el tema de auto_init.
- 2016 / 01 / 25 | Añadido parámetro `expire_days`, para la duracción de la cookie.
