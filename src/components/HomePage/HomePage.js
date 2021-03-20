import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import Data from '../../Data/data'
import './HomePage.css'
const HomePage = ({ handleCategory }) => {
  const ServiceData = Data;
  return (
    <div className="background">
      {
        ServiceData.map(car => <ServiceCard key={car.id} car={car} handleCategory={handleCategory} />)
      }
    </div>
  );
};

export default HomePage;