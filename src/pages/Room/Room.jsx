import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useWebRTC from "../../Hooks/useWebRTC";
import styles from "./Room.module.css";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef } = useWebRTC(roomId, user);



  const handleManualBack = () => {
    
  }

  return (
    <>
      <div>
        <div className="container">
          <button onClick = {handleManualBack} className={styles.goBack}>
            <img src="/images/arrow-left.png" alt="arrow" />
            <span>All Voice Rooms</span>
          </button>
        </div>
        <h1>All connected clients</h1>
        {clients.map((client) => {
          return (
            <>
              <div className={styles.userHead} key={client.id}>
                <audio
                  ref={(instance) => provideRef(instance, client.id)}
                  autoPlay
                ></audio>

                <img className={styles.userAvatar} src={client.avatar} alt="" />
                <h4>{client.name}</h4>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Room;
