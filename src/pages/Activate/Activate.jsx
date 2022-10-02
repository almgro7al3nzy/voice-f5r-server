import React,{ useState} from "react";
import EnterName from "../Authontication/EnterNamePage/EnterName"
import ChooseProfile from "../Authontication/ChooseProfilePage/Profile"

const steps = {
  1: EnterName,
  2: ChooseProfile,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  function onNext() {
    setStep(step + 1);
  }

  return (
    <>
      <div>
        <Step onNext={onNext} />
      </div>
    </>
  );
};

export default Activate;
