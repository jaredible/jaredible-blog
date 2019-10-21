// declaraction of document.ready() function.
(function() {
  var ie = !!(window.attachEvent && !window.opera);
  var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
  var fn = [];
  var run = function() {
    for (var i = 0; i < fn.length; i++) fn[i]();
  };
  var d = document;
  d.ready = function(f) {
    if (!ie && !wk && d.addEventListener)
      return d.addEventListener('DOMContentLoaded', f, false);
    if (fn.push(f) > 1) return;
    if (ie)
      (function() {
        try {
          d.documentElement.doScroll('left');
          run();
        } catch (err) {
          setTimeout(arguments.callee, 0);
        }
      })();
    else if (wk)
      var t = setInterval(function() {
        if (/^(loaded|complete)$/.test(d.readyState))
          clearInterval(t), run();
      }, 0);
  };
})();


document.ready(
  // toggleTheme function.
  // this script shouldn't be changed.
  function() {
    var _Blog = window._Blog || {};
    const currentTheme = window.localStorage && window.localStorage.getItem('theme');
    const isDark = currentTheme === 'dark';
    if (isDark) {
      document.getElementById("switch_default").checked = true;
      // mobile
      document.getElementById("mobile-toggle-theme").innerText = " · Dark";
      setBackground('255,255,255');
    } else {
      document.getElementById("switch_default").checked = false;
      // mobile
      document.getElementById("mobile-toggle-theme").innerText = " · Light";
      setBackground('0,0,0');
    }
    _Blog.toggleTheme = function() {
      if (isDark) {
        document.getElementsByTagName('body')[0].classList.add('dark-theme');
        // mobile
        document.getElementById("mobile-toggle-theme").innerText = " · Dark";
        setBackground('255,255,255');
      } else {
        document.getElementsByTagName('body')[0].classList.remove('dark-theme');
        // mobile
        document.getElementById("mobile-toggle-theme").innerText = " · Light";
      }
      document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => {
        if (document.getElementsByTagName('body')[0].classList.contains('dark-theme')) {
          document.getElementsByTagName('body')[0].classList.remove('dark-theme');
          //document.getElementById('disqus_thread').getElementsByTagName('body')[0].classList.remove('dark');
          setBackground('0,0,0');
        } else {
          document.getElementsByTagName('body')[0].classList.add('dark-theme');
          //document.getElementById('disqus_thread').getElementsByTagName('body')[0].classList.add('dark');
          setBackground('255,255,255');
        }
        window.localStorage && window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
      });
      // mobile
      document.getElementById('mobile-toggle-theme').addEventListener('click', () => {
        if (document.getElementsByTagName('body')[0].classList.contains('dark-theme')) {
          document.getElementsByTagName('body')[0].classList.remove('dark-theme');
          // mobile
          document.getElementById("mobile-toggle-theme").innerText = "· Light";
          setBackground('0,0,0');
        } else {
          document.getElementsByTagName('body')[0].classList.add('dark-theme');
          // mobile
          document.getElementById("mobile-toggle-theme").innerText = "· Dark";
          setBackground('255,255,255');
        }
        window.localStorage && window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
      });
    };
    _Blog.toggleTheme();

    // ready function.
  }
);

function setBackground(color) {
  var ele1 = document.getElementById('canvas-nest');
  var ele2 = document.getElementById('nest-canvas');
  if (ele1) ele1.remove();
  if (ele2) ele2.remove();
  var script = document.createElement('script');
  script.setAttribute('id', 'canvas-nest');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('color', color);
  script.setAttribute('opacity', '0.3');
  script.setAttribute('zindex', '-2');
  script.setAttribute('count', '99');
  script.setAttribute('src', '/js/canvas-nest.js');
  document.getElementsByTagName('body')[0].appendChild(script);
}
