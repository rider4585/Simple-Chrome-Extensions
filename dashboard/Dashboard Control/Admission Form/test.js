class Form {
    constructor() {
        this.buttons = document.querySelectorAll('.button');
        this.otherBtn = document.getElementById('otherBtn');
        this.inputBoxContainer = document.getElementById('inputBoxContainer');
        this.otherInput = document.getElementById('otherInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.ageInput = document.querySelector('#inputAge');
        this.dobInput = document.querySelector('#inputDOB');
        this.sectionOneSubmitBtn = document.querySelector('.section-one-btn');
        this.sectionTwoSubmitBtn = document.querySelector('.section-two-btn');
        this.sectionThreeSubmitBtn = document.querySelector('.section-three-btn');
        this.sectionOneElements = document.querySelectorAll('.section-one');
        this.sectionTwoElements = document.querySelector('.section-two');
        this.sectionThreeElements = document.querySelectorAll('.section-three');

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
        this.sectionOneSubmitBtn.addEventListener('click', () => this.generateJSONForSectionOne());
        this.sectionTwoSubmitBtn.addEventListener('click', () => this.showSectionTwo());
        this.sectionThreeSubmitBtn.addEventListener('click', () => this.showSectionThree());

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

    // showSectionOne() {
    //     for (const element in this.sectionOneElements) {
    //         element.setAttribute('style', 'display:none;');
    //     }
    //     this.sectionTwoElements.setAttribute('style', 'display:block;');
    // }

    // showSectionTwo() {

    // }

    // showSectionThree() {

    // }

    generateJSONForSectionOne(event) {
        console.log("hi");
        // event.preventDefault();
        var formData = {};

        formData.inputDate = document.getElementById("inputDate").value;
        formData.inputActivationDate = document.getElementById("inputActivationDate").value;
        formData.inputFirstName = document.getElementById("inputFirstName").value;
        formData.inputMiddleName = document.getElementById("inputMiddleName").value;
        formData.inputLastName = document.getElementById("inputLastName").value;
        formData.inputAddress = document.getElementById("inputAddress").value;
        formData.inputMobile = document.getElementById("inputMobile").value;
        formData.inputEmail = document.getElementById("inputEmail").value;
        formData.inputDOB = document.getElementById("inputDOB").value;
        formData.inputAge = document.getElementById("inputAge").value;
        formData.inputGender = document.getElementById("inputGender").value;
        formData.inputBloodGroup = document.getElementById("inputBloodGroup").value;
        formData.inputAnniversary = document.getElementById("inputAnniversary").value;

        // var jsonData = JSON.stringify(formData);

        console.log(formData);
        // return false;
    }

    // handleSubmit() {
    //     const selectedValues = Array.from(this.buttons)
    //         .filter(button => button.classList.contains('selected') && button !== this.otherBtn)
    //         .map(button => button.textContent);

    //     if (this.otherBtn.classList.contains('selected')) {
    //         const otherConditions = this.otherInput.value.trim().split(',');
    //         selectedValues.push(...otherConditions.map(condition => condition.trim()));
    //     }

    //     const selectedItemsObject = {
    //         selectedValues: selectedValues
    //     };

    //     console.log(selectedItemsObject); // You can modify this line to do something else with the object
    // }
}

const form = new Form();