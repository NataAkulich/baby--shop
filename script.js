const items = [{
        title: "Светильник-мобиль музыкальный с проэктором 3в1, серый - Infantino",
        description: "музыкальная",
        tags: ["BOY", "GIRL"],
        price: 60,
        img: "1.jpg",
        rating: 4.4,
    },
    {
        title: " O.M.G.Movie Magic <<Королева Кураж>> ",
        description: "Коллекционная",
        tags: ["cat", "dog"],
        price: 85,
        img: "./img/2.jpg",
        rating: 4.1,
    },
    {
        title: "Музыкальная игрушка <<КОТОФОН>> ",
        description: "музыкальная",
        tags: ["BOY", "GIRL"],
        price: 30,
        img: "./img/3.jpg",
        rating: 5.0,
    },
    {
        title: "Машинка <<Дикий офф-роуд>> ",
        description: "Радиоуправляемые игрушки",
        tags: ["BOY"],
        price: 55,
        img: "./img/4.jpg",
        rating: 3.7,
    },
    {
        title: "Игровой центр <<Счастливый малыш>>",
        description: "звуковые эффекты, световые эффекты",
        tags: ["BOY", "GIRL"],
        price: 120,
        img: "./img/5.jpg",
        rating: 1.9,
    },
    {
        title: "Растяжка-спираль <<Зоо Жираф Озорник>> ",
        description: "Развивающая!",
        tags: ["BOY", "GIRL"],
        price: 75,
        img: "./img/6.jpg",
        rating: 3.2,
    },
    {
        title: "Фигурка Star wars. Малыш Йода <<Мандалорец>> - Hasbro",
        description: "Содержит полный комплекс витаминов",
        tags: ["BOY"],
        price: 170,
        img: "./img/7.jpg",
        rating: 2.9,
    },
    {
        title: "Игровой набор <<Семья Драконицы Дианы>> - Enchantimals",
        description: "Пластик высокого качества",
        tags: ["GIRL"],
        price: 89,
        img: "./img/8.jpg",
        rating: 4.4,
    },
    {
        title: "NA! NA! NA! SURPRISE Игровой набор серии <<Teens>> ",
        description: "Коллекционная",
        tags: ["GIRL"],
        price: 150,
        img: "./img/9.jpg",
        rating: 2.8,
    },
    {
        title: "Игра с липучками <<Мама и малыш>>",
        description: "Развивающая моторику",
        tags: ["BOY", "GIRL"],
        price: 35,
        img: "./img/10.jpg",
        rating: 4.2,
    },
    {
        title: "Баттатокачалка серии <<Родео>> единорог дилли-долли",
        description: "Качалка",
        tags: ["BOY", "GIRL"],
        price: 140,
        img: "./img/11.jpg",
        rating: 3.0,
    },
    {
        title: "Игровой набор <<Military Team. Военный корабль>>",
        description: "Игровой набор",
        tags: ["BOY"],
        price: 42,
        img: "./img/12.jpg",
        rating: 2.1,
    },
];


let currentState = [...items];


const itemsContainer = document.querySelector("#shop-items");

const itemTemplate = document.querySelector("#item-template");

const nothingFound = document.querySelector("#nothing-found");


function renderItems(arr) {

    nothingFound.textContent = "";

    itemsContainer.innerHTML = "";

    arr.forEach((item) => {

        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {

    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }
    // Если они равны
    return 0;
}

// Вызываем функцию для отрисовки в самом начале
// И тут же сортируем по алфавиту
renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

// Функция для создания верстки конкретного товара
function prepareShopItem(shopItem) {
    // Деструктурируем свойства объекта
    const { title, description, tags, img, price, rating } = shopItem;
    // Берем за основу шаблон товара
    const item = itemTemplate.content.cloneNode(true);
    // Наполняем его информацией из объекта
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;

    // Находим контейнер для рейтинга
    const ratingContainer = item.querySelector(".rating");
    // Рисуем нужное количество звездочек
    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    // Находим шаблон для тегов
    const tagsHolder = item.querySelector(".tags");

    // Отрисовываем теги для товара
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    // Возвращаем HTML-элемент
    return item;
}

// Инпут для поиска
const searchInput = document.querySelector("#search-input");
// Кнопка
const searchButton = document.querySelector("#search-btn");

// Функция для поиска по товарам (сбрасывает фильтры)
function applySearch() {
    // Взяли значение инпута и "причесали" его
    // Привели к нижнему регистру, чтобы написание не мешало поиску
    const searchString = searchInput.value.trim().toLowerCase();

    // Нашли все товары, в title которых есть searchString
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    // Отсортировали их по алфавиту
    currentState.sort((a, b) => sortByAlphabet(a, b));
    // Отрисовали результаты поиска
    renderItems(currentState);
    // По умолчанию сортировка "по алфавиту"
    sortControl.selectedIndex = 0;
}

// Обработчик при клике на кнопку поиска
searchButton.addEventListener("click", applySearch);
// Обработчик события поиска при взаимодействии с инпутом
searchInput.addEventListener("search", applySearch);

// Селект с опциями сортировки
const sortControl = document.querySelector("#sort");
// Обработчик события выбора опции из селекта
sortControl.addEventListener("change", (event) => {
    // Атрибут value опции селекта, что выбрал пользователь
    const selectedOption = event.target.value;
    // В зависимости от вида сортировки упорядочиваем массив товаров
    switch (selectedOption) {
        case "expensive":
            {
                // Сначала дорогие
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                // Сначала дешевые
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                // От более высокого рейтинга к более низкому
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                // По алфавиту
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    // Массив упорядочили — осталось его отрисовать
    renderItems(currentState);
});
