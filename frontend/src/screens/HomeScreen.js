import { Row, Col } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import products from '../products'


const HomeScreen = () => {
    return (
        <>
            <body>
                <header>
                    
                </header>
            </body>
            <h1>Favorite Activities</h1>
            <br></br>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Card className='mb-3' style={{ width: '17rem' }}>
                            <Link to={`/product/`+product._id}>
                                <Card.Img variant="top" src={product.image} width= {110} height={200} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/`+product._id}>
                                    <Card.Title as='div'>
                                        <strong>{product.name}</strong>
                                    </Card.Title>
                                </Link>
                                <Card.Text as='div'>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </Card.Text>
                                <Card.Text as='h3'>Rp.{product.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen