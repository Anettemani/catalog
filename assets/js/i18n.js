/* ============================================================
   Двуязычие сайта Anette Mani: русский / английский.
   1. Первый визит: язык браузера русский (или часовой пояс
      России) — показываем русский сайт, иначе английский.
   2. Выбор сохраняется в браузере (localStorage) и имеет
      приоритет над автоопределением.
   3. Переключатель RU / EN в шапке на всех страницах.
   Как это работает: у переводимых элементов разметки стоит
   атрибут data-i18n="ключ" (текст), data-tattr="атрибут:ключ"
   (placeholder, aria-label и т.п.), у <title> — data-ttitle.
   Динамические строки JS берут через AMLang.t(ключ).
   ============================================================ */

(function () {
  'use strict';

  var DICT = {
    ru: {
      // общие
      note_top: 'Авторские эскизы защищены \u00A9 @anette_mani',
      protected_warn: 'Эскизы защищены авторским правом \u00A9 @anette_mani',
      nav_home: 'Главная',
      aria_main_menu: 'Основное меню',
      aria_home: 'Anette Mani — на главную',
      aria_open_menu: 'Открыть меню',
      back_top: 'Наверх',
      f_text: 'Создаю цифровую эстетику для мастеров, которые ценят качество и уникальность. Ваши лучшие работы начинаются с моих эскизов.',
      f_collections: 'Коллекции',
      f_contact: 'Связь с автором',
      f_badge1: 'Уникальность',
      f_badge2: 'Сделано с любовью',
      copyright: '\u00A9 2026 by @anette_mani. Все права защищены',
      // главная
      title_index: 'Anette Mani — коллекция эскизов пластин для стемпинга',
      desc_index: 'Коллекция дизайнов для создания идеального маникюра. Авторские эскизы пластин для стемпинга от Anette Mani: MY NAILS, SATKI, XMQ. Ссылки на пластины на AliExpress.',
      hero_eyebrow: 'Коллекция дизайнов для идеального маникюра',
      hero_title: 'Добро пожаловать!',
      hero_sub: 'Привет! Я — Anette, и здесь собрана вся моя коллекция эскизов пластин для стемпинга',
      aria_scroll: 'Прокрутить к коллекциям',
      choose_h2: 'Выберите коллекцию',
      choose_sub: 'Три коллекции авторских дизайнов — от классики до смелых экспериментов',
      cc_label: 'Коллекция',
      cc_link: 'Смотреть каталог',
      desc_mn: 'Смелые и современные решения, адаптированные из открытых визуальных источников.',
      desc_satki: 'Эксклюзивные авторские работы Anette Mani. Искусство в каждом штрихе для неповторимых образов.',
      desc_xmq: 'Смелые и современные решения для тех, кто не боится экспериментировать.',
      about_h2: 'Искусство в деталях',
      about_p1: 'Используя возможности современного цифрового дизайна, я переосмысляю актуальные мотивы и превращаю их в авторские коллекции. Так они обретают уникальность, становятся читаемыми и полностью готовыми к профессиональной гравировке.',
      about_p2: 'Проектирование эскизов — от создания идеи и изображений до подготовки макетов к производству.',
      about_motto: 'Качество. Стиль. Вдохновение.',
      // страницы каталога
      eyebrow_mn: 'MN \u00B7 Коллекция',
      eyebrow_am: 'AM \u00B7 Коллекция',
      eyebrow_xmq: 'XMQ \u00B7 Коллекция',
      search_ph: 'Поиск по названию...',
      sort_aria: 'Сортировка',
      sort_new: 'Новинки',
      sort_old: 'Ранее опубликованные',
      empty: 'Ничего не найдено. Попробуйте изменить запрос.',
      grid_aria: 'Эскизы коллекции',
      find_ali: 'Найти на AliExpress',
      view_large: 'Открыть крупно',
      aria_close: 'Закрыть',
      aria_prev: 'Предыдущий эскиз',
      aria_next: 'Следующий эскиз',
      shown_of: 'Показано {a} из {b} дизайнов',
      hint_idle_touch: 'Разведите пальцы или дважды коснитесь, чтобы приблизить',
      hint_zoom_touch: 'Ведите пальцем, чтобы осмотреть. Сведите пальцы или дважды коснитесь — уменьшить',
      hint_idle_pc: 'Нажмите на эскиз или покрутите колёсико мыши, чтобы приблизить',
      hint_zoom_pc: 'Ведите мышью — лупа покажет детали. Нажмите ещё раз или крутите колёсико вниз, чтобы уменьшить',
      // 404
      title_404: 'Страница не найдена | Anette Mani',
      err404: 'Ошибка 404',
      h1_404: 'Страница не найдена',
      sub_404: 'Возможно, ссылка устарела или была введена с опечаткой. Вернитесь на главную — там собраны все коллекции.',
      btn_home: 'На главную'
    },
    en: {
      // common
      note_top: 'Original designs protected \u00A9 @anette_mani',
      protected_warn: 'Designs are protected by copyright \u00A9 @anette_mani',
      nav_home: 'Home',
      aria_main_menu: 'Main menu',
      aria_home: 'Anette Mani — go to homepage',
      aria_open_menu: 'Open menu',
      back_top: 'Back to top',
      f_text: 'I create digital aesthetics for nail artists who value quality and uniqueness. Your best work begins with my designs.',
      f_collections: 'Collections',
      f_contact: 'Contact the author',
      f_badge1: 'Uniqueness',
      f_badge2: 'Made with love',
      copyright: '\u00A9 2026 by @anette_mani. All rights reserved',
      // home page
      title_index: 'Anette Mani — nail stamping plate designs collection',
      desc_index: 'A collection of designs for creating the perfect manicure. Original stamping plate artwork by Anette Mani: MY NAILS, SATKI, XMQ. Links to the plates on AliExpress.',
      hero_eyebrow: 'A collection of designs for the perfect manicure',
      hero_title: 'Welcome!',
      hero_sub: 'Hi! I am Anette, and here you will find my complete collection of stamping plate designs',
      aria_scroll: 'Scroll down to the collections',
      choose_h2: 'Choose a collection',
      choose_sub: 'Three collections of original designs — from the classic to the bold',
      cc_label: 'Collection',
      cc_link: 'Browse the catalog',
      desc_mn: 'Bold, modern designs adapted from open visual sources.',
      desc_satki: 'Exclusive original artwork by Anette Mani. Art in every stroke, made for one-of-a-kind looks.',
      desc_xmq: 'Bold, modern designs for those who are not afraid to experiment.',
      about_h2: 'Art in every detail',
      about_p1: 'Using the tools of modern digital design, I reinterpret today\u2019s motifs and turn them into original collections. They become unique, readable and fully ready for professional engraving.',
      about_p2: 'Every plate is designed end to end — from the first idea and artwork to production-ready layouts.',
      about_motto: 'Quality. Style. Inspiration.',
      // catalog pages
      eyebrow_mn: 'MN \u00B7 Collection',
      eyebrow_am: 'AM \u00B7 Collection',
      eyebrow_xmq: 'XMQ \u00B7 Collection',
      search_ph: 'Search by name...',
      sort_aria: 'Sort',
      sort_new: 'New arrivals',
      sort_old: 'Earlier releases',
      empty: 'Nothing found. Try a different search.',
      grid_aria: 'Collection designs',
      find_ali: 'Find on AliExpress',
      view_large: 'View large',
      aria_close: 'Close',
      aria_prev: 'Previous design',
      aria_next: 'Next design',
      shown_of: 'Showing {a} of {b} designs',
      hint_idle_touch: 'Pinch out or double-tap to zoom in',
      hint_zoom_touch: 'Drag to look around. Pinch in or double-tap to zoom out',
      hint_idle_pc: 'Click the design or scroll the mouse wheel to zoom in',
      hint_zoom_pc: 'Move the mouse — the loupe reveals the details. Click again or scroll down to zoom out',
      // 404
      title_404: 'Page not found | Anette Mani',
      err404: 'Error 404',
      h1_404: 'Page not found',
      sub_404: 'The link may be outdated or mistyped. Head back to the homepage — all collections live there.',
      btn_home: 'Back to homepage'
    }
  };

  /* Часовые пояса России — второй признак «заходит из России»
     (на случай, если у человека русский браузер не при чём,
     например системный язык английский) */
  var RU_TZ = /(Moscow|Kaliningrad|Samara|Astrakhan|Ulyanovsk|Saratov|Volgograd|Kirov|Yekaterinburg|Omsk|Novosibirsk|Novokuznetsk|Barnaul|Tomsk|Krasnoyarsk|Irkutsk|Yakutsk|Ust-Nera|Srednekolymsk|Vladivostok|Magadan|Anadyr|Kamchatka|Simferopol)/;

  var STORAGE = 'am_lang';

  function detect() {
    try {
      var saved = localStorage.getItem(STORAGE);
      if (saved === 'ru' || saved === 'en') return saved;
    } catch (e) { /* приватный режим — просто определяем дальше */ }

    try {
      var langs = [];
      if (navigator.languages) langs = Array.prototype.slice.call(navigator.languages);
      if (navigator.language) langs.push(navigator.language);
      for (var i = 0; i < langs.length; i++) {
        if (/^ru(\b|-|_|$)/i.test(String(langs[i]))) return 'ru';
      }
    } catch (e) { /* ignore */ }

    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (RU_TZ.test(tz)) return 'ru';
    } catch (e) { /* ignore */ }

    return 'en'; // по умолчанию — не из России, показываем английский
  }

  var lang = 'ru';

  function t(key, vars, fallback) {
    var d = DICT[lang] || DICT.ru;
    var s = d[key];
    if (typeof s !== 'string') s = DICT.ru[key];
    if (typeof s !== 'string') s = (typeof fallback === 'string') ? fallback : '';
    if (vars) {
      for (var k in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, k)) {
          s = s.split('{' + k + '}').join(String(vars[k]));
        }
      }
    }
    return s;
  }

  /* Разбор data-tattr="attr:ключ;attr2:ключ2" */
  function applyAttrs(el, spec) {
    var pairs = spec.split(';');
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i];
      var c = p.indexOf(':');
      if (c < 1) continue;
      var attr = p.slice(0, c).trim();
      var key = p.slice(c + 1).trim();
      if (!attr || !key) continue;
      el.setAttribute(attr, t(key, null, el.getAttribute(attr) || ''));
    }
  }

  function apply(newLang) {
    lang = (newLang === 'en') ? 'en' : 'ru';
    try { localStorage.setItem(STORAGE, lang); } catch (e) { /* ignore */ }

    var root = document.documentElement;
    root.setAttribute('lang', lang);
    root.classList.toggle('lang-en', lang === 'en'); // для перевода CSS-строк (печать)
    root.classList.toggle('lang-ru', lang === 'ru');

    // текстовые узлы
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      el.textContent = t(el.getAttribute('data-i18n'), null, el.textContent);
    }

    // атрибуты (placeholder, aria-label, content...)
    var attrs = document.querySelectorAll('[data-tattr]');
    for (var j = 0; j < attrs.length; j++) {
      applyAttrs(attrs[j], attrs[j].getAttribute('data-tattr'));
    }

    // <title data-ttitle="ключ">
    var titleEl = document.querySelector('title[data-ttitle]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-ttitle'), null, document.title);

    // активная кнопка переключателя
    var btns = document.querySelectorAll('.lang-btn');
    for (var b = 0; b < btns.length; b++) {
      var active = btns[b].getAttribute('data-lang') === lang;
      btns[b].classList.toggle('active', active);
      btns[b].setAttribute('aria-pressed', active ? 'true' : 'false');
    }

    // сообщаем динамическим блокам (каталог, подсказки, счётчики)
    try {
      document.dispatchEvent(new CustomEvent('am:lang', { detail: { lang: lang } }));
    } catch (e) {
      var ev = document.createEvent('Event');
      ev.initEvent('am:lang', false, false);
      document.dispatchEvent(ev);
    }
  }

  // клики по кнопкам RU / EN (делегирование — работает на всех страницах)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.lang-btn') : null;
    if (!btn) return;
    apply(btn.getAttribute('data-lang') === 'en' ? 'en' : 'ru');
  });

  lang = detect();

  window.AMLang = {
    t: t,
    get: function () { return lang; },
    set: apply
  };

  // первичное применение (скрипт подключён в конце <body>, разметка уже есть)
  apply(lang);
})();
