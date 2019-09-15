import React from "react";
import RoomsList from "./RoomsList";
import RoomsFiler from "./RoomsFilter";
import { RoomConsumer } from "../context";
import Loading from "./Loading";

export default function RoomContainer() {
  return (
    <RoomConsumer>
      {value => {
        const { loading, rooms, sortedRooms } = value;

        if (loading) {
          return <Loading></Loading>;
        }
        return (
          <div>
            <RoomsFiler rooms={rooms}></RoomsFiler>
            <RoomsList rooms={sortedRooms}></RoomsList>
          </div>
        );
      }}
    </RoomConsumer>
  );
}
