import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'



const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [date,setDate] = useState("")
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const PaymentHandler = () => {
        localStorage.setItem("Qty",qty)
        localStorage.setItem("Date",date)
        // history.push(`/shipping/${match.params.id}?qty=${qty}`)
        history.push(`/login?redirect=booking/${match.params.id}`)
        // history.push('/login?redirect=shipping')
    }
    return (
        <>
            <Link className='btn btn-secondary my-3' to='/'><i className="fas fa-arrow-left"></i>
                Go Back
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} width={500} />
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
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
                                    <Col>Price : </Col>
                                    <Col>
                                        <strong>Rp.{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status : </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'in Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty : </Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Select date : </Col>
                                    <Col><input type="date" onChange={(e) => setDate(e.target.value)}></input></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup>
                                <br></br>
                                <Button
                                    onClick={PaymentHandler}
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0 && setDate == null}
                                > Proceed to payment </Button>
                            </ListGroup>
                        </ListGroup>
                    </Col>
                </Row>
            )}

        </>
    )
}

export default ProductScreen
