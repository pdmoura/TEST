// Date functionality for dynamic footer content
class DateManager {
    constructor() {
        this.currentYearElement = document.getElementById('currentyear');
        this.lastModifiedElement = document.getElementById('lastModified');
        this.init();
    }

    init() {
        this.setCurrentYear();
        this.setLastModified();
    }

    setCurrentYear() {
        const currentYear = new Date().getFullYear();
        if (this.currentYearElement) {
            this.currentYearElement.textContent = currentYear;
        }
    }

    setLastModified() {
        if (this.lastModifiedElement) {
            const lastModified = document.lastModified;
            this.lastModifiedElement.textContent = `Last Modification: ${lastModified}`;
        }
    }
}

export default DateManager;
