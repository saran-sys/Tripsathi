import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "./../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;

    if (location === "") {
      return alert("Please enter a destination!");
    }

    try {
    const res = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?city=${location}`
    );
      
      if (!res.ok) {
        throw new Error("Failed to fetch search results");
      }

    const result = await res.json();

      // Navigate to search results page with the data
    navigate(
        `/tours/search?city=${location}`,
      { state: result.data }
    );
    } catch (error) {
      console.error("Search error:", error);
      alert("Failed to search tours. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchHandler();
    }
  };

  return (
    <Col lg="12">
      <div className="search_bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Where do you want to go?</h6>
              <input
                type="text"
                placeholder="Search destination"
                ref={locationRef}
                onKeyPress={handleKeyPress}
              />
            </div>
          </FormGroup>

          <span className="search_icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
