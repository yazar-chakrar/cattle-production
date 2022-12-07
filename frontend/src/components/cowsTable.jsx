import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const CowsTable = (props) => {
    const {cowsPage, onDelete} = props
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Registration Number</th>
                    <th>Date In</th>
                    <th>Breed</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    cowsPage.map(cow => 
                        {
                            return (<tr key={cow.registerNumber}>
                                <td>{cow.registerNumber}</td>
                                <td>{cow.breed}</td>
                                <td>{cow.dateIn}</td>
                                <td><button onClick={() => onDelete(cow)} className="btn-danger btn-sm">Delete</button></td>
                            </tr>);
                        }
                    )
                }
            </tbody>
        </table>
    );
}

export default CowsTable