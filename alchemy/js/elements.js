var elements = [{
		"id": 1,
		"isBase": true,
		"class": "fire",
		"description": "Горящие светящиеся газы высокой температуры, пламя.",
		"text": "Огонь"
	},
	{
		"id": 2,
		"isBase": true,
		"class": "water",
		"text": "Вода",
		"description": "Бинарное неорганическое соединение с химической формулой H2O: молекула воды состоит из двух атомов водорода и одного — кислорода",
		"recept": [
			["ice", "fire"]
		]
	},
	{
		"id": 3,
		"isBase": true,
		"class": "air",
		"description": "Газообразное вещество, составляющее атмосферу Земли.",
		"text": "Воздух"
	},
	{
		"id": 4,
		"isBase": true,
		"class": "ground",
		"description": "Почва, верхний слой коры нашей планеты, поверхность.",
		"text": "Земля"
	},
	{
		"id": 5,
		"class": "lava",
		"text": "Лава",
		"description": "Расплавленная минеральная масса, выбрасываемая вулканом на земную поверхность при извержении.",
		"recept": [
			["fire", "ground"]
		]
	},
	{
		"id": 6,
		"class": "swamp",
		"text": "Болото",
		"description": "Топкое место со стоячей водой.",
		"recept": [
			["water", "ground"]
		]
	},
	{
		"id": 7,
		"class": "energy",
		"text": "Энергия",
		"recept": [
			["air", "fire"]
		]
	},
	{
		"id": 8,
		"class": "electricity",
		"text": "Электричество",
		"description": "Форма энергии, обусловленная движением частиц материи (электронов, позитронов и протонов).",
		"recept": [
			["metal", "energy"]
		]
	},
	{
		"id": 9,
		"class": "sea",
		"text": "Море",
		"description": "Часть Мирового океана, обособленная сушей или возвышениями подводного рельефа.",
		"recept": [
			["salt", "water"],
			["water", "water"]
		]
	},
	{
		"id": 10,
		"class": "wind",
		"text": "Ветер",
		"description": "Поток воздуха, который движется около земной поверхности.",
		"recept": [
			["air", "air"]
		]
	},
	{
		"id": 11,
		"class": "steam",
		"text": "Пар",
		"description": "Газообразное состояние вещества в условиях, когда газовая фаза может находиться в равновесии с жидкой или твёрдой фазами того же вещества.",
		"recept": [
			["fire", "water"]
		]
	},
	{
		"id": 12,
		"class": "cloud",
		"text": "Облако",
		"description": "Видимая масса частиц воды или кристаллов льда, взвешенных в нижних слоях атмосферы.",
		"recept": [
			["steam", "air"]
		]
	},
	{
		"id": 13,
		"class": "sky",
		"text": "Небо",
		"description": "Пространство над землёй или поверхностью любого другого астрономического объекта.",
		"recept": [
			["cloud", "air"]
		]
	},
	{
		"id": 14,
		"class": "pressure",
		"text": "Давление",
		"description": "Сила, действующая на какую-либо поверхность.",
		"recept": [
			["ground", "ground"]
		]
	},
	{
		"id": 15,
		"class": "rain",
		"text": "Дождь",
		"description": "Атмосферные осадки в виде водяных капель.",
		"recept": [
			["cloud", "water"]
		]
	},
	{
		"id": 16,
		"class": "volcano",
		"text": "Вулкан",
		"description": "Геологическое образование, возникающее над каналами и трещинами в земной коре, по которым на земную поверхность извергаются расплавленные горные породы (лава), пепел, горячие газы, пары воды и обломки горных пород.",
		"recept": [
			["pressure", "lava"]
		]
	},
	{
		"id": 17,
		"class": "stone",
		"text": "Камень",
		"description": "Твёрдая неметаллическая горная порода.",
		"recept": [
			["water", "lava"]
		]
	},
	{
		"id": 18,
		"class": "geyser",
		"text": "Гейзер",
		"description": "Горячий источник, периодически выбрасывающий фонтаны горячей воды и пара под давлением.",
		"recept": [
			["ground", "steam"]
		]
	},
	{
		"id": 19,
		"class": "metal",
		"text": "Металл",
		"description": "Группа химических элементов, обладающих в виде простых веществ характерными металлическими свойствами, такими, как высокие тепло- и электропроводность, положительный температурный коэффициент сопротивления, высокая пластичность, ковкость и металлический блеск.",
		"recept": [
			["fire", "stone"]
		]
	},
	{
		"id": 20,
		"class": "sand",
		"text": "Песок",
		"description": "Рыхлая осадочная горная порода.",
		"recept": [
			["stone", "wind"],
			["stone", "water"]
		]
	},
	{
		"id": 21,
		"class": "clay",
		"text": "Глина",
		"description": "Мелкозернистая осадочная горная порода, пылевидная в сухом состоянии, пластичная при увлажнении.",
		"recept": [
			["sand", "swamp"]
		]
	},
	{
		"id": 22,
		"class": "silicon",
		"text": "Кремний",
		"recept": [
			["sand", "pressure"]
		]
	},
	{
		"id": 23,
		"class": "desert",
		"text": "Пустыня",
		"description": "Большое необитаемое пространство земли со скудной растительностью или вовсе без неё.",
		"recept": [
			["sand", "sand"]
		]
	},
	{
		"id": 24,
		"class": "glass",
		"text": "Стекло",
		"description": "Прозрачный хрупкий материал. Наиболее распространено силикатное стекло, основной компонент которого - оксид кремния.",
		"recept": [
			["sand", "fire"],
			["oxygen", "silicon"]
		]
	},
	{
		"id": 25,
		"class": "hourglass",
		"text": "Песочные часы",
		"description": "Простейший прибор для отсчёта промежутков времени, состоящий из двух прозрачных сосудов, соединённых узкой горловиной, один из которых частично заполнен песком. Время, за которое песок через горловину пересыпается в другой сосуд, может составлять от нескольких секунд, до нескольких часов.",
		"recept": [
			["sand", "glass"]
		]
	},
	{
		"id": 26,
		"class": "life",
		"text": "Жизнь",
		"description": "Жизнь — основное понятие биологии — активная форма существования материи, в некотором смысле высшая по сравнению с её физической и химической формами существования; совокупность физических и химических процессов, протекающих в клетке, позволяющих осуществлять обмен веществ и её деление.",
		"recept": [
			["swamp", "energy"]
		]
	},
	{
		"id": 27,
		"class": "egg",
		"text": "Яйцо",
		"recept": [
			["life", "stone"]
		]
	},
	{
		"id": 28,
		"class": "dust",
		"text": "Пыль",
		"description": "Мелкие твёрдые частицы органического или минерального происхождения. К пыли относят частицы меньшего диаметра от долей микрона и до максимального — 0,1 мм.",
		"recept": [
			["air", "ground"]
		]
	},
	{
		"id": 29,
		"class": "turtle",
		"text": "Черепаха",
		"recept": [
			["sand", "life"]
		]
	},
	{
		"id": 30,
		"class": "lightbulb",
		"text": "Лампочка",
		"description": "Искусственный источник света, в котором свет испускает тело накала, нагреваемое электрическим током до высокой температуры.",
		"recept": [
			["electricity", "glass"]
		]
	},
	{
		"id": 31,
		"class": "magnet",
		"text": "Магнит",
		"description": "Кусок железной руды или стали, обладающий свойством притягивать железные или стальные предметы.",
		"recept": [
			["electricity", "metal"]
		]
	},
	{
		"id": 32,
		"class": "bacteria",
		"text": "Бактерия",
		"description": "Одноклеточные живые организмы, способные обеспечить все этапы своей жизнедеятельности самостоятельно.",
		"recept": [
			["swamp", "life"]
		]
	},
	{
		"id": 33,
		"class": "worm",
		"text": "Червь",
		"description": "Продолговатое мягкотелое бескостное животное, обитающее в земле.",
		"recept": [
			["bacteria", "ground"]
		]
	},
	{
		"id": 34,
		"class": "sulfur",
		"text": "Сера",
		"recept": [
			["bacteria", "swamp"]
		]
	},
	{
		"id": 35,
		"class": "flu",
		"text": "Грипп",
		"description":  "Острое инфекционное заболевание верхних дыхательных путей с вирусной природой возникновения.",
		"recept": [
			["bacteria", "air"]
		]
	},
	{
		"id": 36,
		"class": "butterfly",
		"text": "Бабочка",
		"description": "Насекомое с двумя парами покрытых пыльцой крыльев разнообразной окраски.",
		"recept": [
			["worm", "air"]
		]
	},
	{
		"id": 37,
		"class": "omlet",
		"text": "Яичница",
		"description": "Блюдо, приготовляемое на сковороде из разбитых яиц. Традиционный завтрак в Великобритании и Ирландии — яичница с беконом.",
		"recept": [
			["egg", "fire"]
		]
	},
	{
		"id": 38,
		"class": "brick",
		"text": "Кирпич",
		"description": "Брусок из обожжённой глины, используемое для построек.",
		"recept": [
			["fire", "clay"]
		]
	},
	{
		"id": 39,
		"class": "mite",
		"text": "Клещ",
		"description": "Мелкое членистоногое животное из отряда паукообразных.",
		"recept": [
			["life", "dust"]
		]
	},
	{
		"id": 40,
		"class": "cold",
		"text": "Холод",
		"description": "Низкая температура воздуха.",
		"recept": [
			["cloud", "wind"]
		]
	},
	{
		"id": 41,
		"class": "ice",
		"text": "Лёд",
		"description": "Замёрзшая вода.",
		"recept": [
			["cold", "water"]
		]
	},
	{
		"id": 42,
		"class": "oasis",
		"text": "Оазис",
		"description": "Место в пустыне, где есть растительность и вода.",
		"recept": [
			["desert", "water"]
		]
	},
	{
		"id": 43,
		"class": "seeds",
		"text": "Семена",
		"recept": [
			["ground", "life"]
		]
	},
	{
		"id": 44,
		"class": "tree",
		"text": "Дерево",
		"recept": [
			["ground", "seeds"]
		]
	},
	{
		"id": 45,
		"class": "flower",
		"text": "Цветок",
		"recept": [
			["water", "seeds"]
		]
	},
	{
		"id": 46,
		"class": "forest",
		"text": "Лес",
		"recept": [
			["tree", "tree"]
		]
	},
	{
		"id": 47,
		"class": "coal",
		"text": "Уголь",
		"recept": [
			["tree", "fire"]
		]
	},
	{
		"id": 48,
		"class": "diamond",
		"text": "Алмаз",
		"recept": [
			["coal", "pressure"]
		]
	},
	{
		"id": 49,
		"class": "snow",
		"text": "Снегопад",
		"recept": [
			["cold", "rain"]
		]
	},
	{
		"id": 50,
		"class": "plankton",
		"text": "Планктон",
		"recept": [
			["bacteria", "water"]
		]
	},
	{
		"id": 51,
		"class": "light",
		"text": "Свет",
		"recept": [
			["electricity", "lightbulb"]
		]
	},
	{
		"id": 52,
		"class": "rainbow",
		"text": "Радуга",
		"recept": [
			["light", "rain"],
			["sun", "rain"]
		]
	},
	{
		"id": 53,
		"class": "oxygen",
		"text": "Кислород",
		"recept": [
			["flower", "light"]
		]
	},
	{
		"id": 54,
		"class": "star",
		"text": "Звезда",
		"recept": [
			["energy", "light"]
		]
	},
	{
		"id": 55,
		"class": "sun",
		"text": "Солнце",
		"recept": [
			["star", "fire"]
		]
	},
	{
		"id": 56,
		"class": "orange",
		"text": "Апельсин",
		"recept": [
			["tree", "sun"]
		]
	},
	{
		"id": 57,
		"class": "bird",
		"text": "Птица",
		"recept": [
			["life", "sky"]
		]
	},
	{
		"id": 58,
		"class": "airplane",
		"text": "Самолет",
		"recept": [
			["bird", "metal"]
		]
	},
	{
		"id": 59,
		"class": "penguin",
		"text": "Пингвин",
		"recept": [
			["bird", "ice"]
		]
	},
	{
		"id": 60,
		"class": "steam_boiler",
		"text": "Паровой котел",
		"recept": [
			["steam", "metal"]
		]
	},
	{
		"id": 61,
		"class": "steam_engine",
		"text": "Паровой двигатель",
		"recept": [
			["steam_boiler", "coal"]
		]
	},
	{
		"id": 62,
		"class": "tractor",
		"text": "Трактор",
		"recept": [
			["steam_engine", "ground"]
		]
	},
	{
		"id": 63,
		"class": "salt",
		"text": "Соль",
		"recept": [
			["sea", "fire"]
		]
	},
	{
		"id": 64,
		"class": "ocean",
		"text": "Океан",
		"recept": [
			["sea", "sea"]
		]
	},
	{
		"id": 65,
		"class": "cactus",
		"text": "Кактус",
		"description": "Южное растение с толстыми сочными стеблями и колючками вместо листьев.",
		"recept": [
			["desert", "tree"]
		]
	},
	{
		"id": 66,
		"class": "earthquake",
		"text": "Землетрясение",
		"description": "Подземные толчки и колебания земной поверхности.",
		"recept": [
			["energy", "ground"]
		]
	},
	{
		"id": 67,
		"class": "dragon",
		"text": "Дракон",
		"description": "Сказочное чудовище в виде крылатого огнедышащего змея.",
		"recept": [
			["dino", "fire"]
		]
	},
	{
		"id": 68,
		"class": "parrot",
		"text": "Попугай",
		"recept": [
			["bird", "rainbow"]
		]
	},
	{
		"id": 69,
		"class": "hummingbird",
		"text": "Колибри",
		"recept": [
			["bird", "flower"]
		]
	},
	{
		"id": 70,
		"class": "sunflower",
		"text": "Подсолнух",
		"recept": [
			["sun", "flower"]
		]
	},
	{
		"id": 71,
		"class": "mud",
		"text": "Грязь",
		"recept": [
			["dust", "rain"],
			["dust", "water"]
		]
	},
	{
		"id": 72,
		"class": "pheonix",
		"text": "Феникс",
		"recept": [
			["fire", "bird"]
		]
	},
	{
		"id": 73,
		"class": "fish",
		"text": "Рыба",
		"recept": [
			["bacteria", "plankton"]
		]
	},
	{
		"id": 74,
		"class": "electric_stingray",
		"text": "Электрический скат",
		"recept": [
			["fish", "electricity"]
		]
	},
	{
		"id": 75,
		"class": "aquarium",
		"text": "Аквариум",
		"recept": [
			["fish", "glass"]
		]
	},
	{
		"id": 76,
		"class": "shell",
		"text": "Ракушка",
		"recept": [
			["plankton", "stone"]
		]
	},
	{
		"id": 77,
		"class": "snail",
		"text": "Улитка",
		"recept": [
			["shell", "worm"]
		]
	},
	{
		"id": 78,
		"class": "pearl",
		"text": "Жемчуг",
		"recept": [
			["sand", "shell"]
		]
	},
	{
		"id": 79,
		"class": "limestone",
		"text": "Известняк",
		"recept": [
			["stone", "shell"]
		]
	},
	{
		"id": 80,
		"class": "cement",
		"text": "Цемент",
		"recept": [
			["limestone", "clay"]
		]
	},
	{
		"id": 81,
		"class": "concrete",
		"text": "Бетон",
		"recept": [
			["cement", "water"]
		]
	},
	{
		"id": 82,
		"class": "brick_house",
		"text": "Кирпичный дом",
		"recept": [
			["concrete", "brick"]
		]
	},
	{
		"id": 83,
		"class": "skyscraper",
		"text": "Небоскреб",
		"recept": [
			["brick_house", "glass"]
		]
	},
	{
		"id": 84,
		"class": "city",
		"text": "Город",
		"recept": [
			["skyscraper", "skyscraper"]
		]
	},
	{
		"id": 85,
		"class": "country",
		"text": "Страна",
		"recept": [
			["city", "city"]
		]
	},
	{
		"id": 86,
		"class": "continent",
		"text": "Континент",
		"recept": [
			["country", "country"]
		]
	},
	{
		"id": 87,
		"class": "paper",
		"text": "Бумага",
		"recept": [
			["tree", "pressure"],
			["tree", "stone"]
		]
	},
	{
		"id": 88,
		"class": "map",
		"text": "Карта",
		"recept": [
			["paper", "continent"]
		]
	},
	{
		"id": 89,
		"class": "compass",
		"text": "Компас",
		"description": "Прибор для определения стран света (с намагниченной стрелкой, всегда указывающей на север).",
		"recept": [
			["magnet", "map"]
		]
	},
	{
		"id": 90,
		"class": "mail",
		"text": "Почта",
		"recept": [
			["paper", "bird"]
		]
	},
	{
		"id": 91,
		"class": "oil",
		"text": "Масло",
		"recept": [
			["sunflower", "pressure"]
		]
	},
	{
		"id": 92,
		"class": "paint",
		"text": "Краска",
		"description": "Вещество, придающее тот или иной цвет предметам, к-рые оно покрывает или пропитывает.",
		"recept": [
			["pressure", "flower"]
		]
	},
	{
		"id": 93,
		"class": "thunder",
		"text": "Гром",
		"description": "Грохот, сопровождающий молнию во время грозы.",
		"recept": [
			["rain", "rain"]
		]
	},
	{
		"id": 94,
		"class": "lightning",
		"text": "Молния",
		"description": "Электрический искровой разряд в атмосфере, обычно может происходить во время грозы, проявляющийся яркой вспышкой света и сопровождающим её громом. Молнии также были зафиксированы на Венере, Юпитере, Сатурне, Уране и др.",
		"recept": [
			["rain", "rain"]
		]
	},
	{
		"id": 95,
		"class": "hen",
		"text": "Курица",
		"description": "Домашняя птица, которую разводят для получения яиц и мяса. Самка петуха. Самая распространенная птица в русских крестьянских хозяйствах.",
		"recept": [
			["egg", "life"]
		]
	},
	{
		"id": 96,
		"class": "dilemma",
		"text": "Дилемма",
		"description": "Полемический довод с двумя противоположными положениями, исключающими друг друга и не допускающими возможность третьего. В повседневной речи употребляется тогда, когда оба варианта нежелательны, и выбор происходит по принципу «меньшего зла».",
		"recept": [
			["egg", "hen"]
		]
	},
	{
		"id": 97,
		"class": "humidity",
		"text": "Влажность",
		"description": "Содержание водяного пара в воздухе, характеризуемое рядом величин.",
		"recept": [
			["air", "water"]
		]
	},
	{
		"id": 98,
		"class": "mold",
		"text": "Плесень",
		"description": "Гриб, который имеет микроскопическое строение. Плесневые грибы распространены повсеместно. В основном обширные колонии вырастают в тёплых влажных местах на питательных средах.",
		"recept": [
			["humidity", "bacteria"]
		]
	},
	{
		"id": 99,
		"class": "book",
		"text": "Книга",
		"description": "Один из видов печатной продукции, состоящее из сброшюрованных или отдельных бумажных листов или тетрадей, на которых нанесена типографским или рукописным способом текстовая и графическая информация.",
		"recept": [
			["paper", "paper"]
		]
	},
	{
		"id": 100,
		"class": "library",
		"text": "Библиотека",
		"description": "Учреждение, собирающее и хранящее книги для общественного пользования.",
		"recept": [
			["book", "book"],
			["book", "brick_house"]
		]
	},


];
