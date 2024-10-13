import React from 'react';

const CarPriceTable = ({ cars }) => {
  // Calculate total price for each car
  const carsWithTotalPrice = cars.map((car) => ({
    ...car,
    totalPrice: car.price + (car.imported ? car.price * 0.1 : car.price * 0.05),
  }));

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Imported</th>
          <th>Price</th>
          <th>Registration Fee</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {carsWithTotalPrice.map((car) => (
          <tr key={car.id} style={{ backgroundColor: car.totalPrice > 60000 ? 'red' : 'green' }}>
            <td>{car.id}</td>
            <td>{car.name}</td>
            <td>{car.imported ? 'Yes' : 'No'}</td>
            <td>{car.price}</td>
            <td>{car.imported ? car.price * 0.1 : car.price * 0.05}</td>
            <td>{car.totalPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarPriceTable;