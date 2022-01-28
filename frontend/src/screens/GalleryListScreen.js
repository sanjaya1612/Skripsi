import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listGalleries, deleteGallery, createGallery} from '../actions/galleryActions'
import { GALLERY_CREATE_RESET } from '../constants/galleryConstants'


const GalleryListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const galleryList = useSelector(state => state.galleryList)
    const { loading, error, galleries } = galleryList

    const galleryDelete = useSelector(state => state.galleryDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = galleryDelete

    const galleryCreate = useSelector(state => state.galleryCreate)
    const { 
        loading:loadingCreate, 
        error:errorCreate, 
        success:successCreate, 
        gallery: createdGallery
    } = galleryCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({type: GALLERY_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/gallery/${createdGallery._id}/edit`)
        } else {
            dispatch(listGalleries())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdGallery])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteGallery(id))
        }
    }

    const createGalleryHandler = () => {
        dispatch(createGallery())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Galleries</h1>
                </Col>
                <Col>
                    <Button onClick={createGalleryHandler} className='tomboladd'>
                        <i className='fas fa-plus'></i> Create new gallery
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ?
                <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {galleries.map((gallery) => (
                                <tr key={gallery._id}>
                                    <td>{gallery._id}</td>
                                    <td>{gallery.name}</td>
                                    <td>
                                        {gallery.location}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/gallery/${gallery._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='light' className='btn-sm' onClick={() => deleteHandler(gallery._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default GalleryListScreen
