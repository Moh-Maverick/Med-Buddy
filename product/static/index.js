
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        signInWithPopup,
        GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


const firebaseConfig = {
    aapiKey: "AIzaSyBuZ-Z-G_wjKm1yxzz0O26IzEBMXfURpWg",
  authDomain: "med-app-2fde8.firebaseapp.com",
  databaseURL: "https://med-app-2fde8-default-rtdb.firebaseio.com",
  projectId: "med-app-2fde8",
  storageBucket: "med-app-2fde8.firebasestorage.app",
  messagingSenderId: "712372987359",
  appId: "1:712372987359:web:7d6b205ec366c0d4eed06a",
  measurementId: "G-JLBSPB84R1"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();




/* === UI === */

/* == UI - Elements == */

const signOutButtonEl = document.getElementById("sign-out-btn")
signOutButtonEl.addEventListener("click", authSignOut)

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")



// const imgElement = document.getElementById("user-profile-picture")

// const greetElement = document.getElementById("greeting")

// const textareaEl = document.getElementById("post-input")
// const postButtonEl = document.getElementById("post-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)





/* === Main Code === */
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        user.getIdToken().then(function(idToken) {
            // The ID token you need
            console.log(idToken);
            // Send the ID token to your server, etc.
        });
        
        showLoggedInView(user)
        showProfilePicture(imgElement, user)
        showUserGreeting(greetElement, user)
      // ...
    } else {
        showLoggedOutView()
    }
  });
  


/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            user.getIdToken().then(function(idToken) {
                // The ID token you need
                console.log(idToken);
                // Send the ID token to your server, etc.
            });
            
            showLoggedInView(user)
            showProfilePicture(imgElement, user)
            showUserGreeting(greetElement, user)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.error(error.message)
        });

    
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")

    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User signed in: ", user)
            clearAuthFields()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in: ", errorMessage)
        });
}

function authCreateAccountWithEmail() {

    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User created: ", user)
            clearAuthFields()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error creating user: ", errorMessage)
        });

}

function authSignOut() {
    console.log("User signed out")
    signOut(auth).then(() => {
        console.log("User signed out")
      }).catch((error) => {
        console.error(error.message)
      });
}


/* == Functions - UI Functions == */

function showLoggedOutView() {
    console.log("Show logged out view")
}

function showLoggedInView(user) {
    console.log("Show logged in view")
    console.log(user.uid)
    window.location.href = '/dashboard';

    
}


function clearInputField(field) {
	field.value = ""
}

function clearAuthFields() {
	clearInputField(emailInputEl)
	clearInputField(passwordInputEl)
}


