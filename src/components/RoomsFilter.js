import React from "react";
import Title from "./Title";
import { useContext } from "react";
import { RoomContext } from "../context";

export default function RoomsFilter({ rooms }) {
  const context = useContext(RoomContext);

  console.log(context);

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
          <label htmlFor="price">Room price ${price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        {/* End filter price */}

        {/* Filter Room Size */}
        <div className="form-group">
          <label htmlFor="size">Room size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              className="form-control"
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              className="form-control"
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* End Room Size */}

        {/* Filter Room Size */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              value={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              value={pets}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Pets</label>
          </div>
        </div>

        {/* End Room Size */}
      </form>
    </section>
  );
}
