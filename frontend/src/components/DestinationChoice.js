import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col,Card } from 'react-bootstrap';

const DestinationChoice = () => {
  return <>
  <h1>Destination Choice</h1>
  <Row>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={'/bali'}>
              <Card.Img src='images/bali123.jpg' width={110} height={145} />
            </Link>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={'/sulawesi'}>
              <Card.Img src='images/sulawesi.jpg' width={110} height={145} />
            </Link>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}> 
          <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={'/papua'}>
              <Card.Img src='images/papua.jpg' width={110} height={145} />
            </Link>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={'/ntt'}>
              <Card.Img src='images/ntt.jpg' width={110} height={145} />
            </Link>
          </Card>
        </Col>
      </Row>
  </>;
};

export default DestinationChoice;



