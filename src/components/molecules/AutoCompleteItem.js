import React from "react";

export default function AutoCompleteItem({ data, onSelectItem, isActive }) {
  return (
    <li
      className={`search__result--wrapper--list ${isActive ? "active" : ""}`}
      onClick={onSelectItem}
    >
      <div className="d-flex align-items-center">
        <figure className="search__result--wrapper--list--image">
          <img
            src={
              data.image
                ? `http://localhost:3001/uploads/product/${data.image}`
                : "/assets/images/default.png"
            }
            alt="h"
            className="rounded-circle"
          />
        </figure>

        <h6>{data.name}</h6>
      </div>
    </li>
  );
}
