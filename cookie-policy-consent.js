/*
  Cookie Policy Consent by Carlos Cabo 2015-2016
  https://github.com/carloscabo/cookie-policy-consent
  v.2.1.0
*/
var CPC = {

 // Internal data and variables
  data: {
    script_full_url: document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1].src,
    script_name: null,
    script_url_params: null,
    script_locales: null,
    css: null
  },
  // Available options
  options: {
    auto_init: false,
    cookie_name: 'cookie-policy-consent-accepted',
    cookie_warning_id: 'cookie-policy-consent',
    load_external_files: true,
    show_only_once: false,
    click_anywhere: false,
    before_element_ID: null,
    expire_days: 999,
    lang: null,
    msg: null // Custom text not in locale
  },
  host: window.location.hostname,
  hID: document.getElementsByTagName('head')[0],

  init: function(user_options) {
    // Si ya hay cookie
    if (CPC.check(CPC.options.cookie_name)) {
      return;
    }

    // Merge params if passed on init
    if (typeof user_options !== 'undefined') {
      for (var attrname in user_options) {
        CPC.options[attrname] = user_options[attrname];
      }
    }

    // Set default CSS path
    // We only request CSS file if its enabled
    if (CPC.options.load_external_files) {
      // Set default locales path if not set by user
      if (CPC.data.script_locales === null) {
        CPC.data.script_locales = CPC.data.script_name.replace('.js','-locales.js');
      }
      // Set default CSS if not set by user
      if (CPC.data.css === null) {
        CPC.data.css = CPC.data.script_name.replace('.js','.css');
      }
      CPC.appendCSS();
    }

    // If a custom msg was set dont insert locales
    if (CPC.options.msg !== null) {
      CPC.appendWarning();
    } else {
      // First load locales then append cookie advice
      if (CPC.options.load_external_files) {
        CPC.loadScript(CPC.data.script_locales, function(){
          CPC.appendWarning();
        });
      } else {
        CPC.appendWarning();
      }
    }
  },

  // ###########################################################################
  // Cookies handlers
  // found on http://snipplr.com/view/36790/jscookies--my-simple-easy-pure-js-javascript-cookies-function/
  // ###########################################################################

  // GET returns the value of the cookie
  // CPC.get("cookie_name_here");
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
    return '';
  },

  // CHECK returns only true or false if the cookie exists
  // CPC.check("cookie_name_here");
  check: function(c_name) {
    c_name = CPC.get(c_name);
    if (c_name !== null && c_name !== '') {
      return true;
    } else {
      return false;
    }
  },

  // SET name, val and # of days til expiration
  // CPC.set("cookie_name", "cookie_value", 5 );
  set: function(c_name, value, expiredays) {
    var
      dstr,
      exd  = new Date();
    if (expiredays === 0) {
      sdtr = 'Thu, 01 Jan 1970 00:00:01 GMT';
    } else {
      exd.setDate(exd.getDate() + expiredays);
      sdtr = exd.toUTCString();
    }
    document.cookie = c_name + "=" + escape(value) + ";expires=" + sdtr + ';path=/;domain=.' + CPC.host + ';';
  },

  // DELETE cookie
  // Simple set expiring to 0 :-)
  del: function(c_name) {
    if (typeof c_name === 'undefined') {
      c_name = CPC.options.cookie_name;
    }
    CPC.set(c_name, '', 0);
  },

  // http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
  loadScript: function (url, callback){
    var
      script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState){  //IE
      script.onreadystatechange = function(){
        if (script.readyState == 'loaded' ||
          script.readyState == 'complete'){
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  //Others
      script.onload = function(){
        callback();
      };
    }
    script.src = url;
    CPC.hID.appendChild(script);
  },

  appendWarning: function() {
    var
      t = '',
      h = '',
      d =    document.createElement('div'),
      body = document.getElementsByTagName('body')[0];

    // If NOT passing custom message
    if (CPC.options.msg === null) {
      // If locale undefined assign first one
      if (CPC.options.lang === null) {
        CPC.options.msg = CPC.locales[Object.keys(CPC.locales)[0]];
      } else {
        // Use lang set by user
        CPC.options.msg = CPC.locales[CPC.options.lang];
      }
    }

    // Create MSG
    d.setAttribute('id', CPC.options.cookie_warning_id);
    d.setAttribute('style', 'display:none;');
    d.innerHTML =  CPC.options.msg;

    // Append before or after
    // If undefined OR null
    if (CPC.options.before_element_ID !== null) {
      // Append before elemint_ID
      var bID = document.getElementById(CPC.options.before_element_ID);
      bID.parentNode.insertBefore(d, bID);
    } else {
      // Append at end of body
      body.appendChild(d);
    }

    // Show cookie-warning only first time
    if (CPC.options.show_only_once) {
      CPC.set(CPC.options.cookie_name, true, CPC.options.expire_days);
    }

    // Hide when clicked
    // Set cookie to true
    // If there is close button
    var cb = document.getElementById('cookie-policy-consent-close');
    if (cb !== null && !CPC.options.click_anywhere) {
      cb.onclick = function(){
        CPC.removeWarning();
      };
    } else {
      // Close clicking anywhere
      d.onclick = function(){
        CPC.removeWarning();
      };
    }

  },

  // Appends default CSS stylesheet
  appendCSS: function () {
    if (CPC.data.css !== null) {
      var
        lnk = document.createElement('link');
      lnk.type  = 'text/css';
      lnk.rel   = 'stylesheet';
      lnk.media = 'screen';
      lnk.href  = CPC.data.css;
      CPC.hID.appendChild(lnk);
    }
  },

  // Hides warning
  removeWarning: function() {
    CPC.set(CPC.options.cookie_name, true, CPC.options.expire_days);
    var el = document.getElementById(CPC.options.cookie_warning_id);
    el.outerHTML = '';
  },

  // Auto-initializes the CW script if has param '?auto_init'
  autoInit: function () {
    // Current script params
    var p = CPC.data.script_url_params;
    if (typeof p !== 'undefined' && p !== null) {
      // If has autoinit parameter
      if (p.match(/auto_init/)) {
        // If set lang parameter
        var L = p.match(/lang=(.*)$/);
        if (L) CPC.params.lang = l[1];
        CPC.init();
      }
    }
  }

};

// Script auto init
CPC.data.script_name = CPC.data.script_full_url.split('?')[0];
CPC.data.script_url_params = CPC.data.script_full_url.split('?')[1];
CPC.autoInit();
