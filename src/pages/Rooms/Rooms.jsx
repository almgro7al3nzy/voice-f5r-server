import React from "react";
import styles from "./Rooms.module.css";
import RoomCard from "../../components/RoomCard/RoomCard";
import CreateRoomModel from "../../components/CreateRoomModel/CreateRoomModel";
import { useState } from "react";
import { useEffect } from "react";
import { getAllRooms } from "../../http";

// const rooms = [
//   {
//     id: 1,
//     topic: "Which framework best for frontend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: "What’s new in machine learning?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: "Why people use stack overflow?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

const Rooms = () => {
  const [showModel, setShowModel] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fatchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };
    fatchRooms();
  }, []);

  function openModel() {
    setShowModel(true);
  }

  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All Voice Rooms</span>
            <div className={styles.searchBox}>
              <img src="./images/search-icon.png" alt="serach-icon" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openModel} className={styles.startRoomButton}>
              <img src="./images/add-room-icon.png" alt="addRoom-icon" />
              <span>Start a room</span>
            </button>
          </div>
        </div>

        <div className={styles.roomlist}>
          {rooms.map((room) => (
            <>
              <RoomCard key={room.id} room={room} />
            </>
          ))}
        </div>
      </div>

      {showModel && <CreateRoomModel onClose={() => setShowModel(false)} />}
    </>
  );
};

export default Rooms;
