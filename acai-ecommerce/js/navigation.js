class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        if(this.hamburger && this.navMenu) {
            this.addEventListeners();
        }
    }

    addEventListeners() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
        }));
    }
}

export default Navigation;
