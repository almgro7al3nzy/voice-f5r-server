import React, { useState } from "react";
import styles from "./GetOtp.module.css";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import { verifyOtp } from "../../../http/index";
import { useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

const GetOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const { phone, hash } = useSelector((state) => state.auth.otp);
  const dispatch = useDispatch();

  async function otpSubmit() {

    if(!otp || !phone || !hash) {
      return;
    }
    try {
      const res = await verifyOtp({ otp, phone, hash });
      const data = res.data;
      dispatch(setAuth(data));
      console.log(data);
      onNext();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon={"lock-emoji"}>
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionBtnWrap}>
            <Button btnName="Next" onPress={otpSubmit} />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default GetOtp;
