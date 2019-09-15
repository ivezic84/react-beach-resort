import React from "react";
import Title from "./Title";
import { useContext } from "react";
import { RoomContext } from "../context";

export default function RoomsFilter({ rooms }) {
  const context = useContext(RoomContext);

  const {
    name,
    type,
    capacity,
    size,
    minSize,
    maxSize,
    price,
    minPrice,
    maxPrice,
    handleChange,
    pets,
    breakfast
  } = context;

  // Funkcija koja vraca jedinstvene vrijednosti
  // Set samo prihvata jedinstvene vrijednosti
  const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
  };

  // Izvlacimo jedinstvene tipove soba
  let types = getUnique(rooms, "type");
  types = ["all", ...types];
  types = types.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  // Izvlacimo jedinstvene kapacitete soba
  let people = getUnique(rooms, "capacity");
  people = people.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  //Izvlacimo jedinstvene cijene soba
  let roomPrice = getUnique(rooms, "price");
  roomPrice = roomPrice.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  return (
    <section className="filter-container">
      <Title title="Search rooms"></Title>
      <form className="filter-form">
        {/* Filter type */}
        <div className="form-group">
          <label htmlFor="type">Room Types</label>
          <select
            name="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/* End filter type */}

        {/* Filter capacity */}
        <div className="form-group">
          <label htmlFor="capacity">Peoples</label>
          <select
            name="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {people}
          </select>
        </div>
        {/* End filter capacity */}

        {/* Filter price */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <select
            name="price"
            value={price}
            className="form-control"
            onChange={handleChange}
          >
            {price}
          </select>
        </div>
        {/* End filter price */}
      </form>
    </section>
  );
}
