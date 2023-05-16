class Form {
    constructor() {
        this.buttons = document.querySelectorAll('.button');
        this.otherBtn = document.getElementById('otherBtn');
        this.inputBoxContainer = document.getElementById('inputBoxContainer');
        this.otherInput = document.getElementById('otherInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.ageInput = document.querySelector("#inputAge");
        this.dobInput = document.querySelector("#inputDOB");

        this.init();
    }

    init() {
        this.setDateValue();
        this.attachEventListeners();
    }

    setDateValue() {
        document.getElementById("inputDate").valueAsDate = new Date();
    }

    attachEventListeners() {
        this.ageInput.addEventListener('click', () => this.calculateAge());
        this.otherBtn.addEventListener('click', () => this.toggleInputBox());
        this.submitBtn.addEventListener('click', () => this.handleSubmit());

        this.buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                button.classList.toggle('selected');
                if (button === this.otherBtn) {
                    this.toggleInputBox();
                }
            });
        });
    }

    calculateAge() {
        const dob = this.dobInput.value;
        const dobDate = new Date(dob);
        const todayDate = new Date();

        let age = todayDate.getFullYear() - dobDate.getFullYear();
        const monthDiff = todayDate.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && todayDate.getDate() < dobDate.getDate())) {
            age--;
        }

        this.ageInput.value = age;
    }

    toggleInputBox() {
        this.inputBoxContainer.style.display = this.otherBtn.classList.contains('selected') ? 'inline-block' : 'none';
    }

    handleSubmit() {
        const selectedValues = Array.from(this.buttons)
            .filter(button => button.classList.contains('selected') && button !== this.otherBtn)
            .map(button => button.textContent);

        if (this.otherBtn.classList.contains('selected')) {
            const otherConditions = this.otherInput.value.trim().split(',');
            selectedValues.push(...otherConditions.map(condition => condition.trim()));
        }

        const selectedItemsObject = {
            selectedValues: selectedValues
        };

        console.log(selectedItemsObject); // You can modify this line to do something else with the object
    }
}

const form = new Form();