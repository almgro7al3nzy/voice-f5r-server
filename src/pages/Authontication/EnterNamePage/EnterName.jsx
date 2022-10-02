import React, { useState } from "react";
import styles from "./EnterName.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";

const EnterName = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.activate);

  const [fullname, setFullname] = useState(name);
  function nameSubmit() {
    if (!fullname) {
      return;
    }

    dispatch(setName(fullname));

    onNext();
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter your fullname" icon={"goggle-emoji"}>
          <TextInput
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <p className={styles.bottomParagraph}>
            People use real names at codershouse :)
          </p>
          <div className={styles.actionBtnWrap}>
            <Button btnName="Next" onPress={nameSubmit} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default EnterName;
