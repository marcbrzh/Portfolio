(function () {
  const headerPlaceholder = document.getElementById('site-header');
  const footerPlaceholder = document.getElementById('site-footer');
  const currentPage = document.body.dataset.page;

  function setActiveNav() {
    if (!currentPage) return;
    document.querySelectorAll('#main-nav a[data-nav]').forEach(function (link) {
      if (link.dataset.nav === currentPage) {
        link.classList.add('active');
      }
    });
  }

  function injectPartial(placeholder, url) {
    if (!placeholder) return Promise.resolve();
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + url);
        return res.text();
      })
      .then(function (html) {
        placeholder.outerHTML = html;
      });
  }

  Promise.all([
    injectPartial(headerPlaceholder, 'partials/header.html'),
    injectPartial(footerPlaceholder, 'partials/footer.html')
  ])
    .then(function () {
      setActiveNav();
      document.dispatchEvent(new CustomEvent('layout:ready'));
    })
    .catch(function () {
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML =
          '<header class="site-header"><a href="index.html" class="site-logo">Seattle<span class="accent">\'</span>Breizh</a></header>';
      }
    });
})();
