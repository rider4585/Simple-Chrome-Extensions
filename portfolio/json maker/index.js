const jsonData = {
    'exercise': {}
};


const form = document.getElementById('exercise-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const exerciseName = document.getElementById('exercise-name').value;
    const musclesInvolved = document.getElementById('muscles-involved').value;

    jsonData['exercise'][exerciseName] = musclesInvolved;
    console.log(jsonData);
    document.querySelector("#output").innerHTML = JSON.stringify(jsonData);
});
document.querySelector("#Delete").addEventListener('click', function(){
    // console.log("hi");
    const exerciseName = document.getElementById('exercise-name').value;
    delete jsonData['exercise'][exerciseName];
    document.querySelector("#output").innerHTML = JSON.stringify(jsonData);
});