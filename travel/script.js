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
let popChange = document.querySelector('.pop_tittle')


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
        if (popChange.textContent === 'Log in to your account') {
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
        } else {
            popChange.textContent = 'Log in to your account';
            document.querySelector('.popup_buttom-text').innerHTML = "Don’t have an account?";
            document.querySelector('.popup_buttom_link').innerHTML = "Register";
            document.querySelector('.button_entrance').innerHTML = "Sign in";
            document.getElementsByClassName('sign-in_button')[1].style.display = "flex";
            document.getElementsByClassName('sign-in_button')[0].style.display = "flex";
            document.getElementsByClassName('popup_line_between')[0].style.display = "flex";
            document.getElementsByClassName('popup_line')[1].style.display = "flex";
            document.getElementsByClassName('popup_line')[0].style.display = "none";
            document.getElementsByClassName('popup_text_link')[0].style.display = "flex";
        }

     });
 }

//  Slieder starts
// let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
let btnPrv = document.querySelector('.arroy_mobile1');
let btnNext = document.querySelector('.arroy_mobile2');
let slider = document.querySelector('.block_pic');
let sliders = document.querySelectorAll('.destination_pic');
let slidersCount = document.querySelector('.destination_pic').offsetWidth
let slederLength = (slidersCount.length - 1)
let viewSlide = -1;


btnNext.addEventListener("click", function (e) {

    if (viewSlide < 1) {
        viewSlide++
    } else {
        viewSlide = -1
    }
    let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
    slider.style.transform = `translateX(${-viewSlide * veiwport}px)`;
    if (slider.style.transform == `translateX(${(0) * veiwport}px)`) {
        console.log(10)
        document.querySelector('.dote2').style.opacity = '1';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '0.5';
    } else if (slider.style.transform == `translateX(${(-1) * veiwport}px)`) {
        document.querySelector('.dote2').style.opacity = '0.5';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '1';
    }
    else if (slider.style.transform == `translateX(${(1) * veiwport}px)`) {
        document.querySelector('.dote2').style.opacity = '0.5';
        document.querySelector('.dote1').style.opacity = '1';
        document.querySelector('.dote3').style.opacity = '0.5';
    }
});

btnPrv.addEventListener("click", function (e) {

    if (viewSlide > -1) {
        viewSlide--
    } else {
        viewSlide = 1

    }
    let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
    slider.style.transform = `translateX(${-viewSlide * veiwport}px)`;
    if (slider.style.transform == `translateX(${(0) * veiwport}px)`) {
        console.log(10)
        document.querySelector('.dote2').style.opacity = '1';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '0.5';
    } else if (slider.style.transform == `translateX(${(-1) * veiwport}px)`) {
        document.querySelector('.dote2').style.opacity = '0.5';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '1';
    }
    else if (slider.style.transform == `translateX(${(1) * veiwport}px)`) {
        document.querySelector('.dote2').style.opacity = '0.5';
        document.querySelector('.dote1').style.opacity = '1';
        document.querySelector('.dote3').style.opacity = '0.5';
    }
});


[document.querySelector('.destination1'), document.querySelector('.dote1')].forEach(item => {
    item.addEventListener('click', event => { 
        if (( window.innerWidth <= 390 )) {
            let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
            slider.style.transform = `translateX(${-(-1) * veiwport}px)`;
            document.querySelector('.dote2').style.opacity = '0.5';
            document.querySelector('.dote1').style.opacity = '1';
            document.querySelector('.dote3').style.opacity = '0.5';
        } else {
            let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
            slider.style.transform = `translateX(${-(-1) * veiwport / 2}px)`;
            document.querySelector('.dote2').style.opacity = '0.5';
            document.querySelector('.dote1').style.opacity = '1';
            document.querySelector('.dote3').style.opacity = '0.5';
        }
    })
})

document.querySelector('.destination2').addEventListener('click', event => { 
    if (( window.innerWidth <= 390 )) {
        let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${0}px)`;
    } else {
        let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${0}px)`;
        document.querySelector('.dote2').style.opacity = '1';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '0.5';
    }
})

document.querySelector('.dote2').addEventListener('click', event => { 
    if (( window.innerWidth <= 390 )) {
        let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${0}px)`;
        document.querySelector('.dote2').style.opacity = '1';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '0.5';
    } else {
        let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${0}px)`;
        document.querySelector('.dote2').style.opacity = '1';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '0.5';
    }
})
document.querySelector('.destination3').addEventListener('click', event => { 
    if (( window.innerWidth <= 390 )) {
        let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${-1 * veiwport}px)`;
    } else {
        let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${-1 * veiwport / 2}px)`;
        document.querySelector('.dote2').style.opacity = '0.5';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '1';
    }
})

document.querySelector('.dote3').addEventListener('click', event => { 
    if (( window.innerWidth <= 390 )) {
        let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${-1 * veiwport}px)`;
        document.querySelector('.dote2').style.opacity = '0.5';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '1';
    } else {
        let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${-1 * veiwport / 2}px)`;
        document.querySelector('.dote2').style.opacity = '0.5';
        document.querySelector('.dote1').style.opacity = '0.5';
        document.querySelector('.dote3').style.opacity = '1';
    }
})

window.addEventListener('resize', (e) => {
    if (( window.innerWidth <= 390 )) {
        let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${(1) * veiwport}px)`;


    }
    else  {
         let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
        slider.style.transform = `translateX(${(0) * veiwport}px)`;
    }

  });
  if (( window.innerWidth <= 390 )) {
    let veiwport = document.querySelector('.destinations_wrapper').offsetWidth;
   slider.style.transform = `translateX(${(1) * veiwport}px)`;
}
//  Slieder ends

console.log('')

