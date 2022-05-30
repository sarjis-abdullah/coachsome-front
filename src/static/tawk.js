var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function() {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/5d5d335deb1a6b0be6089928/default";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);

  //here's all you need
  Tawk_API.onLoad = function() {
    //screen resize method
    window.addEventListener(
      "resize",
      function(event) {
        // do what you want
        let w = document.documentElement.clientWidth;
        if (w < 960) {
          Tawk_API.hideWidget();
        } else {
          Tawk_API.showWidget();
        }
      },
      true
    );
  };
})();
