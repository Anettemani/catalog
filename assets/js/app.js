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
  var visibleItems = []; // текущий отфильтрованный список (для лайтбокса)
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

    visibleItems = items; // запоминаем для листания в лайтбоксе
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
  var lbCounter = document.getElementById('lb-counter');
  var lbPrev = document.getElementById('lb-prev');
  var lbNext = document.getElementById('lb-next');
  var lbIndex = 0; // позиция открытого эскиза внутри visibleItems

  function showAt(idx) {
    if (!visibleItems.length) return;
    lbIndex = (idx + visibleItems.length) % visibleItems.length; // зацикливание
    var item = visibleItems[lbIndex];
    lbImg.style.backgroundImage = 'url("' + IMG_DIR + item.img + '")';
    lbTitle.textContent = item.t;
    lbAli.setAttribute('href', item.ali);
    if (lbCounter) lbCounter.textContent = (lbIndex + 1) + ' / ' + visibleItems.length;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function openLB(item) {
    var idx = -1;
    for (var i = 0; i < visibleItems.length; i++) {
      if (visibleItems[i].n === item.n) { idx = i; break; }
    }
    showAt(idx === -1 ? 0 : idx);
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

  // стрелки-кнопки в лайтбоксе
  if (lbPrev) lbPrev.addEventListener('click', function () { showAt(lbIndex - 1); });
  if (lbNext) lbNext.addEventListener('click', function () { showAt(lbIndex + 1); });

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') showAt(lbIndex - 1);
    if (e.key === 'ArrowRight') showAt(lbIndex + 1);
  });

  // свайпы на сенсорных экранах
  var touchX = null, touchY = null;
  lightbox.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    if (touchX === null || e.changedTouches.length !== 1) return;
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    touchX = touchY = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) showAt(lbIndex + 1); else showAt(lbIndex - 1);
    }
  }, { passive: true });

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
   Мобильное меню и кнопка «наверх» — в общем файле site.js
   ============================================================ */


/* ============================================================
   Фикс лайтбокса: подгон размера окна под пропорции эскиза
   ============================================================ */
(function () {
  'use strict';
  var lbImg = document.getElementById('lb-img');
  var lbBox = document.getElementById('lightbox');
  if (!lbImg || !lbBox) return;

  function fitLB() {
    var bg = lbImg.style.backgroundImage;
    if (!bg || bg === 'none') { lbImg.style.width = ''; lbImg.style.height = ''; return; }
    var m = bg.match(/url\(["']?([^"')]+)["']?\)/);
    if (!m) return;
    var probe = new Image();
    probe.onload = function () {
      if (lbImg.style.backgroundImage !== bg) return;
      var maxW = Math.min(960, window.innerWidth * 0.94);
      var maxH = window.innerHeight * 0.74;
      var k = Math.min(maxW / probe.naturalWidth, maxH / probe.naturalHeight);
      lbImg.style.width = Math.round(probe.naturalWidth * k) + 'px';
      lbImg.style.height = Math.round(probe.naturalHeight * k) + 'px';
    };
    probe.src = m[1];
  }

  new MutationObserver(fitLB).observe(lbImg, { attributes: true, attributeFilter: ['style'] });
  window.addEventListener('resize', function () {
    if (!lbBox.hidden) fitLB();
  });
})();
