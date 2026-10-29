/* ============================================================
   Общие скрипты сайта Anette Mani (подключается на всех страницах)
   1. Мобильное меню (бургер)
   2. Кнопка «наверх»
   3. Автоподсчёт дизайнов на главной странице
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. Мобильное меню ---------- */
  var burger = document.getElementById('burger');
  var nav = document.querySelector('.main-nav');
  if (burger && nav) {
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
  }

  /* ---------- 2. Кнопка «наверх» ---------- */
  var toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Наверх');
  toTop.innerHTML = '&#8593;';
  document.body.appendChild(toTop);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      toTop.classList.toggle('show', window.scrollY > 500);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 3. Автоподсчёт дизайнов на главной ---------- */
  if (typeof CATALOG === 'undefined') return;

  function plural(n, one, few, many) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  }

  var nodes = document.querySelectorAll('[data-collection-count]');
  Array.prototype.forEach.call(nodes, function (el) {
    var col = CATALOG[el.getAttribute('data-collection-count')];
    if (!col || !col.items) return;
    var n = col.items.length;
    el.textContent = n + ' ' + plural(n, 'дизайн', 'дизайна', 'дизайнов');
  });
})();
