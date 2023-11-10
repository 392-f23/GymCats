import React, { useState, useEffect } from "react";
import OnboardingPersonalPage from "./OnboardingPersonalPage";
import OnboardingPreferencePage from "./OnboardingPreferencePage";
import HomePage from "./HomePage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utility/firebase";

function FormPage() {
  const [step, setStep] = useState(1);
  const [dbState, setDBState] = useState({
    PersonalData: {},
    PartnerPreferences: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = localStorage.getItem("uid");
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists) {
          const data = userDoc.data();

          setDBState({
            PersonalData: data?.PersonalData || {},
            PartnerPreferences: data?.PartnerPreferences || {},
          });
        } else {
          console.error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const previousStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  var page;

  switch (step) {
    case 0:
      page = <LoginPage />;
      break;
    case 1:
      page = (
        <OnboardingPersonalPage
          updateDB={setDBState}
          previousStep={previousStep}
          nextStep={nextStep}
          dbState={dbState}
        />
      );
      break;
    case 2:
      page = (
        <OnboardingPreferencePage
          updateDB={setDBState}
          previousStep={previousStep}
          nextStep={nextStep}
          dbState={dbState}
        />
      );
      break;
    case 3:
      page = <HomePage />;
      break;
  }

  return <>{page}</>;
}

export default FormPage;
