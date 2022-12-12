import React from "react";

const CowsTable = (props) => {
  const { cowsPage, onDelete } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Registration Number</th>
          <th>Breed</th>
          <th>Join date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cowsPage.map((cow) => {
          return (
            <tr key={cow._id}>
              <td>{cow.registerNumber}</td>
              <td>{cow.breed}</td>
              <td>{new Date(cow.dateIn).toUTCString()}</td>
              <td>
                <button
                  onClick={() => onDelete(cow)}
                  className="btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CowsTable;
