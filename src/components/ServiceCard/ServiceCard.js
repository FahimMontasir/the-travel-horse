import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServiceCard = ({ car, handleCategory }) => {
  const { category, img } = car;
  return (
    <Card onClick={() => handleCategory(car)} as={Link} to="/destination" style={{ width: '18rem', textAlign: 'center', textDecoration: 'none', padding: '5px', margin: '10px' }}>
      <Card.Img variant="top" src={img} style={{ width: '160px', height: '130px', margin: '0 auto' }} />
      <Card.Body>
        <Card.Title>{category}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;