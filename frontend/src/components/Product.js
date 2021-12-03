import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className='mb-3' style={{ width: '17rem' }}>
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} width={110} height={200} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews}reviews`} />
                </Card.Text>
                <Card.Text as='h3'>Rp.{product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
