import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDHKxUR28jvWxKKVPEIEi970zdDRPRqYwA",
    authDomain: "my-project-1521996125333.firebaseapp.com",
    databaseURL: "https://my-project-1521996125333.firebaseio.com",
    projectId: "my-project-1521996125333",
    storageBucket: "my-project-1521996125333.appspot.com",
    messagingSenderId: "907758163261",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;