import React, { useState, useEffect } from 'react';
import CommonSection from './../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';

import TourCard from '../shared/TourCard';
import Newsletter from '../shared/Newsletter';

const SearchResultList = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.state) {
      setLoading(true);
      // If no state is passed, try to get search results from URL params
      const searchParams = new URLSearchParams(location.search);
      const city = searchParams.get('city');
      
      if (city) {
        fetch(`${process.env.REACT_APP_BASE_URL}/tours/search/getTourBySearch?city=${city}`)
          .then(res => res.json())
          .then(result => {
            setData(result.data);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      }
    }
  }, [location]);

  return (
    <>
      <CommonSection title={"Tour Search Result"}/>
      <section>
        <Container>
          <Row>
            {loading ? (
              <h4 className='text-center'>Loading...</h4>
            ) : data.length === 0 ? (
              <h4 className='text-center'>No tours found</h4>
            ) : (
              data?.map(tour => (
                <Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}>
                  <TourCard tour={tour}/>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter/>
    </>
  );
};

export default SearchResultList;
