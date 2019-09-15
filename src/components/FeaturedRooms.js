import React, { Component } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Title from "./Title";
import Room from "./Room";

export default class FeaturedRooms extends Component {
  // Na ovaj nacin pristupamo context-u kada radimo sa klasom
  static contextType = RoomContext;

  render() {
    const { loading, featuredRooms } = this.context;
    const rooms = featuredRooms.map(room => {
      return <Room key={room.id} room={room}></Room>;
    });

    return (
      <section className="featured-rooms">
        <Title title="featured rooms"></Title>
        <div className="featured-rooms-center">
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    );
  }
}
