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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function signup() {
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  // console.log(name, email, password);
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = {
        email: email,
        name: name,
        date_joined: Date.now()
      }
      database_ref.child('users/' + user.uid).set(user_data)
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_code, error_message);
    })
}