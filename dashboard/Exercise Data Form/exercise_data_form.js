// Get the form element
var exerciseData = {};
const form = document.querySelector('#exercise-form');
const dataToAppendDiv = document.querySelector('.dataToAppend');

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
    createDetailsView(exerciseData);
});

function createDetailsView(exerciseData) {
    let innerHtmlToAppend = "";
    let tempData = "";
    for (const exerciseNameField in exerciseData) {
        tempData = '';
        for (const exerciseDataField in exerciseData[exerciseNameField]) {
            tempData = `
            <details>
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

    document.querySelector('.dataToAppend').innerHTML = innerHtmlToAppend;
    showHideCopyBtn();
}

function showHideCopyBtn() {
    if (Object.keys(exerciseData).length == 0) {
        document.querySelector('.copy-btn').classList.add('hide');
    } else {
        document.querySelector('.copy-btn').classList.remove('hide');
    }
}

function copyToClipboard() {
    //show this only when data is present
    const jsonString = JSON.stringify(exerciseData);
    navigator.clipboard.writeText(jsonString)
        .then(() => {
            console.log('Copied to clipboard:', jsonString);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
        });
}

function loadData() {
    //check if user has provided valid json
    exerciseData = JSON.parse(prompt('Paste your data here'));
    createDetailsView(exerciseData);
}

function editDetails(exerciseNameField) {
    if (exerciseData.hasOwnProperty(exerciseNameField)) {
        document.querySelector('#exercise-name').value = exerciseNameField;
        document.querySelector('#body-part').value = exerciseData[exerciseNameField]['Body Part'];
        document.querySelector('#muscle-involved').value = exerciseData[exerciseNameField]['Muscle Involved'];
        document.querySelector('#joint-involved').value = exerciseData[exerciseNameField]['Joint Involved'];
        document.querySelector('#exercise-type').value = exerciseData[exerciseNameField]['Type of Exercise'];
        document.querySelector('#equipment-used').value = exerciseData[exerciseNameField]['Equipment Used'];
        document.querySelector('#workout-splits').value = exerciseData[exerciseNameField]['Workout Splits'];
        document.querySelector('#location').value = exerciseData[exerciseNameField]['Location'];
        document.querySelector('#form-and-technique').value = exerciseData[exerciseNameField]['Form and Technique'];
        document.querySelector('#images-link').value = exerciseData[exerciseNameField]['Images Link'];
        document.querySelector('#gif-link').value = exerciseData[exerciseNameField]['GIF Link'];
        document.querySelector('#video-link').value = exerciseData[exerciseNameField]['Video Link'];
        document.querySelector('#benefits').value = exerciseData[exerciseNameField]['Benefits'];
    } else {
        alert(`Data for ${exerciseNameField} does not exists!`)
    }
}

function deleteRecord(exerciseNameField) {
    if (confirm(`Do you really want to delete data of ${exerciseNameField}`)) {
        delete exerciseData[exerciseNameField];
        createDetailsView(exerciseData);
    }
}

function fillForm() {
    document.querySelector('#exercise-name').value = 'Push-up';
    document.querySelector('#body-part').value = 'Upper body';
    document.querySelector('#muscle-involved').value = 'Chest, triceps, shoulders';
    document.querySelector('#joint-involved').value = 'Shoulder';
    document.querySelector('#exercise-type').value = 'Compound';
    document.querySelector('#equipment-used').value = 'Bodyweight';
    document.querySelector('#workout-splits').value = 'Full body';
    document.querySelector('#location').value = 'Anywhere';
    document.querySelector('#form-and-technique').value = 'Start in a plank position with your hands shoulder-width apart. Lower your body until your chest touches the ground, then push back up to the starting position. Keep your core tight and your elbows close to your body.';
    document.querySelector('#images-link').value = 'www.example.com';
    document.querySelector('#gif-link').value = 'www.example.com';
    document.querySelector('#video-link').value = 'www.example.com';
    document.querySelector('#benefits').value = 'Strengthens upper body muscles, Improves core stability';
}