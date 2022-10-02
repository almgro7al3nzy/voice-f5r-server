import React, { useState } from "react";
import styles from "./CreateRoomModel.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from "../../http";
import { useNavigate } from "react-router-dom";

const CreateRoomModel = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  async function createRoom() {
    try {
      if (!topic) {
        return;
      }
      const { data } = await create({ topic, roomType });
      navigate(`/room/${data.id}`)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className={styles.modelMask}>
        <div className={styles.modelBody}>
          <button onClick={onClose} className={styles.closeBtn}>
            <img src="./images/close.png" alt="closed" />
          </button>
          <div className={styles.modelHeader}>
            <h3 className={styles.heading}>Enter the topic to be discussed</h3>
            <TextInput
              fullwidth="true"
              vlaue={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <h2 className={styles.subHeading}>Room Types</h2>
            <div className={styles.roomsTypes}>
              <div
                onClick={() => setRoomType("open")}
                className={`${styles.typeBox} ${
                  roomType === "open" ? styles.active : ""
                }`}
              >
                <img src="./images/globe.png" alt="globe" />
                <span>Open</span>
              </div>
              <div
                onClick={() => setRoomType("social")}
                className={`${styles.typeBox} ${
                  roomType === "social" ? styles.active : ""
                }`}
              >
                <img src="./images/social.png" alt="social" />
                <span>Social</span>
              </div>
              <div
                onClick={() => setRoomType("private")}
                className={`${styles.typeBox} ${
                  roomType === "private" ? styles.active : ""
                }`}
              >
                <img src="./images/lock.png" alt="lock" />
                <span>Private</span>
              </div>
            </div>
          </div>
          <div className={styles.modelFooter}>
            <h2>Start a room,open to everyone</h2>
            <button onClick={createRoom} className={styles.footerBtn}>
              <img src="./images/celebration.png" alt="celebration" />
              <span> Let's Go</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoomModel;
