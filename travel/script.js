const burger_menu = document.querySelector('.header_burger');
const nav = document.querySelector('.navigation');
const nav1 = document.querySelector('.navigation.active');
const wra = document.querySelector('.wrapper_mobile');
const nav_list = document.querySelector('.navigation_list');
const popup = document.querySelectorAll('.open_popup');
const popup_wrapper = document.querySelector('.popup_wrapper');
const signIn = document.querySelector('.popup_sign-in');
const signUp = document.querySelector('.popup_sign-up');
const email = document.querySelector('.email_input');
const password = document.querySelector('.password_input');
const buttonAlert = document.querySelector('.button_entrance');
const menu_links = document.querySelectorAll('.nav_item');
const changeToSignUp = document.querySelector('.popup_buttom_link');


if (burger_menu) {
    burger_menu.addEventListener("click", function (e) {
        wra.classList.toggle('active');
        nav.classList.toggle('active');
        burger_menu.classList.toggle('active');
    });
}


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

if (popup.length > 0)  {
    popup.forEach(popup => {
        popup.addEventListener("click", function (e) {
            popup_wrapper.classList.toggle('active');
            signIn.classList.toggle('active');
        });
    })
}


document.addEventListener("click", (e) => {
    if (popup_wrapper.contains(e.target) && !signIn.contains(e.target) && !signIn.contains(e.target))  {
        popup_wrapper.classList.remove('active');
        signIn.classList.remove('active');
        signUp.classList.remove('active');
    } 
})

if (buttonAlert) {
    buttonAlert.addEventListener("click", function (e) {
       alert(`E-mail: ${email.value} 
Password: ${password.value}`)
    });
}

if (changeToSignUp) {
    changeToSignUp.addEventListener("click", function (e) {
        document.querySelector('.pop_tittle').innerHTML = "Create account";
        document.querySelector('.popup_buttom-text').innerHTML = "Already have an account?";
        document.querySelector('.popup_buttom_link').innerHTML = "Log in";
        document.querySelector('.button_entrance').innerHTML = "Sign Up";
        document.getElementsByClassName('sign-in_button')[1].style.display = "none";
        document.getElementsByClassName('sign-in_button')[0].style.display = "none";
        document.getElementsByClassName('popup_line_between')[0].style.display = "none";
        document.getElementsByClassName('popup_line')[1].style.display = "none";
        document.getElementsByClassName('popup_line')[0].style.display = "none";
        document.getElementsByClassName('popup_text_link')[0].style.display = "none";
     });
 }




console.log('Слайдер не успел сделать, если есть возможность пожалуйста проверьте в четверг, постараюсь успеть')

