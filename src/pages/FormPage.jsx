import React, { useState } from "react";
import OnboardingPersonalPage from "./OnboardingPersonalPage";
import OnboardingPreferencePage from "./OnboardingPreferencePage";

function FormPage() {
    const [step, setStep] = useState(1);
    //db state to push to firebase
    const [dbState, setDBState] = useState({})

    const previousStep = () => {
        setStep(step - 1);
    }

    const nextStep = () => {
        setStep(step + 1);
    }

    return (
        <>
            {() => {switch(step) {
                case 0:
                    <LoginPage /> 
                case 1:
                    <OnboardingPersonalPage updateDB = {setDBState} previousStep={previousStep} nextStep={nextStep} />
                case 2:
                    <OnboardingPreferencePage updateDB = {setDBState} previousStep={previousStep} nextStep={nextStep} />
                case 3: 
                    <HomePage />
            } } }
        </> 
    );
}

export default FormPage;