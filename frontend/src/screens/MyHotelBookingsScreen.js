import React, { useState, useEffect } from 'react';
import { Button, Col, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listMyBookings } from '../actions/bookingHotelAction'

const MyHotelBookingsScreen = ({history}) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const bookingListMy = useSelector((state) => state.bookingListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = bookingListMy

    useEffect(() => {
        if (!userInfo) {
          history.push('/login')
        } else {
          if (!user.name) {
            dispatch(getUserDetails('profile'))
            dispatch(listMyBookings())
          } else {
            setName(user.name)
            setEmail(user.email)
          }
        }
      }, [dispatch, history, userInfo, user])

    return (<>
    <Col>
    <h2>My Hotel Bookings</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (order.paidAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/hotelorder/${order._id}`}>
                                            <Button variant='dark'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
    </Col>
    
    </>);
};

export default  MyHotelBookingsScreen;