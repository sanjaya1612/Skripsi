import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listFoodOrders } from '../actions/oderFoodActions'
import DateFoodFilter from '../components/DateFoodFilter'
import NumberFormat from 'react-number-format'

const OrderFoodListScreen = ({ history, match }) => {
    const keydate = match.params.keydate
    const dispatch = useDispatch()


    const orderListFood = useSelector(state => state.orderListFood)
    const { loading, error, orders } = orderListFood

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listFoodOrders(keydate))
            console.log(keydate)
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, keydate])

    
    return (
        <>

            <h1>Food Orders</h1>
            <Route render={({ history }) => <DateFoodFilter history={history} />} />
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
                                <th>Paid</th>
                                <th>Delivered</th>
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
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/foodorders/${order._id}`}>
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

export default OrderFoodListScreen
