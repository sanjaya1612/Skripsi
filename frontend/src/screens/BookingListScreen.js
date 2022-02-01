import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBookings } from '../actions/bookingHotelAction'
import NumberFormat from 'react-number-format'

const BookingListScreen = ({ history, match }) => {
    // const keydate = match.params.keydate

    const dispatch = useDispatch()


    const bookingList = useSelector(state => state.bookingList)
    const { loading, error, orders } = bookingList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listBookings())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo ])

    
    return (
        <>

            <h1>Hotel Booking List</h1>
            {/* <Route render={({ history }) => <ActivityDateFilter history={history}/>}/> */}
            <br/>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (

                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Total Price</th>
                                {/* <th>Paid</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                              <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td><NumberFormat
                                        value={order.totalPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></td>
                                    {/* <td>
                                        {order.isPaid ? (
                                            order.paidAt
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td> */}
                                    <td>
                                        <LinkContainer to={`/hotelorder/${order._id}`}>
                                            <Button variant='dark' className='btn-sm'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default BookingListScreen
