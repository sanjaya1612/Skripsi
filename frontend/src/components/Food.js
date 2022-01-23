import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Food = ({ food }) => {
    return (
        <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={`/food/${food._id}`}>
                <Card.Img variant="top" src={food.image} width={110} height={200}/>
            </Link>
            <Card.Body>
                <Link to={`/food/${food._id}`}>
                    <Card.Title as='div'><strong>{food.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={food.rating} text={`${food.numReviews} reviews`} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Food
