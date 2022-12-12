import React from "react";

const BirthsTable = (props) => {
  const { birthsPage, onDelete } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Birth Date</th>
          <th>Mother Number</th>
          <th>Mother Breed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {birthsPage.map((birth) => {
          return (
            <tr key={birth._id}>
              <td>{new Date(birth.bithDate).toUTCString()}</td>
              <td>{birth.motherCowId}</td>
              <td>{birth.motherBreed}</td>
              <td>
                <button
                  onClick={() => onDelete(birth)}
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

export default BirthsTable;
