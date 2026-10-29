/* ============================================================
   Защита контента Anette Mani
   Многоуровневая защита от скачивания и копирования эскизов:
   1. Запрет контекстного меню (правый клик / долгое нажатие)
   2. Запрет перетаскивания и выделения
   3. Блокировка сохранения страницы / просмотра кода / печати
   4. Прозрачный "щит" поверх картинок (в CSS)
   5. Картинки без прямых <img> тегов (background-image)
   Примечание: водяной знак нанесён на сами файлы изображений.
   ============================================================ */

(function () {
  'use strict';

  var toastTimer = null;

  function showToast(message) {
    var toast = document.getElementById('protect-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'protect-toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2200);
  }

  var WARN = 'Эскизы защищены авторским правом © @anette_mani';

  // 1. Контекстное меню — отключаем везде, кроме полей ввода
  document.addEventListener('contextmenu', function (e) {
    if (e.target.closest('input, textarea, select')) return;
    e.preventDefault();
    showToast(WARN);
  }, { capture: true });

  // 2. Перетаскивание любых элементов
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  }, { capture: true });

  // Выделение текста вне полей ввода
  document.addEventListener('selectstart', function (e) {
    if (e.target.closest('input, textarea, select')) return;
    e.preventDefault();
  }, { capture: true });

  // Копирование заголовков эскизов — не даём массово тащить список
  document.addEventListener('copy', function (e) {
    if (e.target.closest('input, textarea, select')) return;
    e.clipboardData.setData('text/plain', WARN);
    e.preventDefault();
  });

  // 3. Горячие клавиши: сохранение, исходный код, печать, инструменты разработчика
  document.addEventListener('keydown', function (e) {
    var key = (e.key || '').toLowerCase();
    var blocked = false;

    if ((e.ctrlKey || e.metaKey) && key === 's') blocked = true;        // сохранить страницу
    if ((e.ctrlKey || e.metaKey) && key === 'u') blocked = true;        // исходный код
    if ((e.ctrlKey || e.metaKey) && key === 'p') blocked = true;        // печать
    if ((e.ctrlKey || e.metaKey) && key === 'a' &&
        !e.target.closest('input, textarea, select')) blocked = true;   // выделить всё
    if (key === 'f12') blocked = true;                                  // devtools
    if ((e.ctrlKey || e.metaKey) && e.shiftKey &&
        (key === 'i' || key === 'j' || key === 'c')) blocked = true;    // devtools

    if (blocked) {
      e.preventDefault();
      e.stopPropagation();
      showToast(WARN);
    }
  }, { capture: true });

  // Блокируем открытие картинок в новой вкладке через средний клик и т.п.
  document.addEventListener('auxclick', function (e) {
    if (e.button === 1) e.preventDefault();
  }, { capture: true });
})();


/* ============================================================
   6. Ловушка PrintScreen (кнопка «снимок экрана» на Windows):
   страница на миг скрывается белой «шторкой», буфер обмена
   затирается, показывается предупреждение об авторских правах.
   ============================================================ */
(function () {
  'use strict';

  var overlay = null;
  var restoreTimer = null;
  var toastTimer = null;
  var armed = false;
  var WARN = 'Эскизы защищены авторским правом © @anette_mani';

  function warn() {
    var t = document.getElementById('protect-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'protect-toast';
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = WARN;
    t.style.zIndex = '100001';
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  function trap() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.style.cssText =
        'position:fixed;inset:0;z-index:100000;background:#fff;' +
        'display:none;pointer-events:none;';
      document.body.appendChild(overlay);
    }
    overlay.style.display = 'block';
    clearTimeout(restoreTimer);
    restoreTimer = setTimeout(function () { overlay.style.display = 'none'; }, 900);

    // Затираем буфер обмена, если снимок попал туда
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('').catch(function () {});
    }
    warn();
  }

  function onKey(e) {
    if ((e.key || '').toLowerCase() !== 'printscreen') return;
    if (armed) return;
    armed = true;
    trap();
    setTimeout(function () { armed = false; }, 1100);
  }

  document.addEventListener('keydown', onKey, { capture: true });
  document.addEventListener('keyup', onKey, { capture: true });
})();
