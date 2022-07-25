const burger_menu = document.querySelector('.header_burger');
const nav = document.querySelector('.navigation');
const nav1 = document.querySelector('.navigation.active');
const wra = document.querySelector('.wrapper_mobile');
const nav_list = document.querySelector('.navigation_list');
if (burger_menu) {
    burger_menu.addEventListener("click", function (e) {
        wra.classList.toggle('active');
        nav.classList.toggle('active');
        burger_menu.classList.toggle('active');
    });
}
const menu_links = document.querySelectorAll('.nav_item');

if (menu_links.length > 0) {
    menu_links.forEach(menu_links => {
        menu_links.addEventListener("click", onMenuClick)
    }) 

    function onMenuClick(e) {
        const menu_link = e.target;
        if (burger_menu.classList.contains('active')) {
            wra.classList.remove('active');
            nav.classList.remove('active');
            burger_menu.classList.remove('active');
        }
    }
}
document.addEventListener("click", (e) => {
    if (!nav_list.contains(e.target) && !burger_menu.contains(e.target)) {
        wra.classList.remove('active');
        nav.classList.remove('active');
        burger_menu.classList.remove('active');
    }
})

console.log('верстка сотвестует макету 48 - баллов(есть маленькие расхождения в пару пикселей\nнет полосы прокрутки при ширине страницы от 1440рх до 390px - 7 балов\nнет полосы прокрутки при ширине страницы от 390px до 320рх - 8 балов\nпри ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка - 2 балла\nпри нажатии на бургер-иконку плавно появляется адаптивное меню - 4 балла\nадаптивное меню соответствует макету - 4 балла\nпри нажатии на крестик адаптивное меню плавно скрывается уезжая за экран - 2 балла(возможно не достаточно плавно уезжает\nссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (все, кроме Account, она пока просто закрывает меню) - 4 балла\nпри клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна - 4 балла\n общее количество балов')

