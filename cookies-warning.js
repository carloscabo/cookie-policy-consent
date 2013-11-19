/*
  Cookies warning function
*/
;var CW = {

  cookie_name: 'cookies-warning-accepted',

  init: function(lang) {
    if (!CW.check(CW.cookie_name)) {
      CW.appendWarning(lang);
    }
  },

  appendWarning: function(lang) {
    var t = '';
    // If no lang set to 'es'
    if (lang === undefined) {
      lang = 'es';
    }
    // If passing long string
    if (lang.length > 10) {
      t = lang;
    } else {
      t = CW.Locales[lang];
    }
    // Write warning
    $('<div id="cookies-warning"><p><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px"><circle fill="#FFFFFF" cx="16" cy="16" r="15" class="bg" /><circle fill="#000000" cx="16" cy="7.216" r="2.733" class="fg"/><rect  fill="#000000" x="13.267" y="12.417" width="5.466" height="14.938" class="fg"/></svg>'+t+'</p></div>').appendTo('body');
    // Set cookie
    CW.set(CW.cookie_name, true, 999);
    // Hide when click OLDER JQuery
    $('#cookies-warning').click(function(e) {
      $(this).remove();
    });
    // Hide when click newer JQuery
    /*$('#cookies-warning').on('click', function(e){
      $(this).remove();
    });*/
  },

  // Cookies handle
  // found on http://snipplr.com/view/36790/jscookies--my-simple-easy-pure-js-javascript-cookies-function/

  // GET returns the value of the cookie
  // CW.get("cookie_name_here");
  get: function(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  },

  // SET name, val and # of days til expiration
  // CW.set("cookie_name", "cookie_value", 5 );
  set: function(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + exdate.toUTCString());
  },

  // CHECK returns only true or false if the cookie exists
  // .check("cookie_name_here");
  check: function(c_name) {
    c_name = CW.get(c_name);
    if (c_name != null && c_name != "") {
      return true;
    } else {
      return false;
    }
  }
};

