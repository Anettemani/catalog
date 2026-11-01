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
  var HI_DIR = 'assets/img/wm/hi/'; // увеличенные версии (1800px) для лайтбокса и лупы

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
          (item.ali ? '<a class="btn" href="' + esc(item.ali) + '" target="_blank" rel="noopener nofollow">Найти на AliExpress</a>' : '') +
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
    lbImg.dataset.cur = item.img;
    lbImg.style.backgroundImage = 'url("' + IMG_DIR + item.img + '")';
    upgradeHi(item);
    lbTitle.textContent = item.t;
    if (item.ali) {
      lbAli.hidden = false;
      lbAli.setAttribute('href', item.ali);
    } else {
      lbAli.hidden = true;
      lbAli.removeAttribute('href');
    }
    if (lbCounter) lbCounter.textContent = (lbIndex + 1) + ' / ' + visibleItems.length;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  /* Увеличенная версия для лупы: сначала показываем быстрый 900px,
     затем бесшовно подменяем на 1800px. Нет hi-версии — остаётся 900px. */
  var hiMiss = {}; // эскизы, у которых hi-версии нет

  function upgradeHi(item) {
    if (hiMiss[item.img]) return;
    var probe = new Image();
    probe.onload = function () {
      if (lbImg.dataset.cur !== item.img) return; // открыт уже другой эскиз
      lbImg.style.backgroundImage = 'url("' + HI_DIR + item.img + '")';
    };
    probe.onerror = function () { hiMiss[item.img] = true; };
    probe.src = HI_DIR + item.img;
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
  var touchX = null, touchY = null, touchOnImage = false, pinchSeen = false;
  lightbox.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) { pinchSeen = true; touchX = null; return; }
    if (e.touches.length !== 1) return;
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
    // на увеличенной картинке любой жест — осмотр, а не листание
    touchOnImage = lbImg.dataset.zoom === '1';
  }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    // жест с участием двух пальцев (пинч) листанию не помеха — пропускаем;
    // сброс pinchSeen обязателен ДО ранних выходов, иначе свайпы «умирают»
    if (pinchSeen) {
      if (e.touches.length === 0) pinchSeen = false;
      return;
    }
    if (touchX === null || e.changedTouches.length !== 1) return;
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    touchX = touchY = null;
    if (touchOnImage) return;
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

  /* Маленький формат 6×12 см: пропорция 2:1 (файл в альбомной ориентации),
     1:2 (в портретной) или квадрат (временная заглушка XMQ).
     Большие 10×15 см — это 3:2 и 2:3. */
  function smallPlate(w, h) {
    var r = w / h;
    return r >= 1.7 || (r >= 0.47 && r <= 0.53) || (r >= 0.92 && r <= 1.08);
  }

  var TOUCH_FIT = 'ontouchstart' in window ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  function fitLB() {
    // при лупе не меняем размер (иначе разойдётся с background-size),
    // но первичную подгонку выполняем всегда
    if (lbImg.dataset.zoom === '1' && lbImg.style.width) return;
    var bg = lbImg.style.backgroundImage;
    if (!bg || bg === 'none') { lbImg.style.width = ''; lbImg.style.height = ''; return; }
    var m = bg.match(/url\(["']?([^"')]+)["']?\)/);
    if (!m) return;
    var probe = new Image();
    probe.onload = function () {
      if (lbImg.style.backgroundImage !== bg) return;
      lbImg.dataset.fw = probe.naturalWidth;   // запоминаем исходные
      lbImg.dataset.fh = probe.naturalHeight;  // размеры — нужна лупе
      var mobile = TOUCH_FIT &&
          Math.min(window.innerWidth, window.innerHeight) <= 760;
      var landscape = window.matchMedia('(orientation: landscape)').matches;
      // на мобильном в альбомной ориентации полноэкранный просмотр — для любого
      // эскиза (при зуме картинка всё равно рисуется на отдельном слое и может
      // занять весь экран); в портрете от края до края открываются только
      // маленькие эскизы 6×12
      var full = mobile && (landscape || smallPlate(probe.naturalWidth, probe.naturalHeight));
      lbBox.classList.toggle('lb-fullbleed', full);
      var maxW, maxH;
      if (full) {
        // от края до края: портрет — вся ширина, альбом — вся высота минус строка подписи
        maxW = window.innerWidth;
        maxH = landscape ? window.innerHeight - 52 : window.innerHeight;
      } else {
        maxW = Math.min(960, window.innerWidth * 0.94);
        maxH = window.innerHeight * 0.74;
      }
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
  lbBox.__fitLB = fitLB; // лупа вызывает это после сброса зума при resize
})();

