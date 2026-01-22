import React, { useState } from "react";
import Step1Personal from "../Pages/Step1Personal";
import Step2Account from "../Pages/Step2Account";
import Step3Preferences from "../Pages/Step3Preferences";
import ReviewSubmit from "../Pages/ReviewSubmit";

function MultiStepRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    ender: "",
    notifications: "false",
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const updateForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div>
      <h2>step :{step} of 4</h2>
      {step === 1 && (
        <Step1Personal data={formData} update={updateForm} next={next} />
      )}

      {step === 2 && (
        <Step2Account
          data={formData}
          update={updateForm}
          next={next}
          back={back}
        />
      )}

      {step === 3 && (
        <Step3Preferences
          data={formData}
          update={updateForm}
          next={next}
          back={back}
        />
      )}

      {step === 4 && <ReviewSubmit data={formData} back={back} />}
    </div>
  );
}

export default MultiStepRegistration;
