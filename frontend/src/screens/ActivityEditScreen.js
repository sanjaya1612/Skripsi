import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails } from '../actions/productActions'


const ActivityEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [destination, setDestination] = useState('')
    const [city, setCity] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDestination(product.destination)
            setCity(product.city)
            setDescription(product.description)
        }
    }, [dispatch, history, productId, product])
const submitHandler = (e) => {
    e.preventDefault()
    //update product
}

return (
    <>
        <Link to='/admin/activitylist' className='btn btn-primary my-3'>Go Back</Link>
        <FormContainer>
            <h1>Edit Activities</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                    <Form.Label>Count in stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter qty'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='destination'>
                    <Form.Label>Destination</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter destination'
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='desctiption'>
                    <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <br />
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            )}

        </FormContainer>
    </>
)
}

export default ActivityEditScreen
