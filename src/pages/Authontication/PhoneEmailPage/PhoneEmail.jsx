import React, { useState } from "react";
import styles from "./PhoneEmail.module.css";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";

const PhoneEmailmap = {
  phone: Phone,
  email: Email,
};

const PhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const AuthComp = PhoneEmailmap[type];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.btnWrap}>
            <button
              className={`${styles.tabBtn} ${
                type === "phone" ? styles.active : ""
              }`}
              onClick={() => setType("phone")}
            >
              <img src="/images/phone-white.png" alt="phone" />
            </button>

            <button
              className={`${styles.tabBtn} ${
                type === "email" ? styles.active : ""
              }`}
              onClick={() => setType("email")}
            >
              <img src="/images/mail-white.png" alt="email" />
            </button>
          </div>
          <AuthComp onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default PhoneEmail;
