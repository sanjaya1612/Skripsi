import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'


const ProductScreen = ({ match }) => {
    const [product, setProducts] = useState ({})

    useEffect(() => {
        const fetchProduct = async () => {
            const {data} = await axios.get(`/api/products/${match.params.id}`)

            setProducts(data)
        }

        fetchProduct()
    }, [match])
    return (
        <>
        <Link className='btn btn-secondary my-3' to='/'><i className="fas fa-arrow-left"></i> Go Back </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} width={300} />
                </Col>
                <Col md={3}>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                           <h3>{product.name}</h3> 
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price : Rp.{product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description : {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                <strong>Rp.{product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                {product.countInStock > 0 ? 'in Stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup>
                            <br></br>
                            <Button className='btn-block' 
                            type='button'
                            disabled={product.countInStock === 0}
                            > Add to Cart </Button>
                        </ListGroup>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
