import React from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "../styles/about.css";
import Team from "../components/Team/Team";

const About = () => {
  return (
    <>
      {/* About the company and team section start */}
      <section className="AboutUs">
        <Container>
          <Row>
            <Col lg="12">
              <div className="content">
                <h1>About Us</h1>
                <p>
                At Tripsathi, we believe that travel should be smart, seamless, and stress-free. Our mission is to revolutionize the way people plan, manage, and experience their journeys through the power of technology.

Born out of a passion for exploration and innovation, Tripsathi is more than just a travel platform — it's your intelligent travel companion. Whether you're planning a solo adventure, a family vacation, or a business trip, we bring everything you need into one smart solution.
                </p>
              </div>
              {/* <div className="slider">
                <h2>Our team</h2>
                <Team />
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
      {/* About the company and team section end */}

      {/* Contact us section start */}
      <section className="ContactUs">
        <Container>
          <Row>
            <h1>
              <i className="ri-edit-2-fill"></i>Let's start a conversation
            </h1>
            <Col lg="6">
              <div className="ContactUs_content">
                <h2>Ask how we can help you ...</h2>
                <p>
                Got questions or need support? We’re here to help. Reach out to us anytime — we’ll get back to you shortly. Let’s make your journey easier and smarter.
                </p>

                <h2>Offline location</h2>
                <p>
                Tripsathi Office<br/>
                Pokhara, Nepal<br/>
                New Road, 3rd Floor, XYZ Complex<br/>
                Open: Sunday – Friday | 10:00 AM – 5:00 PM<br/>
                Drop by — we’re always happy to connect!
                </p>

                <h2>Contact Information</h2>
                
                <p>Phone: +977 9765652822<br/>
                Email: contact@tripsathi.com</p>

                <h2>Privacy Information</h2>
                <p>
                Your data is safe with Tripsathi. We only collect what's needed to improve your experience and never share your information without consent.
                </p>
              </div>
            </Col>
            {/* Contact us section end */}

            {/* Contact form start */}
            <Col lg="6">
              <div className="ContactUs_form">
                <Form className="ContactUs_Info">
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Fist Name"
                      id="firstName"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Last Name"
                      id="lastName"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      required
                    />
                  </FormGroup>
                  <FormGroup className="message">
                    <input
                      type="message"
                      placeholder="Any question? Notes?"
                      id="message"
                      required
                    />
                  </FormGroup>
                  <FormGroup className="country">
                    <select className="countryList">
                      <option value="Country">Country</option>
                    </select>
                  </FormGroup>
                  <Button className="btn primary__btn w-100 mb-1 mt-4" >Send</Button>
                </Form>
              </div>
            </Col>

            {/* Contact form end */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
