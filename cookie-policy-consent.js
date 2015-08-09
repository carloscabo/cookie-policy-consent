/*
  Cookie Policy Consent by Carlos Cabo 2015
  https://github.com/carloscabo/cookie-policy-consent
  v.2.0.0
*/
;'use strict';
var CPC = {

  // Init params
  settings: {
    cookie_name: 'cookie-policy-consent-accepted',
  },
  data: {
    s: { // Current scripts
      path: document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1].src,
      name: null,
      params: null,
      fn: null,
      locales: null
    },
    css: null
  },
  hID: document.getElementsByTagName('head')[0],

  init: function(params) {

    // Si no hay cookie
    if (!CPC.check(CPC.settings.cookie_name)) {

      CPC.data.s.name = CPC.data.s.path.split('?')[0];
      CPC.data.s.params = CPC.data.s.path.split('?')[1];
      CPC.data.s.fn = CPC.data.s.name.replace('.js','-fn.js');

      CPC.loadScript(CPC.data.s.fn, function(){
        CPC.fn.postInit(params);
      });
    }
  },

  // Cookies handlers
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
    return '';
  },

  // CHECK returns only true or false if the cookie exists
  // .check("cookie_name_here");
  check: function(c_name) {
    c_name = CPC.get(c_name);
    if (c_name !== null && c_name !== '') {
      return true;
    } else {
      return false;
    }
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

};
