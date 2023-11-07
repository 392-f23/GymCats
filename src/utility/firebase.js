import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzLs1kyY9QCLjdk7cTXP0NNOYmmRoVl4U",
  authDomain: "gymbuddy-e9e14.firebaseapp.com",
  projectId: "gymbuddy-e9e14",
  storageBucket: "gymbuddy-e9e14.appspot.com",
  messagingSenderId: "930913179368",
  appId: "1:930913179368:web:3487a1bc32808655f05b5d",
  measurementId: "G-ZW2TNBKVSZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const firebaseSignOut = () => signOut(auth);
const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(app), setUser), []);

  return [user];
};

const handleLogin = async (navigate) => {
  console.log("auth: ");
  console.log(auth);
  console.log("provider: ");
  console.log(provider);
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      // Check if the user's email is associated with an existing account
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

      if (signInMethods.length === 0) {
        // The email is not associated with an existing account
        // Prompt the user to sign up with Google
        signUpWithGoogle(navigate);
      } else {
        // The email is associated with an existing account
        // Redirect to home page or perform the sign-in logic as needed
        const { user } = result;
        signInWithGoogle(user, navigate);
        navigate("/home");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const checkIfLoggedIn = () => {
  const isSignedIn = localStorage.getItem("isSignedIn");
  return isSignedIn;
};

const handleLogOut = (navigate) => {
  signOut(auth);
  localStorage.removeItem("isSignedIn");
  localStorage.removeItem("name");
  localStorage.removeItem("photoUrl");
  localStorage.removeItem("uid");

  localStorage.removeItem("PersonalData");
  localStorage.removeItem("PartnerPreferences");
  navigate(0);
};

const checkIfSignedUp = async (uid) => {
  const authDocRef = doc(db, "users", uid);
  const snapshot = await getDoc(authDocRef);

  return snapshot.exists();
};

const signUpWithGoogle = async (navigate) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      const isSignedUp = await checkIfSignedUp(user.uid);

      if (isSignedUp) {
        signInWithGoogle(user, navigate);
      } else {
        const userDocRef = doc(db, "users", user.uid);
        const userData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          onboarded: false,
          PersonalData: {},
          PartnerPreferences: {},
        };
        await setDoc(userDocRef, userData, { merge: true });
        signInWithGoogle(user, navigate);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const signInWithGoogle = async (user, navigate) => {
  const { displayName, photoURL, uid } = user;
  localStorage.setItem("isSignedIn", true);
  localStorage.setItem("name", displayName);
  localStorage.setItem("photoUrl", photoURL);
  localStorage.setItem("uid", uid);

  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();
  localStorage.setItem("PersonalData", JSON.stringify(data.PersonalData));
  localStorage.setItem(
    "PartnerPreferences",
    JSON.stringify(data.PartnerPreferences)
  );
  navigate(0);
};

const isOnboarded = async () => {
  const id = localStorage.getItem("uid");

  if (!id) {
    return false;
  }

  const userDocRef = doc(db, "users", id);
  const snapshot = await getDoc(userDocRef);
  if (snapshot.exists()) {
    const data = snapshot.data();
    const { onboarded } = data;

    if (onboarded === undefined) {
      return false;
    }

    return onboarded;
  } else {
    return false;
  }
};

const submitFormInformation = async (dbState) => {
  console.log(dbState);
  const uid = localStorage.getItem("uid");
  const userDocRef = doc(db, "users", uid);
  await setDoc(userDocRef, dbState, { merge: true });
  await updateDoc(userDocRef, dbState);
};
/*
const updatePersonalInfo = async (dbState) => {
    const uid = localStorage.getItem("uid"); 
    const userDocRef = doc(db, "users", uid); 
    await setDoc(userDocRef, )
}*/

const fetchUserData = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    const data = await snapshot.data();
    return data;
  }

  return null;
};

export const fetchAllData = async () => {
  const userCol = await collection(db, "users");
  console.log("usrColl: ", userCol);
  var userData = {};
  userCol.forEach((doc) => {
    userData[doc.id] = doc.data();
  });
  return userData;
};

export const fetchPersonalData = async () => {
  const uid = localStorage.getItem("uid");
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    const data = snapshot.data();
    return data;
  }

  return null;
};
//handlers to update DB for not-interested and interested requests!
export const addNotInterested = async (id) => {
  const uid = localStorage.getItem("uid");
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    NotInterested: arrayUnion(id),
  });
};

// TODO: Remove from homepage after sending interested request
export const addInterested = async (id) => {
  console.log("addInterested call");
  const uid = localStorage.getItem("uid");
  console.log(`id arg: ${id}`);
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    Requests: arrayUnion(id),
  });

  const userRef2 = doc(db, "users", id);
  await updateDoc(userRef2, {
    requests: arrayUnion(uid),
  });
};

export const getNotInterested = async () => {
  const uid = localStorage.getItem("uid");
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    const data = snapshot.data();
    return data.notInterested;
  }

  return null;
};

export {
  db,
  auth,
  provider,
  signInWithGoogle,
  firebaseSignOut as signOut,
  useAuthState,
  handleLogin,
  signUpWithGoogle,
  handleLogOut,
  checkIfLoggedIn,
  isOnboarded,
  submitFormInformation,
  fetchUserData,
};

export default submitFormInformation;
