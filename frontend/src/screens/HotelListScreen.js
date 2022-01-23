import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listHotels, deleteHotel, createHotel} from '../actions/hotelActions'
import { HOTEL_CREATE_RESET } from '../constants/hotelConstants'

const HotelListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const hotelList = useSelector(state => state.hotelList)
    const { loading, error, hotels } = hotelList

    const hotelDelete = useSelector(state => state.hotelDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = hotelDelete

    const hotelCreate = useSelector(state => state.hotelCreate)
    const { 
        loading:loadingCreate, 
        error:errorCreate, 
        success:successCreate, 
        hotel: createdHotel 
    } = hotelCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({type: HOTEL_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/hotel/${createdHotel._id}/edit`)
        } else {
            dispatch(listHotels())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdHotel])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteHotel(id))
        }
    }

    const createHotelHandler = () => {
        dispatch(createHotel())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Hotels</h1>
                </Col>
                <Col>
                    <Button onClick={createHotelHandler} className='tomboladd'>
                        <i className='fas fa-plus'></i> Create new hotel
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
                                <th>Title</th>
                                <th>Price</th>
                                <th>Location</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map((hotel) => (
                                <tr key={hotel._id}>
                                    <td>{hotel._id}</td>
                                    <td>{hotel.title}</td>
                                    <td>Rp.{hotel.price}</td>
                                    <td>
                                        {hotel.location}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/hotel/${hotel._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='light' className='btn-sm' onClick={() => deleteHandler(hotel._id)}>
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

export default HotelListScreen
