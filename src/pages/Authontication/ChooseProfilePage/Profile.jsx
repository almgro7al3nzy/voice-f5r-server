import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";

const Profile = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [img, setImg] = useState("./images/monkey-avatar.png");
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);

  function captureImg(e) {
    const file = e.target.files[0];
    const reader = new FileReader(); // inbuilt api of browser
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImg(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  async function submit() {
    if (!name || !avatar) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });

      if (data.auth) {
        if (!unMounted) {
          dispatch(setAuth(data));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      setUnMounted(true);
    };
  }, []);

  if (loading) return <Loader message="Activation in progress...." />;
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={`Welcome ${name}`} icon={"monkey-emoji"}>
          <div className={styles.avatarWrappper}>
            <img className={styles.avatar} src={img} alt="avatar" />
          </div>

          <div>
            <input
              onChange={captureImg}
              id="avatarInput"
              type="file"
              className={styles.avatarInput}
            />
            <label htmlFor="avatarInput" className={styles.avatarLabel}>
              Choose your picture
            </label>
          </div>

          <div className={styles.actionBtnWrap}>
            <Button btnName="Next" onPress={submit} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
