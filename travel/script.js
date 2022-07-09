const burger_menu = document.querySelector('.header_burger');
// const nav_action = document.querySelector('.navigation_list');
const nav = document.querySelector('.navigation');
const wra = document.querySelector('.wrapper_mobile');
if (burger_menu) {
    burger_menu.addEventListener("click", function (e) {
        wra.classList.toggle('active');
        nav.classList.toggle('active');
        burger_menu.classList.toggle('active');
        // nav_action.classList.toggle('active');
    });
}
const menu_links = document.querySelectorAll('.nav_item');
// const wra_active = document.querySelectorAll('.wrapper_mobile.active');
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
document.addEventListener("click", (e) =>{
    if ((!burger_menu.contains(e.target)) || (nav.contains(e.target))) {
        wra.classList.remove('active');
        nav.classList.remove('active');
        burger_menu.classList.remove('active');
    }
})

// if (wra_active.length > 0) {
//     wra_active.forEach(wra_active => {
//         wra_active.addEventListener("click", onMenuClick)
//     })
    

//     function onMenuClick(e) {
//         const wra_active = e.target;
//         if (burger_menu.classList.contains('active')) {
//             wra.classList.remove('active');
//             nav.classList.remove('active');
//             burger_menu.classList.remove('active');
//         }
//     }
// }

// function onMenuClick()
// const nav_it = document.querySelectorAll('.nav_item');
// if (nav_it) {
//     nav_it.forEach(nav_it).addEventListener("click", function(e) {
//         wra.classList.remove('active');
//         nav.classList.remove('active');
//         burger_menu.classList.remove('active');
//     });
// }