import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
    props;
  return (
    <ul className="list-group">
      <li
        onClick={() => onItemSelect(null)}
        className={selectedItem ? "list-group-item" : "list-group-item active"}
      >
        All Breeds
      </li>
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
