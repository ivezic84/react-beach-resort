import React, { Component } from "react";
//import items from "./data";
//Kreiramo NADKLASU koja ce biti iznad svih ostalih komponenti
//Slizu nam da zaobidjemo sve ostale komponente i dodjemo do podataka

// Kreiramo const RoomContext i pozivamo context API
// Nakon sto smo ga pozvali imamo pristup dvije komponente
// Prva je Provider, i sluzi nam da pristupamo svim komponentama koje imamo u Context API
// Druga je Consumer, i sluzi da pristupamo podacima koje dobijamo od Provider-a

// Importujemo contentful
import Client from "./contentful";

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

  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResort",
        order: "sys.createdAt"
      });
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.price));

      this.setState({
        rooms: rooms,
        featuredRooms: featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice: maxPrice,
        maxSize: maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      // Uzimamo citav objekat "fields" i ubacujmo nove vrijednosti ili updateujemo ako vec imaju neke
      // Ubacujemo images i id odnosno dvije varijable koje smo vec izvukli
      let room = { ...item.fields, images, id };
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
    const value = target.type === "checkbox" ? target.checked : target.value;
    //const price = event.target.price;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    let tempRooms = [...rooms];

    capacity = parseInt(capacity);
    price = parseInt(price);

    // Filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    // Filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    // Filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // Filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    // FIlter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    // FIlter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    // Change state
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
