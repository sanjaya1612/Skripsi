import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
import Message from '../components/Message'
import Loader from '../components/Loader' 
import FormContainer from '../components/FormContainer'
import { listGalleryDetails, updateGallery } from '../actions/galleryActions'
import { GALLERY_UPDATE_RESET } from '../constants/galleryConstants'

const GalleryEditScreen = ({ match, history }) => {
    const galleryId = match.params.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [image, setImage] = useState('')


    const dispatch = useDispatch()

    const galleryDetails = useSelector((state) => state.galleryDetails)
    const { loading, error, gallery } = galleryDetails

    const galleryUpdate = useSelector((state) => state.galleryUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = galleryUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: GALLERY_UPDATE_RESET })
            history.push('/admin/gallerylist')
        } else {
            if (!gallery.name || gallery._id !== galleryId) {
                dispatch(listGalleryDetails(galleryId))
            } else {
                setName(gallery.name)
                setImage(gallery.image)
                setLocation(gallery.location)
                setDescription(gallery.description)
            }
        }
    }, [dispatch, history, galleryId, gallery, successUpdate])

    const submitHandler = (e) => {
        console.log(location)
        e.preventDefault()
        dispatch(updateGallery({
            _id: galleryId,
            name,
            description,
            image,
            location,
        }))
    }

    return (
        <>
            <Link to='/admin/gallerylist' className='btn btn-dark my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Gallery</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Gallery Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>

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

export default GalleryEditScreen