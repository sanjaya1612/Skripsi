import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Gallery = ({ gallery }) => {
    return (
        <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={`/gallery/${gallery._id}`}>
                <Card.Img variant="top" src={gallery.image} width={110} height={200} />
            </Link>
            <Card.Body>
                <Link to={`/gallery/${gallery._id}`}>
                    <Card.Title as='div'><strong>{gallery.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={gallery.rating} text={`${gallery.numReviews} reviews`} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Gallery
