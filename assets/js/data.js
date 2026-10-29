// ДАННЫЕ КАТАЛОГА Anette Mani
// Чтобы добавить новый эскиз: положите картинку (с водяным знаком!) в assets/img/wm/
// и допишите строку в нужную коллекцию:
//   {n:27,t:'MY NAILS #027 - Название',img:'файл.webp',ali:'https://aliexpress.ru/item/...'},
// Формат картинки — WebP (до 900 px по большей стороне, качество ~78).
// JPG тоже работает — просто укажите его имя файла.
// Счётчик дизайнов на главной странице считается автоматически.

const CATALOG = {
  mynails: {
    name: 'MY NAILS',
    code: 'MN',
    desc: 'Смелые и современные решения, адаптированные из открытых визуальных источников.',
    items: [
      {n:26,t:'MY NAILS #026 - Own way',img:'mynails026-298f09.webp',ali:'https://aliexpress.ru/item/1005010698337919.html?sku_id=12000053229279837'},
      {n:25,t:'MY NAILS #025 - Big city life for @bitch_nogti',img:'mynails025-bfb96a.webp',ali:'https://aliexpress.ru/item/1005010698337919.html?sku_id=12000053229279837'},
      {n:24,t:'MY NAILS #024 - Flamingo',img:'mynails024-74973c.webp',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:23,t:'MY NAILS #023 - Sweetness',img:'mynails023-ac48f9.webp',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:22,t:'MY NAILS #022 - Textures 2',img:'mynails022-95cc31.webp',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:21,t:'MY NAILS #021 - Teddy bear',img:'mynails021-d5190c.webp',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:20,t:'MY NAILS #020 - Love',img:'mynails020-8d4401.webp',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:19,t:'MY NAILS #019 - Peonies',img:'mynails019-42bd09.webp',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:18,t:'MY NAILS #018 - Snake enigma',img:'mynails018-e7fa7e.webp',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:17,t:'MY NAILS #017 - Butterfly',img:'mynails017-0af98e.webp',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:16,t:'MY NAILS #016 - Riches',img:'mynails016-43ece5.webp',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:15,t:'MY NAILS #015 - Snake',img:'mynails015-faa5fd.webp',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:14,t:'MY NAILS #014 - Amore',img:'mynails014-4b6fe2.webp',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:13,t:'MY NAILS #013 - Animal skin',img:'mynails013-c37339.webp',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:12,t:'MY NAILS #012 - Textures 1',img:'mynails012-263a20.webp',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:11,t:'MY NAILS #011 - Essence of Roses',img:'mynails011-30a9f5.webp',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:10,t:'MY NAILS #010 - Dolce Vita',img:'mynails010-b7565d.webp',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:9,t:'MY NAILS #009 - Moment',img:'mynails009-f1f1da.webp',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:8,t:'MY NAILS #008 - Daisy flower',img:'mynails008-0c1913.webp',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:7,t:'MY NAILS #007  - Murrr',img:'mynails007-be55f6.webp',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:6,t:'MY NAILS #006 - Botany',img:'mynails006-a975af.webp',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157534'},
      {n:5,t:'MY NAILS #005 - Zodiac Castom 1',img:'mynails005-7c79d9.webp',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157533'},
      {n:4,t:'MY NAILS #004 - Zodiac',img:'mynails004-b9ab1a.webp',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157532'},
      {n:3,t:'MY NAILS #003 - Elegy',img:'mynails003-11c7b8.webp',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157531'},
      {n:2,t:'MY NAILS #002 - Diversity',img:'mynails002-3dea2f.webp',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157530'},
      {n:1,t:'MY NAILS #001 - Mix',img:'mynails001-eb6e3d.webp',ali:'https://aliexpress.ru/item/1005008105952714.html?sku_id=12000043791929920'}
    ]
  },
  autosketch: {
    name: 'Авторские эскизы',
    code: 'AM',
    desc: 'Эксклюзивные авторские работы Anette Mani. Искусство в каждом штрихе для неповторимых образов.',
    items: [
      {n:446,t:'SATKI #446 - Ghostly Sonnet',img:'autosketch446-1d408e.webp',ali:'https://aliexpress.ru/item/1005012129713682.html'},
      {n:441,t:'SATKI #441 - Tragic Clown',img:'autosketch441-75050d.webp',ali:'https://aliexpress.ru/item/1005012129713682.html'},
      {n:439,t:'SATKI #439 - Gothic Grace',img:'autosketch439-acec46.webp',ali:'https://aliexpress.ru/item/1005012129713682.html'},
      {n:458,t:'SATKI PLUS #458 - Tangle',img:'autosketch458-d8f1ab.webp',ali:'https://aliexpress.ru/item/1005013200990909.html?sku_id=12000060540002340'},
      {n:457,t:'SATKI PLUS #457 - Dreadful depths',img:'autosketch457-0a38de.webp',ali:'https://aliexpress.ru/item/1005013200990909.html?sku_id=12000060540002340'},
      {n:456,t:'SATKI PLUS #456 - Celestial Whispers',img:'autosketch456-da4caf.webp',ali:'https://aliexpress.ru/item/1005013200990909.html?sku_id=12000060540002340'}
    ]
  },
  xmq: {
    name: 'XMQ',
    code: 'XMQ',
    desc: 'Смелые и современные решения для тех, кто не боится экспериментировать.',
    items: [
      {n:32,t:'XMQ #032 - Torn veil',img:'xmq032-48581f.webp',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:31,t:'XMQ #031 - Black letter',img:'xmq031-255d42.webp',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:30,t:'XMQ #030',img:'xmq003-eb1da4.webp',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:29,t:'XMQ #029 - Cyber piercing',img:'xmq029-e0deab.webp',ali:'https://aliexpress.ru/item/1005011741333270.html'},
      {n:28,t:'XMQ #028 - Cyber tribal',img:'xmq028-a3b1a3.webp',ali:'https://aliexpress.ru/item/1005011741333270.html'},
      {n:27,t:'XMQ #027 - Aura helper',img:'xmq027-012c0d.webp',ali:'https://aliexpress.ru/item/1005011741333270.html'},
      {n:26,t:'XMQ #026 - Cyber lines',img:'xmq026-b3a1f1.webp',ali:'https://aliexpress.ru/item/1005011741333270.html'},
      {n:25,t:'XMQ #025',img:'xmq003-eb1da4.webp',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:24,t:'XMQ #024 - Santorini',img:'xmq024-efd531.webp',ali:'https://aliexpress.ru/item/1005011531204334.html'},
      {n:23,t:'XMQ #023 - Forest deer',img:'xmq023-97f4f1.webp',ali:'https://aliexpress.ru/item/1005010702269397.html'},
      {n:22,t:'XMQ #022 - Soft power',img:'xmq003-eb1da4.webp',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:21,t:'XMQ #021 - Feature',img:'xmq021-9fef02.webp',ali:'https://aliexpress.ru/item/1005010633396650.html'},
      {n:20,t:'XMQ #020 - Fleur',img:'xmq020-b56a78.webp',ali:'https://aliexpress.ru/item/1005010485933314.html'},
      {n:19,t:'XMQ #019 - Velvet Autumn',img:'xmq019-ddb33d.webp',ali:'https://aliexpress.ru/item/1005010485933314.html'},
      {n:18,t:'XMQ #018 - Horse in flowers',img:'xmq018-3749bf.webp',ali:'https://aliexpress.ru/item/1005010577443251.html'},
      {n:17,t:'XMQ #017 - Funny Bees',img:'xmq017-ecaf27.webp',ali:'https://aliexpress.ru/item/1005010407401730.html'},
      {n:16,t:'XMQ #016 - Leopard Style',img:'xmq016-93d459.webp',ali:'https://aliexpress.ru/item/1005010472204281.html'},
      {n:15,t:'XMQ #015 - Tropical leaves',img:'xmq015-73d271.webp',ali:'https://aliexpress.ru/item/1005010702269397.html'},
      {n:14,t:'XMQ #014 - Kiss of the wave',img:'xmq014-6dfd94.webp',ali:'https://aliexpress.ru/item/1005010472204281.html'},
      {n:13,t:'XMQ #013 - Keys',img:'xmq013-2492d8.webp',ali:'https://aliexpress.ru/item/1005011531204334.html'},
      {n:12,t:'XMQ #012 - Felicity',img:'xmq012-59ccfc.webp',ali:'https://aliexpress.ru/item/1005010633396650.html'},
      {n:11,t:'XMQ #011 - Hello Beautiful',img:'xmq011-2c7877.webp',ali:'https://aliexpress.ru/item/1005010407401730.html'},
      {n:10,t:'XMQ #010 - Hawaii',img:'xmq010-8858ae.webp',ali:'https://aliexpress.ru/item/1005010577443251.html'},
      {n:9,t:'XMQ #009 Floral love',img:'xmq003-eb1da4.webp',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:8,t:'XMQ #008 - Very cherry',img:'xmq008-4f6d2a.webp',ali:'https://aliexpress.ru/item/1005009381697383.html'},
      {n:7,t:'XMQ #007 - Steel Eden',img:'xmq007-c8723d.webp',ali:'https://aliexpress.ru/item/1005009381697383.html'},
      {n:6,t:'XMQ #006 - Bows',img:'xmq006-5ed20a.webp',ali:'https://aliexpress.ru/item/1005009381697383.html'},
      {n:5,t:'XMQ #005 - Graceful',img:'xmq003-eb1da4.webp',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:4,t:'XMQ #004 - Smoke',img:'xmq004-001b4b.webp',ali:'https://aliexpress.ru/item/1005009472466575.html'},
      {n:3,t:'XMQ #003 - Text magic',img:'xmq003-eb1da4.webp',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:2,t:'XMQ #002 - Circus',img:'xmq002-366bff.webp',ali:'https://aliexpress.ru/item/1005009472466575.html'},
      {n:1,t:'XMQ #001 - Little bird',img:'xmq001-85a686.webp',ali:'https://aliexpress.ru/item/1005009472466575.html'}
    ]
  }
};
