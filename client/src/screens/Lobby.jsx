import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/sockeProvider";
import { useNavigate } from "react-router-dom";

export const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  // console.log(socket);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    console.log(email, room);
    navigate(`/room/${room}`);
  }, []);

  useEffect(() => {
    socket.on("room:join", (data) => {
      console.log(`Data from BE ${data}`);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    });
  }, [socket, handleJoinRoom]);

  return (
    <>
      <h1>Lobby</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="room">Room No.</label>
        <input
          type="room"
          id="room"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <br />
        <br />
        <button>Join</button>
      </form>
    </>
  );
};
