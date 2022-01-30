import React from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { diffDays } from '../actions/hotelActions';

const Hotel = ({ hotel }) => {
    return (
        <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={`/hotel/${hotel._id}`}>
                <Card.Img variant="top" src={hotel.image} width={110} height={200}/>
            </Link>
            <Card.Body>
                <Link to={`/hotel/${hotel._id}`}>
                    <Card.Title as='div'><strong>{hotel.title}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={hotel.rating} text={`${hotel.numReviews} reviews`} />
                </Card.Text>
                {/* <Card.Text as='div'>
                    <span className='text-primary'>
                        for {diffDays(hotel.from, hotel.to)} {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
                    </span>
                </Card.Text> */}
                {/* <Card.Text as='div'>
                    {`${hotel.description.substring(0,50)}...`}
                </Card.Text> */}
            </Card.Body>
        </Card>
    )
};

export default Hotel;
