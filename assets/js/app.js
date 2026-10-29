/* ============================================================
   Каталог Anette Mani: рендер сетки, поиск, сортировка,
   ленивая загрузка картинок, лайтбокс
   ============================================================ */

(function () {
  'use strict';

  var body = document.body;
  var colKey = body.getAttribute('data-collection');
  if (!colKey || typeof CATALOG === 'undefined' || !CATALOG[colKey]) return;

  var col = CATALOG[colKey];
  var grid = document.getElementById('grid');
  var qInput = document.getElementById('q');
  var sortSel = document.getElementById('sort');
  var countNote = document.getElementById('count-note');
  var emptyNote = document.getElementById('empty');

  var IMG_DIR = 'assets/img/wm/';

  /* ---------- Рендер ---------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function cardHTML(item) {
    return (
      '<article class="item" data-num="' + item.n + '">' +
        '<div class="item-img" data-img="' + IMG_DIR + item.img + '" role="button" tabindex="0" ' +
        'aria-label="' + esc(item.t) + ' — открыть крупно" title="Открыть крупно">' +
          '<div class="guard"></div>' +
        '</div>' +
        '<div class="item-body">' +
          '<h3 class="item-title">' + esc(item.t) + '</h3>' +
          '<a class="btn" href="' + esc(item.ali) + '" target="_blank" rel="noopener nofollow">Найти на AliExpress</a>' +
        '</div>' +
      '</article>'
    );
  }

  function render() {
    var q = (qInput.value || '').trim().toLowerCase();
    var sort = sortSel.value; // new | old

    var items = col.items.filter(function (it) {
      return !q || it.t.toLowerCase().indexOf(q) !== -1;
    });

    items.sort(function (a, b) {
      return sort === 'old' ? a.n - b.n : b.n - a.n;
    });

    grid.innerHTML = items.map(cardHTML).join('');
    emptyNote.hidden = items.length !== 0;
    countNote.textContent = 'Показано ' + items.length + ' из ' + col.items.length + ' дизайнов';

    observeImages();
  }

  /* ---------- Ленивая загрузка фоновых картинок ---------- */

  var io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target;
          el.style.backgroundImage = 'url("' + el.getAttribute('data-img') + '")';
          el.closest('.item').classList.add('visible');
          io.unobserve(el);
        }
      });
    }, { rootMargin: '300px 0px' });
  }

  function observeImages() {
    var imgs = grid.querySelectorAll('.item-img');
    Array.prototype.forEach.call(imgs, function (el) {
      if (io) {
        io.observe(el);
      } else {
        el.style.backgroundImage = 'url("' + el.getAttribute('data-img') + '")';
        el.closest('.item').classList.add('visible');
      }
    });
  }

  /* ---------- Лайтбокс ---------- */

  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbTitle = document.getElementById('lb-title');
  var lbAli = document.getElementById('lb-ali');

  function openLB(item) {
    lbImg.style.backgroundImage = 'url("' + IMG_DIR + item.img + '")';
    lbTitle.textContent = item.t;
    lbAli.setAttribute('href', item.ali);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLB() {
    lightbox.hidden = true;
    lbImg.style.backgroundImage = 'none';
    document.body.style.overflow = '';
  }

  grid.addEventListener('click', function (e) {
    var imgEl = e.target.closest('.item-img');
    if (!imgEl) return;
    var num = parseInt(imgEl.closest('.item').getAttribute('data-num'), 10);
    var item = col.items.filter(function (it) { return it.n === num; })[0];
    if (item) openLB(item);
  });

  grid.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var imgEl = e.target.closest('.item-img');
    if (!imgEl) return;
    e.preventDefault();
    imgEl.click();
  });

  document.getElementById('lb-close').addEventListener('click', closeLB);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLB();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) closeLB();
  });

  /* ---------- События панели управления ---------- */

  var t = null;
  qInput.addEventListener('input', function () {
    clearTimeout(t);
    t = setTimeout(render, 160);
  });
  sortSel.addEventListener('change', render);

  render();
})();

/* ============================================================
   Мобильное меню (для страниц каталога)
   ============================================================ */

(function () {
  'use strict';
  var burger = document.getElementById('burger');
  var nav = document.querySelector('.main-nav');
  if (!burger || !nav) return;
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.classList.remove('open');
    }
  });
})();
