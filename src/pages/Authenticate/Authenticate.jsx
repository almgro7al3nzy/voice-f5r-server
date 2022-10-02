import React, { useState } from "react";
import PhoneEmail from "../Authontication/PhoneEmailPage/PhoneEmail";
import GetOtp from "../Authontication/GetOtpPage/GetOtp";

const steps = {
  1: PhoneEmail,
  2: GetOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <>
      <Step onNext={onNext} />
    </>
  );
};

export default Authenticate;
