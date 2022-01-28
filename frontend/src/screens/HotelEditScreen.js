import React, { useState, useEffect } from 'react'
// import AlgoliaPlaces from 'algolia-places-react'

import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listHotelDetails, updateHotel } from '../actions/hotelActions'
import { HOTEL_UPDATE_RESET } from '../constants/hotelConstants'

const config = {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
    language: "en",
    countries: ["id"],
}

const HotelEditScreen = ({ match, history }) => {
    const hotelId = match.params.id

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [star, setStar] = useState(0)
    const [location, setLocation] = useState([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [bed, setBed] = useState('')
    var loc = ""


    const dispatch = useDispatch()

    const hotelDetails = useSelector((state) => state.hotelDetails)
    const { loading, error, hotel } = hotelDetails

    const hotelUpdate = useSelector((state) => state.hotelUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = hotelUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: HOTEL_UPDATE_RESET })
            history.push('/admin/hotellist')
        } else {
            if (!hotel.title || hotel._id !== hotelId) {
                dispatch(listHotelDetails(hotelId))
            } else {
                setTitle(hotel.title)
                setPrice(hotel.price)
                setImage(hotel.image)
                setLocation(hotel.location)
                setStar(hotel.star)
                setDescription(hotel.description)
                setFrom(hotel.from)
                setTo(hotel.to)
                setBed(hotel.bed)
            }
        }
    }, [dispatch, history, hotelId, hotel, successUpdate])

    // const uploadFileHandler = async (e) => {
    //      const file = e.target.files[0]
    //      const formData = new FormData()
    //      formData.append('image', file)
    //      setUploading(true)

    //      try{
    //          const config = {
    //              headers: {
    //                  'Content-Type': 'multipart/form-data'
    //              }
    //          }
    //          const{data} = await axios.post('/api/upload', formData, config)

    //          setImage(data)
    //          setUploading(false)
    //      }catch (error){
    //          console.log(error)
    //          setUploading(false)
    //      }
    // }

    const submitHandler = (e) => {
        console.log(location)
        e.preventDefault()
        dispatch(updateHotel({
            _id: hotelId,
            title,
            price,
            description,
            image,
            star,
            location,
            from,
            to,
            bed,
        }))
    }

    return (
        <>
            <Link to='/admin/hotellist' className='btn btn-dark my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Hotel</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='title'>
                            <Form.Label>Tile</Form.Label>
                            <Form.Control
                                type='title'
                                placeholder='Enter Hotel Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}></Form.Control>
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
                            {/* <Form.File
                                id='image-file'
                                custom onChange={uploadFileHandler}>
                            </Form.File>
                            {uploading && <Loader />} */}
                        </Form.Group>

                        <Form.Group controlId='location'>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}></Form.Control>
                        </Form.Group>

                        {/* <Form.Group controlId='location'>
                            <Form.Label>Location</Form.Label>
                            <AlgoliaPlaces
                                className='form-control ml-2 mr-2'
                                type='text'
                                placeholder='Location'
                                defaultValue={location}
                                options={config}
                                onChange={({ suggestion }) => setLocation(suggestion.value)}
                                style={{ height: "50px" }}
                            />
                        </Form.Group> */}

                        <Form.Group controlId='star'>
                            <Form.Label>star</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter hotel star'
                                value={star}
                                onChange={(e) => setStar(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='from'>
                                <Form.Label>From</Form.Label>
                                <Form.Control
                                    type='date'
                                    placeholder='Enter date'
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='to'>
                                <Form.Label>To</Form.Label>
                                <Form.Control
                                    type='date'
                                    placeholder='Enter date'
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}></Form.Control>
                            </Form.Group>

                        <Form.Group controlId='bed'>
                            <Form.Label>bed</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter hotel bed(s)'
                                value={bed}
                                onChange={(e) => setBed(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='desctiption'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as='textarea'
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

export default HotelEditScreen
