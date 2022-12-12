import React from "react";

const MilkProdsTable = (props) => {
  const { MilkProdsPage, onDelete } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Production Date</th>
          <th>Quantity (L)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {MilkProdsPage.map((milkProd) => {
          return (
            <tr key={milkProd._id}>
              <td>{new Date(milkProd.prodDate).toUTCString()}</td>
              <td>{milkProd.quantity} Litres</td>
              <td>
                <button
                  onClick={() => onDelete(milkProd)}
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

export default MilkProdsTable;
