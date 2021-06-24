window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabcontainer');  

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide'); // display: none
            item.classList.remove('show', 'fade'); // display: block
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); 
        });
    }    
    
    function showTabСontent(i = 0) { // 0 значення за замовчюваням
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabСontent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;                                        //делегирование

        if(target && target.classList.contains('tabheader__item')) {       
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabСontent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2021-08-26';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 *24)),
        hours = Math.floor((t /( 1000 * 60 *60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              second = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();      

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            second.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }      
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
            // modal.classList.add('show');
            // modal.classList.remove('hide'); 
        clearInterval(modalTimerId);    
    }      

    modalTrigger.forEach(trigger => {
        trigger.addEventListener('click', openModal);

    });

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
        // modal.classList.add('hide');
        // modal.classList.remove('show');
    }

    modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
               closeModal();
            }
    });          

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) {
           closeModal(); 
        }
    });

    // const modalTimerId = setTimeout(openModal, 10000);

    function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
                openModal();
                window.removeEventListener('scroll',showModalByScroll);
            }
    }

    window.addEventListener('scroll', showModalByScroll);

    // use class for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        } 

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>
        `;
        this.parent.append(element);
        }
    }

    // const div = new MenuCard();
    // div.render();
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container'
    // ).render();

    
});

