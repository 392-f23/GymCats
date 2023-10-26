import React, { useState } from "react";
import OnboardingPersonalPage from "./OnboardingPersonalPage";
import OnboardingPreferencePage from "./OnboardingPreferencePage";
import HomePage from "./HomePage";

function FormPage() {
  const [step, setStep] = useState(1);
  //db state to push to firebase
  const [dbState, setDBState] = useState({
    "PersonalData" : {},
    "PartnerPreferences" : {}
});

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
      page =  <OnboardingPersonalPage
        updateDB={setDBState}
        previousStep={previousStep}
        nextStep={nextStep}
      />;
      break;
    case 2:
      page = <OnboardingPreferencePage
        updateDB={setDBState}
        previousStep={previousStep}
        nextStep={nextStep}
        dbState={dbState}
      />;
      break;
    case 3:
      page  = <HomePage />;
      break;
  }

  
  return (
    <>
    {page}
    </>
  );
}

export default FormPage;
