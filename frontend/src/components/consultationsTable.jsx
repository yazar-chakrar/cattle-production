import React from "react";

const ConsltsTable = (props) => {
  const { consltsPage, onDelete } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Disease</th>
          <th>Consultation date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {consltsPage.map((conslt) => {
          return (
            <tr key={conslt._id}>
              <td>{conslt.disease}</td>
              <td>{new Date(conslt.consltDate).toUTCString()}</td>
              <td>
                <button
                  onClick={() => onDelete(conslt)}
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

export default ConsltsTable;
