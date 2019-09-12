import React, { Component } from "react";
import items from "./data";
//Kreiramo NADKLASU koja ce biti iznad svih ostalih komponenti
//Slizu nam da zaobidjemo sve ostale komponente i dodjemo do podataka

// Kreiramo const RoomContext i pozivamo context API
// Nakon sto smo ga pozvali imamo pristup dvije komponente
// Prva je Provider, i sluzi nam da pristupamo svim komponentama koje imamo u Context API
// Druga je Consumer, i sluzi da pristupamo podacima koje dobijamo od Provider-a
const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    featuredRooms: [],
    sortedRooms: [],
    loading: true
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);

    this.setState({
      rooms: rooms,
      featuredRooms: featuredRooms,
      sortedRooms: rooms,
      loading: false
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      // Uzimamo citav objekat "fields" i ubacujmo nove vrijednosti ili updateujemo ako vec imaju neke
      // Ubacujemo images i id odnosno dvije varijable koje smo vec izvukli
      let room = { ...item.fields, images: images, id: id };

      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    let rooms = [...this.state.rooms];
    let singleRoom = rooms.find(room => room.slug === slug);
    return singleRoom;
  };

  render() {
    return (
      <div>
        <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
          {this.props.children}
        </RoomContext.Provider>
      </div>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
