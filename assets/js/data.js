// ДАННЫЕ КАТАЛОГА Anette Mani
// Чтобы добавить новый эскиз: положите картинку (с водяным знаком!) в assets/img/wm/
// и допишите строку в нужную коллекцию: {n:27,t:'MY NAILS #027 - Название',img:'файл.jpg',ali:'https://aliexpress.ru/item/...'},

const CATALOG = {
  mynails: {
    name: 'MY NAILS',
    code: 'MN',
    desc: 'Смелые и современные решения, адаптированные из открытых визуальных источников.',
    items: [
      {n:26,t:'MY NAILS #026 - Own way',img:'mynails026-298f09.jpg',ali:'https://aliexpress.ru/item/1005010698337919.html?sku_id=12000053229279837'},
      {n:25,t:'MY NAILS #025 - Big city life for @bitch_nogti',img:'mynails025-bfb96a.jpg',ali:'https://aliexpress.ru/item/1005010698337919.html?sku_id=12000053229279837'},
      {n:24,t:'MY NAILS #024 - Flamingo',img:'mynails024-74973c.jpg',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:23,t:'MY NAILS #023 - Sweetness',img:'mynails023-ac48f9.jpg',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:22,t:'MY NAILS #022 - Textures 2',img:'mynails022-95cc31.jpg',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:21,t:'MY NAILS #021 - Teddy bear',img:'mynails021-d5190c.jpg',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:20,t:'MY NAILS #020 - Love',img:'mynails020-8d4401.jpg',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:19,t:'MY NAILS #019 - Peonies',img:'mynails019-42bd09.jpg',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:18,t:'MY NAILS #018 - Snake enigma',img:'mynails018-e7fa7e.jpg',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:17,t:'MY NAILS #017 - Butterfly',img:'mynails017-0af98e.jpg',ali:'https://aliexpress.ru/item/1005008619936332.html?sku_id=12000045981398082'},
      {n:16,t:'MY NAILS #016 - Riches',img:'mynails016-43ece5.jpg',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:15,t:'MY NAILS #015 - Snake',img:'mynails015-faa5fd.jpg',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:14,t:'MY NAILS #014 - Amore',img:'mynails014-4b6fe2.jpg',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:13,t:'MY NAILS #013 - Animal skin',img:'mynails013-c37339.jpg',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:12,t:'MY NAILS #012 - Textures 1',img:'mynails012-263a20.jpg',ali:'https://aliexpress.ru/item/1005008484920574.html?sku_id=12000045351172710'},
      {n:11,t:'MY NAILS #011 - Essence of Roses',img:'mynails011-30a9f5.jpg',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:10,t:'MY NAILS #010 - Dolce Vita',img:'mynails010-b7565d.jpg',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:9,t:'MY NAILS #009 - Moment',img:'mynails009-f1f1da.jpg',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:8,t:'MY NAILS #008 - Daisy flower',img:'mynails008-0c1913.jpg',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:7,t:'MY NAILS #007  - Murrr',img:'mynails007-be55f6.jpg',ali:'https://aliexpress.ru/item/1005008322445131.html?sku_id=12000044605591680'},
      {n:6,t:'MY NAILS #006 - Botany',img:'mynails006-a975af.jpg',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157534'},
      {n:5,t:'MY NAILS #005 - Zodiac Castom 1',img:'mynails005-7c79d9.jpg',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157533'},
      {n:4,t:'MY NAILS #004 - Zodiac',img:'mynails004-b9ab1a.jpg',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157532'},
      {n:3,t:'MY NAILS #003 - Elegy',img:'mynails003-11c7b8.jpg',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157531'},
      {n:2,t:'MY NAILS #002 - Diversity',img:'mynails002-3dea2f.jpg',ali:'https://aliexpress.ru/item/1005008507869078.html?sku_id=12000045476157530'},
      {n:1,t:'MY NAILS #001 - Mix',img:'mynails001-eb6e3d.jpg',ali:'https://aliexpress.ru/item/1005008105952714.html?sku_id=12000043791929920'}
    ]
  },
  autosketch: {
    name: 'Авторские эскизы',
    code: 'AM',
    desc: 'Эксклюзивные авторские работы Anette Mani. Искусство в каждом штрихе для неповторимых образов.',
    items: [
      {n:446,t:'SATKI #446 - Ghostly Sonnet',img:'autosketch446-1d408e.jpg',ali:'https://aliexpress.ru/item/1005012129713682.html'},
      {n:441,t:'SATKI #441 - Tragic Clown',img:'autosketch441-75050d.jpg',ali:'https://aliexpress.ru/item/1005012129713682.html'},
      {n:439,t:'SATKI #439 - Gothic Grace',img:'autosketch439-acec46.jpg',ali:'https://aliexpress.ru/item/1005012129713682.html'},
      {n:458,t:'SATKI PLUS #458 - Tangle',img:'autosketch458-d8f1ab.jpg',ali:'https://aliexpress.ru/item/1005013200990909.html?sku_id=12000060540002340'},
      {n:457,t:'SATKI PLUS #457 - Dreadful depths',img:'autosketch457-0a38de.jpg',ali:'https://aliexpress.ru/item/1005013200990909.html?sku_id=12000060540002340'},
      {n:456,t:'SATKI PLUS #456 - Celestial Whispers',img:'autosketch456-da4caf.jpg',ali:'https://aliexpress.ru/item/1005013200990909.html?sku_id=12000060540002340'}
    ]
  },
  xmq: {
    name: 'XMQ',
    code: 'XMQ',
    desc: 'Смелые и современные решения для тех, кто не боится экспериментировать.',
    items: [
      {n:32,t:'XMQ #032 - Torn veil',img:'xmq032-48581f.jpg',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:31,t:'XMQ #031 - Black letter',img:'xmq031-255d42.jpg',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:30,t:'XMQ #030',img:'xmq003-eb1da4.jpg',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:29,t:'XMQ #029 - Cyber piercing',img:'xmq029-e0deab.jpg',ali:'https://aliexpress.ru/item/1005011741333270.html'},
      {n:28,t:'XMQ #028 - Cyber tribal',img:'xmq028-a3b1a3.jpg',ali:'https://aliexpress.ru/item/1005011741333270.html'},
      {n:27,t:'XMQ #027 - Aura helper',img:'xmq027-012c0d.jpg',ali:'https://aliexpress.ru/item/1005011741333270.html'},
      {n:26,t:'XMQ #026 - Cyber lines',img:'xmq026-b3a1f1.jpg',ali:'https://aliexpress.ru/item/1005011741333270.html'},
      {n:25,t:'XMQ #025',img:'xmq003-eb1da4.jpg',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:24,t:'XMQ #024 - Santorini',img:'xmq024-efd531.jpg',ali:'https://aliexpress.ru/item/1005011531204334.html'},
      {n:23,t:'XMQ #023 - Forest deer',img:'xmq023-97f4f1.jpg',ali:'https://aliexpress.ru/item/1005010702269397.html'},
      {n:22,t:'XMQ #022 - Soft power',img:'xmq003-eb1da4.jpg',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:21,t:'XMQ #021 - Feature',img:'xmq021-9fef02.jpg',ali:'https://aliexpress.ru/item/1005010633396650.html'},
      {n:20,t:'XMQ #020 - Fleur',img:'xmq020-b56a78.jpg',ali:'https://aliexpress.ru/item/1005010485933314.html'},
      {n:19,t:'XMQ #19 Velvet Autumn',img:'xmq019-ddb33d.jpg',ali:'https://aliexpress.ru/item/1005010485933314.html'},
      {n:18,t:'XMQ #018 - Horse in flowers',img:'xmq018-3749bf.jpg',ali:'https://aliexpress.ru/item/1005010577443251.html'},
      {n:17,t:'XMQ #017 - Funny Bees',img:'xmq017-ecaf27.jpg',ali:'https://aliexpress.ru/item/1005010407401730.html'},
      {n:16,t:'XMQ #016 - Leopard Style',img:'xmq016-93d459.jpg',ali:'https://aliexpress.ru/item/1005010472204281.html'},
      {n:15,t:'XMQ #015 - Tropical leaves',img:'xmq015-73d271.jpg',ali:'https://aliexpress.ru/item/1005010702269397.html'},
      {n:14,t:'XMQ #014 - Kiss of the wave',img:'xmq014-6dfd94.jpg',ali:'https://aliexpress.ru/item/1005010472204281.html'},
      {n:13,t:'XMQ #013 - Keys',img:'xmq013-2492d8.jpg',ali:'https://aliexpress.ru/item/1005011531204334.html'},
      {n:12,t:'XMQ #012 - Felicity',img:'xmq012-59ccfc.jpg',ali:'https://aliexpress.ru/item/1005010633396650.html'},
      {n:11,t:'XMQ #011 - Hello Beautiful',img:'xmq011-2c7877.jpg',ali:'https://aliexpress.ru/item/1005010407401730.html'},
      {n:10,t:'XMQ #010 - Hawaii',img:'xmq010-8858ae.jpg',ali:'https://aliexpress.ru/item/1005010577443251.html'},
      {n:9,t:'XMQ #009 Floral love',img:'xmq003-eb1da4.jpg',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:8,t:'XMQ #008 - Very cherry',img:'xmq008-4f6d2a.jpg',ali:'https://aliexpress.ru/item/1005009381697383.html'},
      {n:7,t:'XMQ #007 - Steel Eden',img:'xmq007-c8723d.jpg',ali:'https://aliexpress.ru/item/1005009381697383.html'},
      {n:6,t:'XMQ #006 - Bows',img:'xmq006-5ed20a.jpg',ali:'https://aliexpress.ru/item/1005009381697383.html'},
      {n:5,t:'XMQ #005 - Graceful',img:'xmq003-eb1da4.jpg',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:4,t:'XMQ #004 - Smoke',img:'xmq004-001b4b.jpg',ali:'https://aliexpress.ru/item/1005009472466575.html'},
      {n:3,t:'XMQ #003 - Text magic',img:'xmq003-eb1da4.jpg',ali:'https://aliexpress.ru/item/1005012122904162.html'},
      {n:2,t:'XMQ #002 - Circus',img:'xmq002-366bff.jpg',ali:'https://aliexpress.ru/item/1005009472466575.html'},
      {n:1,t:'XMQ #001 - Little bird',img:'xmq001-85a686.jpg',ali:'https://aliexpress.ru/item/1005009472466575.html'}
    ]
  }
};
