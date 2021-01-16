import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDaq5RlYlDm7EKV9k0SS2XiRTlyYb7n8fg',
  authDomain: '',
  databaseURL: '',
  projectId: 'smuth',
  storageBucket: '',
  messagingSenderId: '12345-insert-yourse',
  appId: 'insert yours: 1:434329412595:android:3cbc3459de650cb706e886',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };