import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAlkqBseMsKLwP4HsSqATHSry17PQqYNTg",
    authDomain: "yuwe-fitness.firebaseapp.com",
    databaseURL: "https://yuwe-fitness-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "yuwe-fitness",
    storageBucket: "yuwe-fitness.appspot.com",
    messagingSenderId: "411480626389",
    appId: "1:411480626389:web:accc7f74bb1568d3007e5c",
    measurementId: "G-V4G0LYXZX6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const exerciseDataDB = ref(database, 'exercise-name');

// Get the form element
var exerciseData = {};
const form = document.querySelector('#exercise-form');
const dataToAppendDiv = document.querySelector('.dataToAppend');
const saveToDB = document.querySelector('#saveToDB');
const deleteBtn = document.querySelectorAll('.btn-danger');

onValue(exerciseDataDB, function (snapshot) {
    const data = snapshot.val();
    localStorage.setItem('exerciseData', data);
    exerciseData = JSON.parse(data);
    if (Object.keys(exerciseData).length !== 0) {
        createDetailsView(exerciseData);
    }
    showHideCopyBtn();
}, (error) => {
    alert(error.message);
});

// Add event listener for form submission
form.addEventListener('submit', function (event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get the input values
    const exerciseName = document.querySelector('#exercise-name').value;
    const bodyPart = document.querySelector('#body-part').value;
    const muscleInvolved = document.querySelector('#muscle-involved').value;
    const jointInvolved = document.querySelector('#joint-involved').value;
    const exerciseType = document.querySelector('#exercise-type').value;
    const equipmentUsed = document.querySelector('#equipment-used').value;
    const workoutSplits = document.querySelector('#workout-splits').value;
    const location = document.querySelector('#location').value;
    const formAndTechnique = document.querySelector('#form-and-technique').value;
    const imagesLink = document.querySelector('#images-link').value;
    const gifLink = document.querySelector('#gif-link').value;
    const videoLink = document.querySelector('#video-link').value;
    const benefits = document.querySelector('#benefits').value;

    // Create the exercise object
    exerciseData[exerciseName] = {
        'Body Part': bodyPart,
        'Muscle Involved': muscleInvolved,
        'Joint Involved': jointInvolved,
        'Type of Exercise': exerciseType,
        'Equipment Used': equipmentUsed,
        'Workout Splits': workoutSplits,
        'Location': location,
        'Form and Technique': formAndTechnique,
        'Images Link': imagesLink.split(',').map(link => link.trim()),
        'GIF Link': gifLink.split(',').map(link => link.trim()),
        'Video Link': videoLink,
        'Benefits': benefits
    };

    // Log the exercise object to the console
    // console.log(exerciseData);

    // Clear the form inputs
    form.reset();
    localStorage.setItem('exerciseData', JSON.stringify(exerciseData));
    createDetailsView(exerciseData);
});

function createDetailsView(exerciseData) {
    let innerHtmlToAppend = "";
    let tempData = "";
    for (const exerciseNameField in exerciseData) {
        tempData = '';
        for (const exerciseDataField in exerciseData[exerciseNameField]) {
            tempData = `
            <details id='${exerciseNameField}'>
                <summary class="btn-success">${exerciseNameField}</summary>
                <div class="container-fluid summery-data">
                    <div class="row">
                    <div class="col-md-4"><strong>Body Part:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Body Part']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Muscle Involved:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Muscle Involved']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Joint Involved:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Joint Involved']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Type of Exercise:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Type of Exercise']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Equipment Used:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Equipment Used']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Workout Splits:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Workout Splits']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Location:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Location']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Form and Technique:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Form and Technique']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Images Link:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Images Link']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>GIF Link:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['GIF Link']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Video Link:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Video Link']}</div>
                    </div>
                    <div class="row">
                    <div class="col-md-4"><strong>Benefits:</strong></div>
                    <div class="col-md-8">${exerciseData[exerciseNameField]['Benefits']}</div>
                    </div>
                    <div class="row">
                    <button type="submit" class="btn btn-primary submit-btn-right" onclick="editDetails('${exerciseNameField}')">Edit</button>
                    </div>
                    <div class="row">
                    <button type="submit" class="btn btn-danger submit-btn-right" onclick="deleteRecord('${exerciseNameField}')">Delete</button>
                    </div>
                </div>
            </details>`;
        }

        innerHtmlToAppend += tempData;
    }

    dataToAppendDiv.innerHTML = innerHtmlToAppend;
    showHideCopyBtn();
}

function showHideCopyBtn() {
    if (Object.keys(exerciseData).length == 0) {
        saveToDB.classList.add('hide');
    } else {
        saveToDB.classList.remove('hide');
    }
}

saveToDB.addEventListener('click', function () {
    console.log("hi");
    let message = localStorage.getItem('exerciseData');
    set(exerciseDataDB, message);
});