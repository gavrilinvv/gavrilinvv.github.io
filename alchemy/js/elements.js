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
        "text": "Вода"
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
        "class": "ferrum",
        "text": "Железо",
        "recept": [["meteor", "ground"]]
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
        "class": "volkano",
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
        "text": " Гейзер",
        "recept": [["ground", "steam"]]
    },
    {
        "id": 19,
        "class": "metal",
        "text": " Металл",
        "recept": [["fire", "stone"]]
    },
    {
        "id": 20,
        "class": "sand",
        "text": " Песок",
        "recept": [["stone", "air"]]
    }
];