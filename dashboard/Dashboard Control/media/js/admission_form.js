class Form {
    constructor() {

        this.masterJSON = {};

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
        this.sectionOneElements = document.querySelector('.section-one');
        this.sectionTwoElements = document.querySelector('.section-two');
        this.sectionThreeElements = document.querySelector('.section-three');

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
        this.sectionOneSubmitBtn.addEventListener('click', () => this.showSectionTwo());
        this.sectionTwoSubmitBtn.addEventListener('click', () => this.showSectionThree());
        this.sectionThreeSubmitBtn.addEventListener('click', () => this.submitCompleteForm());

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

    showSectionTwo() {

        this.masterJSON.personalInfo = this.generateJSONForSectionOne();
        this.sectionOneElements.classList.add('hide');
        this.sectionTwoElements.classList.remove('hide');
    }

    showSectionThree() {
        this.sectionTwoElements.classList.remove('show');
        this.sectionTwoElements.classList.add('hide');
        this.sectionThreeElements.classList.remove('hide');
        this.masterJSON.healthQuestions = this.generateJSONForSectionTwoA();
        this.masterJSON.healthQuestions = this.generateJSONForSectionTwoB();
        this.masterJSON.healthQuestions = this.generateJSONForSectionTwoC();
        this.masterJSON.isConsentGiven = this.submitCompleteForm();

    }

    generateJSONForSectionOne() {
        let sectionOneFormData = {};

        sectionOneFormData.FirstName = document.getElementById("inputFirstName").value;
        sectionOneFormData.MiddleName = document.getElementById("inputMiddleName").value;
        sectionOneFormData.LastName = document.getElementById("inputLastName").value;
        sectionOneFormData.Address = document.getElementById("inputAddress").value;
        sectionOneFormData.Mobile = document.getElementById("inputMobile").value;
        sectionOneFormData.Email = document.getElementById("inputEmail").value;
        sectionOneFormData.DOB = document.getElementById("inputDOB").value;
        sectionOneFormData.Age = document.getElementById("inputAge").value;
        sectionOneFormData.Gender = document.getElementById("inputGender").value;
        sectionOneFormData.BloodGroup = document.getElementById("inputBloodGroup").value;
        sectionOneFormData.Anniversary = document.getElementById("inputAnniversary").value;

        this.masterJSON.date = document.getElementById("inputDate").value;
        this.masterJSON.activationDate = document.getElementById("inputActivationDate").value;

        return sectionOneFormData;
    }

    generateJSONForSectionTwoA() {
        let jsonData = {
            "question-section-1": {
                "question-1": document.querySelector('input[name="section-one-question-1"]:checked').value,
                "question-2": document.querySelector('input[name="section-one-question-2"]:checked').value,
                "question-3": document.querySelector('input[name="section-one-question-3"]:checked').value,
                "question-4": document.querySelector('input[name="section-one-question-4"]:checked').value,
                "question-5": document.querySelector('input[name="section-one-question-5"]:checked').value,
                "question-6": document.querySelector('input[name="section-one-question-6"]:checked').value,
                "question-7": document.querySelector('input[name="section-one-question-7"]:checked').value
            }
        };

        return jsonData;
    }

    generateJSONForSectionTwoB() {
        let jsonData = {
            "question-section-2": {
                "question-1": document.querySelector('input[name="section-two-question-1"]:checked').value,
                "question-2": document.querySelector('input[name="section-two-question-2"]').value,
                "question-3": document.querySelector('input[name="section-two-question-3"]').value,
                "question-4": document.querySelector('input[name="section-two-question-4"]').value,
                "question-5": document.querySelector('input[name="section-two-question-5"]:checked').value,
                "question-6": document.querySelector('input[name="section-two-question-6"]').value,
                "question-7": document.querySelector('input[name="section-two-question-7"]').value,
                "emergency_contact_name": document.querySelector('input[name="emergency_contact_name"]').value,
                "emergency_contact_number": document.querySelector('input[name="emergency_contact_number"]').value,
                "question-9": document.querySelector('input[name="section-two-question-8"]:checked').value,
                "question-10": document.querySelector('input[name="section-two-question-9"]').value,
                "question-11": document.querySelector('input[name="section-two-question-10"]').value,
                "question-12": document.querySelector('input[name="section-two-question-11"]:checked').value,
                "question-13": document.querySelector('input[name="section-two-question-12"]:checked').value
            }
        };
        return jsonData;
    }

    generateJSONForSectionTwoC() {
        const buttons = document.querySelectorAll('.medical-condition-btn');
        const otherInput = document.querySelector('#otherInput');
        const conditions = [];

        for (const element of buttons) {
            if (element.classList.contains('selected')) {
                conditions.push(element.textContent);
            }
        }

        const otherConditionsInputValue = otherInput.value.trim();
        if (otherConditionsInputValue !== '') {
            const otherConditions = otherConditionsInputValue.split(',').map(condition => condition.trim());
            conditions.push(...otherConditions);
        }

        const jsonData = {
            medicalConditions: conditions
        };

        return jsonData;
    }

    submitCompleteForm() {
        const consentCheckbox = document.getElementById('consent-checkbox');
        const consentGiven = consentCheckbox.checked;

        if (!consentGiven) {
            consentCheckbox.focus();
            consentCheckbox.style.textShadow = "text-shadow: 0px 0px 15px rgba(232,72,72,0.85)";
        } else {
            const jsonData = {
                consentGiven: consentGiven
            };
            return jsonData;
        }
    }

    readDataFromFlutter(fName, mName, lName, mobileNo) {
        document.getElementById("inputFirstName").value = fName;
        document.getElementById("inputMiddleName").value = mName;
        document.getElementById("inputLastName").value = lName;
        document.getElementById("inputMobile").value = mobileNo;
    }
}

const form = new Form();