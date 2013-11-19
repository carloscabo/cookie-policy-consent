/*
  Cookies warning function
*/
;var CW = {

  cookie_name: 'cookies-warning-accepted',

  init: function(lang) {
    var val = CW.Store.get(CW.cookie_name);
    if (!val) {
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
    CW.Store.set(CW.cookie_name, true);
    // Hide when click OLDER JQuery
    $('#cookies-warning').click(function(e) {
      $(this).remove();
    });
    // Hide when click newer JQuery
    /*$('#cookies-warning').on('click', function(e){
      $(this).remove();
    });*/
  }
};

/*
  Wrapper to store.js to avoid Safari's errors in stealth mode.
*/
CW.Store = function () {};

CW.Store.get = function ( val ) {
  if (!store.disabled) {
    return store.get(val);
  }
};

CW.Store.set = function ( variable, val ) {
  if (!store.disabled) {
    store.set(variable, val);
  }
};

CW.Store.remove = function ( val ) {
  if (!store.disabled) {
    store.remove(val);
  }
};