/* ============================================================
   Лупа в лайтбоксе.
   Десктоп: клик — приблизить ×2.5 ВНУТРИ бокса эскиза (не на весь
   экран), колёсико — плавное приближение 1×–2.5× под курсором,
   движение мыши — осмотр, повторный клик (или колёсико вниз) — обратно.
   Мобильный: пинч (раздвижение пальцами) — плавное приближение 1×–4×,
   один палец — осмотр деталей, сведение пальцев — отдаление,
   двойное касание — приблизить до покрытия экрана / обратно.
   Увеличенная картинка на мобильном рисуется на отдельном
   полноэкранном слое .lb-zoom: эскиз выходит за границы своего бокса
   вплоть до полного покрытия экрана телефона.
   ============================================================ */
(function () {
  'use strict';
  var lightbox = document.getElementById('lightbox');
  var wrap = document.querySelector('.lb-img-wrap');
  var lbImg = document.getElementById('lb-img');
  if (!lightbox || !wrap || !lbImg) return;
  var layer = document.getElementById('lb-zoom');
  if (!layer) { // страховка на случай старой разметки
    layer = document.createElement('div');
    layer.className = 'lb-zoom';
    lightbox.appendChild(layer);
  }

  var Z = 2.5;   // шаг двойного касания и десктопной лупы
  var ZMAX = 4;  // потолок зума
  var TOUCH = 'ontouchstart' in window ||
              (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  var zoomed = false;
  var scale = 1;
  var layerOn = false; // показан полноэкранный слой
  lbImg.dataset.zoom = '0';

  // подсказка под кнопкой AliExpress
  var hint = document.createElement('p');
  hint.className = 'lb-hint';
  var HINT_IDLE = TOUCH
    ? 'Разведите пальцы или дважды коснитесь, чтобы приблизить'
    : 'Нажмите на эскиз или покрутите колёсико мыши, чтобы приблизить';
  var HINT_ZOOM = TOUCH
    ? 'Ведите пальцем, чтобы осмотреть. Сведите пальцы или дважды коснитесь — уменьшить'
    : 'Ведите мышью, чтобы осмотреть. Нажмите ещё раз — уменьшить';
  hint.textContent = HINT_IDLE;
  lightbox.querySelector('.lb-body').appendChild(hint);

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function markZoom(on) {
    if (on && !zoomed) {
      zoomed = true;
      lbImg.dataset.zoom = '1';
      wrap.classList.add('zoomed');
      hint.textContent = HINT_ZOOM;
    } else if (!on && zoomed) {
      zoomed = false;
      scale = 1;
      lbImg.dataset.zoom = '0';
      wrap.classList.remove('zoomed');
      lbImg.style.backgroundSize = '';
      lbImg.style.backgroundPosition = '';
      hint.textContent = HINT_IDLE;
    }
  }

  function fitted() {
    var w = parseFloat(lbImg.style.width), h = parseFloat(lbImg.style.height);
    if (w && h) return { w: w, h: h };
    // бокс ещё не подогнан — считаем по исходным размерам картинки
    var fw = parseFloat(lbImg.dataset.fw), fh = parseFloat(lbImg.dataset.fh);
    if (fw && fh) {
      var maxW = Math.min(960, window.innerWidth * 0.94);
      var maxH = window.innerHeight * 0.74;
      var k = Math.min(maxW / fw, maxH / fh);
      return { w: fw * k, h: fh * k };
    }
    return { w: 0, h: 0 };
  }

  /* Геометрия бокса: слой фона размером (W*s, H*s), позиция P% сдвигает его
     на W*(1-s)*P/100. «Держим» точку u под пальцем (e) — картинка следует
     за жестом, края ограничивает clamp P в [0;100]. */
  function posKeeping(u, ex, W, s) {
    if (s <= 1.001) return 50;
    var p = 100 * (ex - u * W * s) / (W * (1 - s));
    return Math.max(0, Math.min(100, p));
  }

  function applyView(s, px, py) {
    var d = fitted();
    if (!d.w) return;
    scale = s;
    if (s > 1.02) {
      lbImg.style.backgroundSize =
        Math.round(d.w * s) + 'px ' + Math.round(d.h * s) + 'px';
      lbImg.style.backgroundPosition = px.toFixed(2) + '% ' + py.toFixed(2) + '%';
      markZoom(true);
    } else {
      markZoom(false);
    }
  }

  /* ----- полноэкранный слой: зум выходит за границы бокса -----
     Размер картинки на слое: (fitW*s, fitH*s), смещение в пикселях.
     «Держим» точку эскиза с долей u под пальцем: ox = ex - u*fitW*s,
     края удерживаем на экране: ox в [min(0; W-w); max(0; W-w)]. */
  function layerOff() {
    if (!layerOn) return;
    layerOn = false;
    lightbox.classList.remove('lb-zoom-on');
    layer.style.backgroundImage = 'none';
    layer.style.backgroundSize = '';
    layer.style.backgroundPosition = '';
  }

  /* доля эскиза под точкой экрана, считая от бокса эскиза (без ограничений):
     при s≈1 даёт точное положение бокса — слой встаёт без скачка */
  function boxFrac(ex, ey) {
    var r = lbImg.getBoundingClientRect();
    if (!r.width || !r.height) return [0.5, 0.5];
    return [(ex - r.left) / r.width, (ey - r.top) / r.height];
  }

  /* доля эскиза под точкой экрана в текущем виде на слое */
  function layerFrac(ex, ey) {
    var d = fitted();
    if (!d.w) return [0.5, 0.5];
    var pos = (layer.style.backgroundPosition || '0px 0px').split(' ');
    var ox = parseFloat(pos[0]) || 0, oy = parseFloat(pos[1]) || 0;
    return [(ex - ox) / (d.w * scale), (ey - oy) / (d.h * scale)];
  }

  function placeLayer(s, ex, ey, u, v) {
    var d = fitted();
    if (!d.w) return;
    var W = layer.clientWidth || window.innerWidth;
    var H = layer.clientHeight || window.innerHeight;
    var w = d.w * s, h = d.h * s;
    var ox = clamp(ex - u * w, Math.min(0, W - w), Math.max(0, W - w));
    var oy = clamp(ey - v * h, Math.min(0, H - h), Math.max(0, H - h));
    layer.style.backgroundImage = lbImg.style.backgroundImage;
    layer.style.backgroundSize = Math.round(w) + 'px ' + Math.round(h) + 'px';
    layer.style.backgroundPosition = Math.round(ox) + 'px ' + Math.round(oy) + 'px';
  }

  function applyLayerView(s, ex, ey, u, v) {
    if (s > 1.02) {
      if (!layerOn) {
        layerOn = true;
        lightbox.classList.add('lb-zoom-on'); // сначала показываем, потом меряем
      }
      placeLayer(s, ex, ey, u, v);
      scale = s;
      markZoom(true);
    } else {
      layerOff();
      markZoom(false);
    }
  }

  function exitZoom() {
    if (layerOn) applyLayerView(1, 0, 0, 0.5, 0.5);
    else applyView(1, 50, 50);
  }

  /* ----- десктоп: позиция мыши = точка осмотра на увеличенной
     картинке внутри бокса (используется на гибридных устройствах) ----- */
  function placeByMouse(ex, ey) {
    var d = fitted();
    if (!d.w) return;
    var W = layer.clientWidth || window.innerWidth;
    var H = layer.clientHeight || window.innerHeight;
    var w = d.w * scale, h = d.h * scale;
    var ox = w > W ? -(w - W) * (ex / W) : (W - w) / 2;
    var oy = h > H ? -(h - H) * (ey / H) : (H - h) / 2;
    layer.style.backgroundImage = lbImg.style.backgroundImage;
    layer.style.backgroundSize = Math.round(w) + 'px ' + Math.round(h) + 'px';
    layer.style.backgroundPosition = Math.round(ox) + 'px ' + Math.round(oy) + 'px';
  }

  /* масштаб, при котором эскиз покрывает весь экран */
  function coverScale() {
    var d = fitted();
    if (!d.w) return ZMAX;
    return Math.max(window.innerWidth / d.w, window.innerHeight / d.h);
  }

  /* потолок зума: 4×, но не ниже уровня покрытия экрана —
   иначе у мелкого бокса в альбомной ориентации до «весь экран» не дотянуться */
  function sMax() { return Math.max(ZMAX, coverScale()); }

  /* двойное касание: покрываем экран целиком, но не меньше шага Z */
  function targetScale() {
    return Math.max(Z, coverScale());
  }

  /* ----- десктоп: зум внутри бокса эскиза. Картинка увеличивается
     в своих границах (×2.5), курсор остаётся на той же точке эскиза.
     Полноэкранный слой на ПК не используется ----- */
  function enterZoom(s, ex, ey) {
    var r = lbImg.getBoundingClientRect();
    if (!r.width) return;
    var ux = Math.max(0, Math.min(1, (ex - r.left) / r.width));
    var uy = Math.max(0, Math.min(1, (ey - r.top) / r.height));
    applyView(s,
      posKeeping(ux, ex - r.left, r.width, s),
      posKeeping(uy, ey - r.top, r.height, s));
  }

  function toggleZoomAt(ex, ey) {
    if (TOUCH) {
      // телефон/планшет: полноэкранный слой, зум выходит за границы бокса
      var uv = boxFrac(ex, ey);
      applyLayerView(targetScale(), ex, ey, uv[0], uv[1]);
    } else {
      // ПК: зум ×2.5 внутри бокса эскиза — без полноэкранного режима
      enterZoom(Z, ex, ey);
    }
  }

  /* ---------- обработчики вешаем на весь лайтбокс: жест можно начать
     где угодно (бокс эскиза может быть мал), кроме кнопок и подписи ---------- */
  function zoomZone(e) {
    return !e.target.closest('button, a, figcaption, input');
  }

  var lastTouchT = 0;

  function onClick(e) {
    if (lightbox.hidden) return;
    if (Date.now() - lastTouchT < 800) return; // тап: жесты, а не клик
    if (!zoomZone(e)) return;
    if (e.target === lightbox) return; // тёмный фон закрывает первый обработчик
    if (zoomed) exitZoom(); else toggleZoomAt(e.clientX, e.clientY);
  }

  function onMouseMove(e) {
    if (!zoomed || !zoomZone(e)) return;
    if (Date.now() - lastTouchT < 800) return; // это продолжение тача, не мышь
    if (layerOn) {
      placeByMouse(e.clientX, e.clientY);
    } else {
      var r = lbImg.getBoundingClientRect();
      var px = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
      var py = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100));
      lbImg.style.backgroundPosition = px.toFixed(2) + '% ' + py.toFixed(2) + '%';
    }
  }

  /* ---------- сенсорные экраны: пинч, панорама, двойное касание ---------- */
  var pinch = null; // {d0, s0, ux, uy} — стартовое состояние жеста
  var pan = null;   // {sx, sy, ux, uy} — точка под пальцем и его старт
  var lastTapEnd = 0, tapX = 0, tapY = 0, moved = false, gestureLive = false;

  function tdist(t) {
    var dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY;
    return Math.sqrt(dx * dx + dy * dy) || 1;
  }

  function onTouchStart(e) {
    lastTouchT = Date.now();
    if (lightbox.hidden) return;
    if (!zoomZone(e)) { // жест начат на кнопке/подписи — зум не трогаем
      pinch = null; pan = null; gestureLive = false;
      return;
    }
    gestureLive = true;
    moved = false;
    if (e.touches.length === 2) {
      var cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      var cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      var uv = layerOn ? layerFrac(cx, cy) : boxFrac(cx, cy);
      pinch = { d0: tdist(e.touches), s0: scale, ux: uv[0], uy: uv[1] };
      pan = null;
    } else if (e.touches.length === 1) {
      pinch = null;
      if (zoomed) {
        var uv2 = layerOn
          ? layerFrac(e.touches[0].clientX, e.touches[0].clientY)
          : boxFrac(e.touches[0].clientX, e.touches[0].clientY);
        pan = {
          sx: e.touches[0].clientX, sy: e.touches[0].clientY,
          ux: uv2[0], uy: uv2[1]
        };
      }
    }
  }

  function onTouchMove(e) {
    if (lightbox.hidden) return;
    if (e.touches.length === 2 && pinch) {
      e.preventDefault();
      var s = Math.max(1, Math.min(sMax(), pinch.s0 * tdist(e.touches) / pinch.d0));
      var cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      var cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      if (TOUCH) { // зум на полноэкранном слое — выходит за границы бокса
        applyLayerView(s, cx, cy, pinch.ux, pinch.uy);
      } else {
        var r = lbImg.getBoundingClientRect();
        applyView(s,
          posKeeping(pinch.ux, cx - r.left, r.width, s),
          posKeeping(pinch.uy, cy - r.top, r.height, s));
      }
      moved = true;
    } else if (e.touches.length === 1 && pan && zoomed) {
      var dx = e.touches[0].clientX - pan.sx, dy = e.touches[0].clientY - pan.sy;
      if (dx * dx + dy * dy > 64) moved = true; // >8px — это осмотр, не тап
      e.preventDefault();
      if (layerOn) {
        placeLayer(scale, e.touches[0].clientX, e.touches[0].clientY, pan.ux, pan.uy);
      } else {
        var r2 = lbImg.getBoundingClientRect();
        lbImg.style.backgroundPosition =
          posKeeping(pan.ux, e.touches[0].clientX - r2.left, r2.width, scale).toFixed(2) + '% ' +
          posKeeping(pan.uy, e.touches[0].clientY - r2.top, r2.height, scale).toFixed(2) + '%';
      }
    }
  }

  function onTouchEnd(e) {
    lastTouchT = Date.now();
    if (lightbox.hidden || !gestureLive) return;
    if (pinch && e.touches.length < 2) {
      // пинч закончен; оставшийся палец продолжает панораму
      pinch = null;
      if (e.touches.length === 1 && zoomed) {
        var uv = layerOn
          ? layerFrac(e.touches[0].clientX, e.touches[0].clientY)
          : boxFrac(e.touches[0].clientX, e.touches[0].clientY);
        pan = {
          sx: e.touches[0].clientX, sy: e.touches[0].clientY,
          ux: uv[0], uy: uv[1]
        };
      } else {
        pan = null;
      }
      return;
    }
    if (e.touches.length === 0 && !moved) {
      var tc = e.changedTouches[0];
      var now = Date.now();
      if (now - lastTapEnd < 320 &&
          Math.abs(tc.clientX - tapX) < 28 && Math.abs(tc.clientY - tapY) < 28) {
        lastTapEnd = 0;
        if (zoomed) exitZoom(); else toggleZoomAt(tc.clientX, tc.clientY);
      } else {
        lastTapEnd = now;
        tapX = tc.clientX; tapY = tc.clientY;
      }
    }
    if (e.touches.length === 0) pan = null;
  }

  lightbox.addEventListener('click', onClick);
  lightbox.addEventListener('mousemove', onMouseMove);

  /* колёсико мыши: плавный зум под курсором. На телефоне/планшете —
     полноэкранный слой (до 4×), на ПК — внутри бокса эскиза (до ×2.5).
     Кручение вниз возвращает к исходному виду. */
  lightbox.addEventListener('wheel', function (e) {
    if (lightbox.hidden) return;
    if (e.target === lightbox || !zoomZone(e)) return;
    if (!e.deltaY) return;
    e.preventDefault();
    var k = Math.exp(-e.deltaY * 0.0022); // сила зависит от величины прокрутки
    var s = Math.max(1, Math.min(TOUCH ? sMax() : Z, (layerOn ? scale : 1) * k));
    if (s <= 1.02) {
      layerOff();
      markZoom(false);
    } else if (TOUCH) {
      var uv = layerOn ? layerFrac(e.clientX, e.clientY) : boxFrac(e.clientX, e.clientY);
      applyLayerView(s, e.clientX, e.clientY, uv[0], uv[1]);
    } else {
      enterZoom(s, e.clientX, e.clientY);
    }
  }, { passive: false });

  /* поворот экрана / изменение окна при включённом зуме: возвращаем
     исходный вид и заново подгоняем бокс эскиза под новые размеры */
  window.addEventListener('resize', function () {
    if (layerOn) {
      exitZoom();
      if (lightbox.__fitLB) lightbox.__fitLB();
    }
  });
  lightbox.addEventListener('touchstart', onTouchStart, { passive: true });
  lightbox.addEventListener('touchmove', onTouchMove, { passive: false });
  lightbox.addEventListener('touchend', onTouchEnd, { passive: true });

  // смена эскиза или закрытие лайтбокса сбрасывает масштаб;
  // бесшовная подмена на hi-версию того же эскиза (/hi/ в пути) зум не сбрасывает
  var lastBG = '';
  new MutationObserver(function () {
    var bg = lbImg.style.backgroundImage;
    if (bg === lastBG) return;
    lastBG = bg;
    if (layerOn) layer.style.backgroundImage = bg; // подмена hi-версии прямо на слое
    if (zoomed && bg.indexOf('/hi/') === -1) exitZoom();
  }).observe(lbImg, { attributes: true, attributeFilter: ['style'] });
})();
