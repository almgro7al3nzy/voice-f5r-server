import React from "react";
import styles from "./Phone.module.css";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { useState } from "react";
import { sendOtp } from "../../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  async function submit() {
    if(!phoneNumber) return;
    const res = await sendOtp({ phone: phoneNumber });
    const data = res.data;
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }

  return (
    <Card title={"Enter your phone number"} icon={"phone"}>
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className={styles.actionBtnWrap}>
          <Button btnName="Next" onPress={submit} />
        </div>

        <p className={styles.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
