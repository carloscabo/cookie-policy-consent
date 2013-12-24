/*
  Cookies warning function by Carlos Cabo 2013
  https://github.com/carloscabo/cookies-warning
  v.1.0.3
*/
;var CW = {
  cookie_warning_id: 'cookies-warning',
  cookie_name: 'cookies-warning-accepted',
  svg_bg: '#FFFFFF',
  svg_fg: '#000000',
  domain: '',

  init: function(lang, before_element_ID, show_only_once) {
    if (!CW.check(CW.cookie_name)) {
      CW.appendWarning(lang, before_element_ID, show_only_once);
    }
    // Hostame / domain
    var hn = window.location.host;
    this.domain = hn.substring(hn.lastIndexOf(".", hn.lastIndexOf(".") - 1) + 1);
  },

  appendWarning: function(lang, before_element_ID,  show_only_once) {
    var
      t = '',
      h = '',
      d =    document.createElement('div'),
      body = document.getElementsByTagName('body')[0];

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

    // Create MSG
    h = '<p><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px"><circle fill="'+CW.svg_bg+'" cx="16" cy="16" r="15" class="bg" /><circle fill="'+CW.svg_fg+'" cx="16" cy="7.216" r="2.733" class="fg"/><rect  fill="'+CW.svg_fg+'" x="13.267" y="12.417" width="5.466" height="14.938" class="fg"/></svg>'+t+'</p>';
    d.setAttribute('id', CW.cookie_warning_id);
    d.innerHTML =  h;

    // Append before or after
    // If undefined OR null
    if (before_element_ID  == null) {
      // Append end of body
      body.appendChild(d);
    } else {
      // Append before elemint_ID
      var bID = document.getElementById(before_element_ID);
      bID.parentNode.insertBefore(d, bID);
    }

    // Show cookie-warning only first time
    if (show_only_once) {
      CW.set(CW.cookie_name, true, 999);
    }

    // Hide when clicked
    // Set cookie to true
    // If there is close button
    var cb = document.getElementById('cookies-warning-close');
    if (cb !== null) {
      cb.onclick = function(){
        CW.removeWarning();
      };
    } else {
      // Close clicking anywhere
      d.onclick = function(){
        CW.removeWarning();
      };
    }

  },

  removeWarning: function() {
    CW.set(CW.cookie_name, true, 999);
    // Crossbrowser delete element by ID
    var el = document.getElementById(CW.cookie_warning_id);
    el.outerHTML = '';
    delete el;
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
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + exdate.toUTCString()) + ';path=/;domain=.' + CW.domain + ';';
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
  },

  // DELETE cookie
  // Simple set expiring to 0 :-)
  del: function(c_name) {
    if (c_name === undefined) {
      c_name = CW.cookie_name;
    }
    CW.set(c_name, '', 0);
  }
};

