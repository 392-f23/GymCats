import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
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
  appId: "1:930913179368:web:76edd7769ae673bef05b5d",
  measurementId: "G-K3JSSHGDW7",
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
        const { displayName, photoURL, uid } = user;
        localStorage.setItem("isSignedIn", true);
        localStorage.setItem("name", displayName);
        localStorage.setItem("photoUrl", photoURL);
        localStirage.setItem("uid", uid);
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
        };

        await setDoc(userDocRef, userData, { merge: true });

        const { displayName, photoURL, uid } = user;

        localStorage.setItem("isSignedIn", true);
        localStorage.setItem("name", displayName);
        localStorage.setItem("photoUrl", photoURL);
        localStorage.setItem("uid", uid);
        navigate(0);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const signInWithGoogle = (user, navigate) => {
  const { displayName, photoURL, uid } = user;
  localStorage.setItem("isSignedIn", true);
  localStorage.setItem("name", displayName);
  localStorage.setItem("photoUrl", photoURL);
  localStorage.setItem("uid", uid);
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
  // const id = localStorage.getItem("uid");
  const id = "test";
  const userDocRef = doc(db, "users", id);
  await setDoc(userDocRef, dbState, { merge: true });
  await updateDoc(userDocRef, dbState);
};

export const addExpense = async (newSpending) => {
  const id = localStorage.getItem("uid");
  const userDocRef = doc(db, "users", id);

  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const { expenses, SpendingHistory } = data;
    const { category, subcategory, amount } = newSpending;

    if (category in expenses) {
      const { subExpense, total } = expenses[category];

      if (subcategory in subExpense) {
        const value = subExpense[subcategory] + amount;
        const newSubExpense = {
          ...subExpense,
          [subcategory]: value,
        };

        const newExpense = {
          ...expenses,
          [category]: {
            subExpense: newSubExpense,
            total: total + amount,
          },
        };

        await updateDoc(userDocRef, {
          expenses: newExpense,
        });
      }
    }

    SpendingHistory.push(newSpending);

    await updateDoc(userDocRef, {
      SpendingHistory: SpendingHistory,
    });
  }
};

export async function changeIncome(income) {
  const id = localStorage.getItem("uid");
  const userDocRef = doc(db, "users", id);
  await updateDoc(userDocRef, {
    income: income,
  });
}

export async function changeBudget(budget) {
  const id = localStorage.getItem("uid");
  const userDocRef = doc(db, "users", id);
  await updateDoc(userDocRef, {
    budget: budget,
  });
}

export async function updateData(obj) {
  const id = localStorage.getItem("uid");
  const userDocRef = doc(db, "users", id);
  await updateDoc(userDocRef, {
    expenses: obj,
  });
}

export async function changeBudgetByCategory(category, budget) {
  const id = localStorage.getItem("uid");
  const userDocRef = doc(db, "users", id);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const { budgetByCategory } = data;

    const newBudgetByCategory = {
      ...budgetByCategory,
      [category]: budget,
    };

    await updateDoc(userDocRef, {
      budgetByCategory: newBudgetByCategory,
    });

    const newTotal = Object.entries(newBudgetByCategory).reduce(
      (sum, [_, value]) => sum + value,
      0
    );

    await updateDoc(userDocRef, {
      budget: newTotal,
    });
  }
}

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
};

export default submitFormInformation;
