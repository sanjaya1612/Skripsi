import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listGalleries } from '../actions/galleryActions'
import { Row, Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Gallery from '../components/Gallery'
import GallerySearch from '../components/GallerySearch'
import { Link } from 'react-router-dom'


const AllGalleryScreen = ({ match }) => {
    const keyword = match.params.keyword
    const dispatch = useDispatch()

    const galleryList = useSelector(state => state.galleryList)
    const { loading, error, galleries } = galleryList

    useEffect(() => {
        dispatch(listGalleries(keyword))
    }, [dispatch, keyword])
    return (
    <>
    <Link to='/galleries'><i class="fas fa-arrow-left"></i></Link>
    <h1>Gallery <i className="far fa-images"></i></h1>
      <br />
      <Route render={({ history }) => <GallerySearch history={history} />} />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {galleries.map(gallery => (
            <Col key={gallery._id} sm={12} md={6} lg={4} xl={3}>
              <br />
              <Gallery gallery={gallery} />
            </Col>
          ))}
        </Row>
      )}
    </>
    );
};

export default AllGalleryScreen;
