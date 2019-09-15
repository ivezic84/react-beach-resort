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
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    size: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    let maxPrice = Math.max(rooms.map(room => room.price));
    let maxSize = Math.max(rooms.map(room => room.price));

    this.setState({
      rooms: rooms,
      featuredRooms: featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice: maxPrice,
      maxSize: maxSize
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

  handleChange = event => {
    const target = event.target;
    const value = event.type === "checkbox" ? target.checked : target.value;
    const price = event.target.price;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let { rooms, type, capacity, sortedRooms } = this.state;
    let tempRooms = [...rooms];

    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type == type);
    }

    capacity = parseInt(capacity);

    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <div>
        <RoomContext.Provider
          value={{
            ...this.state,
            getRoom: this.getRoom,
            handleChange: this.handleChange
          }}
        >
          {this.props.children}
        </RoomContext.Provider>
      </div>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
