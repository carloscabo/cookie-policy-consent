Cookies-warning
===============

Aviso de Cookies genérico en JS puro (no necesita JQuery ni similar).

<h3><a href="http://htmlpreview.github.io/?https://github.com/carloscabo/cookies-warning/blob/master/demo.html" target="_blank">Demo de funcionamiento / testeo</a></h3>

![Smaple snapshop](https://raw.github.com/carloscabo/cookies-warning/master/snapshot.png)

## Requerimientos

`cookies-warning.js`  
`cookies-warning-locales.js`  
`cookies-warning.css`

## Abstract

Aviso de aceptación de Política de Cookies con soporte para internacionalización, personalización de colores básicos, responsive y con un icono SVG (con colores personalizables).

Se ha usado un **_append_** de JS ya que así se evita que los buscadores indexen el mensaje de cookies como _contenido de la páginas_, esto es especialmente importante si el mensaje de cookies se coloca en la parte superior de la página antes de los contenidos.

## Internacionalización

Hay un fichero a parte con el string que se imprime para cada idioma dependiendo del código que se le pase. Si no se le pasa ninguno buscará por defecto el string correspondiente a 'es'.

Los language codes tienen un límite de 10 caracteres.  
**es**  
**es-ES**  
...  
**51-AAA-bkk** _(este es el formato más largo en los ISO)_  

Las internacionalizaciones se encuentran en el fichero:  
`cookies-warning-locales.js`

Así que si se le pasa en la inicialización un string de una longitud superior a 10 chars asume que le estamos pasando el contenido del mensaje de warning. Este contenido de mensaje de warning se rodeará automáticamente de `<p> ... </p>`.

Más sinfo sobre language codes:  
<http://msdn.microsoft.com/en-us/library/ee825488(v=cs.20).aspx>  
<http://en.wikipedia.org/wiki/Language_code>

## SVG

Para hacer el iconito de _información_ he usado un SVG inline. Es lo más pequeño que se me ha ocurrido (dos círculos y un cuadrado). La ventaja del SVG es que por CSS también se puede cambiar el fondo y el color de la "i" (ver estilos en `cookies-warning.css`).

La desventaja es que en IE8 no se vé, pero tampoco pasa nada.

## Donde se inserta el aviso

Por defecto si no pasamos ningún parámetro adicional el mensaje de cookies **se insertará al final del `body`**, si queremos que se inserte en otra posición del DOM debemos pasarle el ID del elemento **delante del cual se insertará**, por ejemplo el siguiente código insertará el aviso **antes** del elemento con el **id** `page_container`:

    <script type="text/javascript">
      (function() {
        CW.init('es', 'page_container');
      })();
    </script>

## Cerrar el aviso de cookies

Si dentro del contenido del aviso de cookies existe algún elemento con el **id** `cookies-warning-close` se asume que ese es el elemento que debe pulsarse para cerrar el aviso.

Si no existe ningún elemento con ese ID haciendo click en cualquier parte dentro del aviso este se cerrará.

## Mostrar solamente una vez

En algunos sitios asumen que el aviso solo debe mostrarse una primera vez y que el usuario acepta la política implícitamente, eso se puede hacer pasando un tercer parámetro a `true`.

    <script type="text/javascript">
      (function() {
        CW.init('es', 'page_container', true); // Show only once!
      })();
    </script>

## Uso

Pasándole el código de lenguaje:

    <script type="text/javascript">
      (function() {
        CW.init('es');
      })();
    </script>

Pasándole el código de lenguaje desde rails:

    <script type="text/javascript">
      (function() {
        CW.init('<%= I18n.locale %>');
      })();
    </script>

Pasándole directamente un string:

    <script type="text/javascript">
      (function() {
        CW.init('<b>Aviso de cookies</b><br>Mensaje personalizado<a href="/es/politica-cookies">modificar la configuración.</a>');
      })();
    </script>

Si usas JQuery puedes llamarlo dentro del un $.ready normal

    <script type="text/javascript">
      $( document ).ready(function() {
        CW.init('es', 'page_container');
      });
    </script>

## To-do

Sugerencias?

## Known bugs

El IE8 no soporta `SVG` :-(
