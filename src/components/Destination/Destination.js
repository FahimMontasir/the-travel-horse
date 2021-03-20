import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Destination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale } from '@fortawesome/free-solid-svg-icons'

const Destination = ({ car }) => {
  const { img, amount, category } = car;
  const [searchedResult, setSearchedResult] = useState({ isSearched: false, from: "", to: "" });
  //to change search state
  const handleSearch = (e) => {
    const result = { ...searchedResult };
    result.isSearched = true;
    setSearchedResult(result)
    e.preventDefault()
  }
  //to take input value
  const handleInput = (e) => {
    const inputText = { ...searchedResult }
    inputText[e.target.name] = e.target.value;
    setSearchedResult(inputText)
  }
  return (
    <Container>
      <Row>
        <Col lg={4}>
          <div className="card-bg">
            {!searchedResult.isSearched ?
              <form onSubmit={handleSearch} className="Search-Card">
                <label htmlFor="from">Pick  from</label>
                <input name="from" onBlur={handleInput} type="text" id="from" required />
                <label htmlFor="to">Pick  to</label>
                <input name="to" onBlur={handleInput} type="text" id="to" required />
                <input type="submit" value="Search" style={{ marginTop: '1.5rem' }} />
              </form> :
              <div>
                <div className="location">
                  <h3>From: {searchedResult.from}</h3>
                  <h3>To: {searchedResult.to}</h3>
                </div>
                {
                  amount?.map((item, idx) => {
                    return (
                      <div key={idx} className="vehicle">
                        <img src={img} alt="mini logo" />
                        <div>
                          <h5>{category} <FontAwesomeIcon icon={faMale} /> {item.quantity}</h5>
                        </div>
                        <h5>${item.price}</h5>
                      </div>
                    )
                  })
                }
              </div>}
          </div>
        </Col>
        <Col lg={8}>sm=4</Col>
      </Row>
    </Container>
  );
};

export default Destination;