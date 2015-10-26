'use strict';
CPC.fn = {

  // Init params
  params: {
    cookie_warning_id: 'cookie-policy-consent',
    show_only_once: false,
    click_anywhere: false,
    before_element_ID: null,
    msg: null // Custom text not in locale
  },
  host: null,

  postInit: function(params) {

    // Merge params if passed on init
    if (typeof params !== 'undefined') {
      for (var attrname in params) {
        CPC.fn.params[attrname] = params[attrname];
      }
    }

    CPC.fn.host = window.location.hostname;



    // Set default CSS path
    // We only request CSS file if its enabled
    if (CPC.settings.load_external_files) {
      // Set default locales path if not set by user
      if (CPC.data.s.locales === null) {
        CPC.data.s.locales = CPC.data.s.name.replace('.js','-locales.js');
      }
      // Set default CSS if not set by user
      if (CPC.data.css === null) {
        CPC.data.css = CPC.data.s.name.replace('.js','.css');
      }

      CPC.fn.appendCSS();
    }

    // If a custom msg was set dont insert locales
    if (CPC.fn.params.msg !== null) {
      CPC.fn.appendWarning();
    } else {
      // First load locales then append cookie advice
      if (CPC.settings.load_external_files) {
        CPC.loadScript(CPC.data.s.locales, function(){
          CPC.fn.appendWarning();
        });
      } else {
        CPC.fn.appendWarning();
      }
    }
  },

  appendWarning: function() {
    var
      t = '',
      h = '',
      d =    document.createElement('div'),
      body = document.getElementsByTagName('body')[0];

    // If NOT passing custom message
    if (CPC.fn.params.msg === null) {
      // If locale undefined assign first one
      if (typeof CPC.fn.params.lang === 'undefined' || typeof CPC.locales[CPC.fn.params.lang] === 'undefined') {
        CPC.fn.params.msg = CPC.locales[Object.keys(CPC.locales)[0]];
      } else {
        // Use lang set by user
        CPC.fn.params.msg = CPC.locales[CPC.fn.params.lang];
      }
    }

    // Create MSG
    d.setAttribute('id', CPC.fn.params.cookie_warning_id);
    d.setAttribute('style', 'display:none;');
    d.innerHTML =  CPC.fn.params.msg;

    // Append before or after
    // If undefined OR null
    if (CPC.fn.params.before_element_ID !== null) {
      // Append before elemint_ID
      var bID = document.getElementById(CPC.fn.params.before_element_ID);
      bID.parentNode.insertBefore(d, bID);
    } else {
      // Append end of body
      body.appendChild(d);
    }

    // Show cookie-warning only first time
    if (CPC.fn.params.show_only_once) {
      CPC.fn.set(CPC.settings.cookie_name, true, 999);
    }

    // Hide when clicked
    // Set cookie to true
    // If there is close button
    var cb = document.getElementById('cookie-policy-consent-close');
    if (cb !== null && !CPC.fn.params.click_anywhere) {
      cb.onclick = function(){
        CPC.fn.removeWarning();
      };
    } else {
      // Close clicking anywhere
      d.onclick = function(){
        CPC.fn.removeWarning();
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
    CPC.fn.set(CPC.settings.cookie_name, true, 999);
    var el = document.getElementById(CPC.fn.params.cookie_warning_id);
    el.outerHTML = '';
  },

  // SET name, val and # of days til expiration
  // CW.set("cookie_name", "cookie_value", 5 );
  set: function(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : "; expires=" + exdate.toUTCString()) + ';path=/;domain=.' + CPC.fn.host + ';';
  },

  // DELETE cookie
  // Simple set expiring to 0 :-)
  del: function(c_name) {
    if (typeof c_name === 'undefined') {
      c_name = CPC.settings.cookie_name;
    }
    CPC.fn.set(c_name, '', 0);
  },

  // Auto-initializes the CW script if has param '?auto_init'
  autoInit: function () {
    // Current script params
    if (typeof CPC.data.s.params !== 'undefined') {
      var p = CPC.data.s.params;
      // If has autoinit parameter
      if (p.match(/\?auto_init/)) {
        // If set lang parameter
        var L = p.match(/lang=(.*)$/);
        if (L) CPC.params.lang = l[1];
        CPC.fn.postInit();
      }
    }
  }

};

// Script auto init
CPC.fn.autoInit();
