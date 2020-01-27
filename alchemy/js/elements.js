var elements = [
    {
        "id": 1,
        "isBase": true,
        "class": "fire",
        "text": "Огонь"
    },
    {
        "id": 2,
        "isBase": true,
        "class": "water",
        "text": "Вода",
        "recept": [["ice", "fire"]]
    },
    {
        "id": 3,
        "isBase": true,
        "class": "air",
        "text": "Воздух"
    },
    {
        "id": 4,
        "isBase": true,
        "class": "ground",
        "text": "Земля"
    },
    {
        "id": 5,
        "class": "lava",
        "text": "Лава",
        "recept": [["fire", "ground"]]
    },
    {
        "id": 6,
        "class": "swamp",
        "text": "Болото",
        "recept": [["water", "ground"]]
    },
    {
        "id": 7,
        "class": "energy",
        "text": "Энергия",
        "recept": [["air", "fire"]]
    },
    {
        "id": 8,
        "class": "electricity",
        "text": "Электричество",
        "recept": [["metal", "energy"]]
    },
    {
        "id": 9,
        "class": "sea",
        "text": "Море",
        "recept": [["salt", "water"],["water", "water"]]
    },
    {
        "id": 10,
        "class": "wind",
        "text": "Ветер",
        "recept": [["air", "air"]]
    },
    {
        "id": 11,
        "class": "steam",
        "text": "Пар",
        "recept": [["fire", "water"]]
    },
    {
        "id": 12,
        "class": "cloud",
        "text": "Облако",
        "recept": [["steam", "air"]]
    },
    {
        "id": 13,
        "class": "sky",
        "text": "Небо",
        "recept": [["cloud", "air"]]
    },
    {
        "id": 14,
        "class": "pressure",
        "text": "Давление",
        "recept": [["ground", "ground"]]
    },
    {
        "id": 15,
        "class": "rain",
        "text": "Дождь",
        "recept": [["cloud", "water"]]
    },
    {
        "id": 16,
        "class": "volcano",
        "text": "Вулкан",
        "recept": [["pressure", "lava"]]
    },
    {
        "id": 17,
        "class": "stone",
        "text": "Камень",
        "recept": [["water", "lava"]]
    },
    {
        "id": 18,
        "class": "geyser",
        "text": "Гейзер",
        "recept": [["ground", "steam"]]
    },
    {
        "id": 19,
        "class": "metal",
        "text": "Металл",
        "recept": [["fire", "stone"]]
    },
    {
        "id": 20,
        "class": "sand",
        "text": "Песок",
        "recept": [["stone", "wind"], ["stone", "water"]]
    },
    {
        "id": 21,
        "class": "clay",
        "text": "Глина",
        "recept": [["sand", "swamp"]]
    },
    {
        "id": 22,
        "class": "silicon",
        "text": "Кремний",
        "recept": [["sand", "pressure"]]
    },
    {
        "id": 23,
        "class": "desert",
        "text": "Пустыня",
        "recept": [["sand", "sand"]]
    },
    {
        "id": 24,
        "class": "glass",
        "text": "Стекло",
        "recept": [["sand", "fire"]]
    },
    {
        "id": 25,
        "class": "hourglass",
        "text": "Песочные часы",
        "recept": [["sand", "glass"]]
    },
    {
        "id": 26,
        "class": "life",
        "text": "Жизнь",
        "recept": [["swamp", "energy"]]
    },
    {
        "id": 27,
        "class": "egg",
        "text": "Яйцо",
        "recept": [["life", "stone"]]
    },
    {
        "id": 28,
        "class": "dust",
        "text": "Пыль",
        "recept": [["air", "ground"]]
    },
    {
        "id": 29,
        "class": "turtle",
        "text": "Черепаха",
        "recept": [["egg", "life"]]
    },
    {
        "id": 30,
        "class": "lightbulb",
        "text": "Лампочка",
        "recept": [["electricity", "glass"]]
    },
    {
        "id": 31,
        "class": "magnet",
        "text": "Магнит",
        "recept": [["electricity", "metal"]]
    },
    {
        "id": 32,
        "class": "bacteria",
        "text": "Бактерия",
        "recept": [["swamp", "life"]]
    },
    {
        "id": 33,
        "class": "worm",
        "text": "Червь",
        "recept": [["bacteria", "ground"]]
    },
    {
        "id": 34,
        "class": "sulfur",
        "text": "Сера",
        "recept": [["bacteria", "swamp"]]
    },
    {
        "id": 35,
        "class": "flu",
        "text": "Грипп",
        "recept": [["bacteria", "air"]]
    },
    {
        "id": 36,
        "class": "butterfly",
        "text": "Бабочка",
        "recept": [["worm", "air"]]
    },
    {
        "id": 37,
        "class": "omlet",
        "text": "Яичница",
        "recept": [["egg", "fire"]]
    },
    {
        "id": 38,
        "class": "brick",
        "text": "Кирпич",
        "recept": [["fire", "clay"]]
    },
    {
        "id": 39,
        "class": "mite",
        "text": "Клещ",
        "recept": [["life", "dust"]]
    },
    {
        "id": 40,
        "class": "cold",
        "text": "Холод",
        "recept": [["cloud", "wind"]]
    },
    {
        "id": 41,
        "class": "ice",
        "text": "Лёд",
        "recept": [["cold", "water"]]
    },
    {
        "id": 42,
        "class": "oasis",
        "text": "Оазис",
        "recept": [["desert", "water"]]
    },
    {
        "id": 43,
        "class": "seeds",
        "text": "Семена",
        "recept": [["ground", "life"]]
    },
    {
        "id": 44,
        "class": "tree",
        "text": "Дерево",
        "recept": [["ground", "seeds"]]
    },
    {
        "id": 45,
        "class": "flower",
        "text": "Цветок",
        "recept": [["water", "seeds"]]
    },
    {
        "id": 46,
        "class": "forest",
        "text": "Лес",
        "recept": [["tree", "tree"]]
    },
    {
        "id": 47,
        "class": "coal",
        "text": "Уголь",
        "recept": [["tree", "fire"]]
    },
    {
        "id": 48,
        "class": "diamond",
        "text": "Алмаз",
        "recept": [["coal", "pressure"]]
    },
    {
        "id": 49,
        "class": "snow",
        "text": "Снегопад",
        "recept": [["cold", "rain"]]
    },







    
    {
        "id": 51,
        "class": "light",
        "text": "Свет",
        "recept": [["electricity", "lightbulb"]]
    },
    {
        "id": 52,
        "class": "rainbow",
        "text": "Радуга",
        "recept": [["light", "rain"], ["sun", "rain"]] // может sun и rain?
    },
    {
        "id": 53,
        "class": "oxygen",
        "text": "Кислород",
        "recept": [["flower", "light"]]
    },
    {
        "id": 54,
        "class": "star",
        "text": "Звезда",
        "recept": [["energy", "light"]]
    },
    {
        "id": 55,
        "class": "sun",
        "text": "Солнце",
        "recept": [["star", "fire"]]
    },
    {
        "id": 56,
        "class": "orange",
        "text": "Апельсин",
        "recept": [["tree", "sun"]]
    },
    {
        "id": 57,
        "class": "bird",
        "text": "Птица",
        "recept": [["life", "sky"]]
    },
    {
        "id": 58,
        "class": "airplane",
        "text": "Самолет",
        "recept": [["bird", "metal"]]
    },
    {
        "id": 59,
        "class": "pinguin",
        "text": "Пингвин",
        "recept": [["bird", "ice"]]
    },
    {
        "id": 60,
        "class": "steam_boiler",
        "text": "Паровой котел",
        "recept": [["steam", "metal"]]
    },
    {
        "id": 61,
        "class": "steam_engine",
        "text": "Паровой двигатель",
        "recept": [["steam_boiler", "coal"]]
    },
    {
        "id": 62,
        "class": "tractor",
        "text": "Трактор",
        "recept": [["steam_engine", "ground"]]
    },
    {
        "id": 63,
        "class": "salt",
        "text": "Соль",
        "recept": [["sea", "fire"]]
    },
    {
        "id": 64,
        "class": "ocean",
        "text": "Океан",
        "recept": [["sea", "sea"]]
    },
    {
        "id": 65,
        "class": "cactus",
        "text": "Кактус",
        "recept": [["desert", "tree"]]
    },
    {
        "id": 66,
        "class": "dino",
        "text": "Динозавр",
        "recept": [["egg", "ground"]]
    },
    {
        "id": 67,
        "class": "dragon",
        "text": "Дракон",
        "recept": [["dino", "fire"]]
    },
    {
        "id": 68,
        "class": "parrot",
        "text": "Попугай",
        "recept": [["bird", "rainbow"]]
    },
    {
        "id": 69,
        "class": "hummingbird",
        "text": "Колибри",
        "recept": [["bird", "flower"]]
    },
    {
        "id": 70,
        "class": "sunflower",
        "text": "Подсолнух",
        "recept": [["sun", "flower"]]
    },
    {
        "id": 71,
        "class": "mud",
        "text": "Грязь",
        "recept": [["dust", "rain"],["dust", "water"]]
    },
    {
        "id": 72,
        "class": "pheonix",
        "text": "Феникс",
        "recept": [["fire", "bird"]]
    },

    
];