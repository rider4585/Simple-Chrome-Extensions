// 
function editDetails(exerciseNameField) {
    let exerciseDataTemp = localStorage.getItem('exerciseData');
    let exerciseData = JSON.parse(exerciseDataTemp);
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
    let exerciseDataTemp = localStorage.getItem('exerciseData');
    let exerciseData = JSON.parse(exerciseDataTemp);
    if (confirm(`Do you really want to delete data of ${exerciseNameField}`)) {
        delete exerciseData[exerciseNameField];
        localStorage.setItem('exerciseData', JSON.stringify(exerciseData));
        document.querySelector(`#${exerciseNameField}`).remove();
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