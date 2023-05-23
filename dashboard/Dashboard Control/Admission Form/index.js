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
        this.sectionOneElements = document.querySelectorAll('.section-one');
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
        this.sectionOneSubmitBtn.addEventListener('click', () => this.showSectionOne());
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

    showSectionOne() {

        this.masterJSON.personalInfo = this.generateJSONForSectionOne();

        for (let i = 0; i < this.sectionOneElements.length; i++) {
            this.sectionOneElements[i].classList.add('hide');
        }

        this.sectionTwoElements.classList.remove('hide');
        this.sectionTwoElements.classList.add('show');

        console.log(this.masterJSON);
    }

    showSectionTwo() {
        this.masterJSON.healthQuestions = this.generateJSONForSectionTwoA();
        this.sectionTwoElements.classList.add('hide');
        this.sectionTwoElements.classList.remove('show');
        this.sectionThreeElements.classList.remove('hide');

        console.log(this.masterJSON);
    }

    showSectionThree() {

    }

    generateJSONForSectionOne() {
        var formData = {};
        formData.Date = document.getElementById("inputDate").value;
        formData.ActivationDate = document.getElementById("inputActivationDate").value;
        formData.FirstName = document.getElementById("inputFirstName").value;
        formData.MiddleName = document.getElementById("inputMiddleName").value;
        formData.LastName = document.getElementById("inputLastName").value;
        formData.Address = document.getElementById("inputAddress").value;
        formData.Mobile = document.getElementById("inputMobile").value;
        formData.Email = document.getElementById("inputEmail").value;
        formData.DOB = document.getElementById("inputDOB").value;
        formData.Age = document.getElementById("inputAge").value;
        formData.Gender = document.getElementById("inputGender").value;
        formData.BloodGroup = document.getElementById("inputBloodGroup").value;
        formData.Anniversary = document.getElementById("inputAnniversary").value;

        console.log(formData);
        return formData;
    }

    generateJSONForSectionTwoA() {
        // isAllSectionOneAFilled = false;
        var questions = document.querySelectorAll('.question-container li');

        var formAnswers = {
            questions: []
        };

        questions.forEach(function (question) {
            console.log(question);

            if (question.querySelector('input[type="radio"]:checked')) {
                var questionId = question.querySelector('input[type="radio"]').name;
                var answer = question.querySelector('input[type="radio"]:checked');

                if (answer.value !== null | answer.value !== "") {
                    formAnswers.questions.push({
                        id: questionId,
                        answer: answer.value
                    });
                }
            }
        });
        // console.log(formAnswers);
        // return formAnswers;
    }
}

const form = new Form();