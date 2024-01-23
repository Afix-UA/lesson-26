// ДЗ

// Задача №1
// Дано в html: три елементи з класом item.
// При кліку на кожен з елментів додати клас active,
// при повторному кліку прибрати клас
document.addEventListener("click", function (e) {
    if (e.target.closest(".link")) {
        e.target.classList.toggle("active");
        e.preventDefault();
    }
});

// Задача №2
// Дано в css/scss: body прозорий
// При повному завантаженню сторінки додати клас до body який прибирає прозорість.
window.addEventListener("DOMContentLoaded", function (e) {
    let timeout = setTimeout(() => {
        const body = document.querySelector("body");
        body.style.backgroundColor = "#3abbbd9a";
    }, 2000);
    clearTimeout(timeout);
    // додав setTimeou що було наглядно видно
});

// Задача №3
// Дано в html: header main footer
// Пи наведенні курсору на header змінювати колір фону у footer.
// Коли курсор йде з header повертати початковий фон для footer.
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");

let footerBg = window.getComputedStyle(footer, null).backgroundColor;
console.log(footerBg);

if (header) {
    header.addEventListener("mouseover", function () {
        // Змінюємо колір фону footer при наведенні на header
        footer.style.backgroundColor = "lightcoral";
    });
    header.addEventListener("mouseout", function () {
        // Змінюємо колір фону footer при наведенні на header
        footer.style.backgroundColor = footerBg;
    });
}

// Задача №4
// Дано в html: текст, елемент з класом item, текст. Так, що елемент з класом item за межами в'юпотрта.
// Створити функцію яка будує інтервал який буде змінювати контент в елементі item виводячи цифру яка збільшується на одиницю: 1 2 3 ... і т.д.
// Затримка між зміною числа, та до якого числа має працювати інтервал має задаватись в дата атрибутах елемента item.
// Функція має запустатить коли ми доскролюємо до елементу item (його видно), і не запускатись повторно.


let isIntervalRunning = false;

let options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    /*
        threshhold: 0.3 відсоток появи об'єкту у в'юпорті 0.3 це 30% від розміру елементу який відслідковується
        0 це будь яка поява
        1 це повна поява об'кта в в'юпорті
        */
    threshhold: 0.3,
};

let callback = (entries, observer) => {
    entries.forEach((entry) => {
        const targetElement = entry.target;
        if (entry.isIntersecting) {
            targetElement.classList.add("show");
            startCounter(target);
        } else {
            // isIntervalRunning = false;
            targetElement.classList.remove("show");
            
        }
    });
};

let observer = new IntersectionObserver(callback, options);
let target = document.querySelector(".item");
observer.observe(target);

function startCounter(element) {
    let start = parseInt(element.getAttribute("data-start")) || 1;
    let end = parseInt(element.getAttribute("data-end")) || 10;
    let speed = parseInt(element.getAttribute("data-speed")) || 1000;
    let interval;
    clearInterval(interval);
    // Перевірка, чи вже запущений інтервал
    if (!isIntervalRunning) {
        // Встановлення інтервалу
        interval = setInterval(function () {
        if (start <= end && start !== 0) {
            element.textContent = start;
            start++;
            isIntervalRunning = true;
        } else {
            clearInterval(interval);
        }
        }, speed); // Наприклад, інтервал кожну секунду
        // Встановлення флагу, що інтервал запущено
        isIntervalRunning = true;
    } else {
        console.log("Interval is already running");
    }
}

// Виклик функції для запуску інтервалу
