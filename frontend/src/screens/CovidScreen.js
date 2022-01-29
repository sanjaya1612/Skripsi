import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CovidScreen = () => {
  return (
    <>
      <h1>
        Covid Info <i className="fas fa-info"></i>
      </h1>{" "}
      <Link to="/"> Go Back </Link>
      <Row>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className="mb-3" style={{ width: "15rem" }}>
            <Card.Img src="images/wash_hand.png" width={20} height={145} />
            <Card.Body>
              <Card.Title as="div">
                <strong>Handwashing</strong>
              </Card.Title>

              <Card.Text as="div">
                Wash hand with soap and water for at least 20 seconds with the
                cleanest water possible every often
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className="mb-3" style={{ width: "15rem" }}>
            <Card.Img src="images/medical_care.png" width={50} height={145} />
            <Card.Body>
              <Card.Title as="div">
                <strong>Medical Care</strong>
              </Card.Title>

              <Card.Text as="div">
                <ul>
                  <li>
                    Get yourself vaccinated to lower the risk of getting and
                    spreading the virus.
                  </li>
                  <li>
                    If you already had COVID-19, you should still get a COVID-19
                    vaccine for added protection.
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className="mb-3" style={{ width: "15rem" }}>
            <Card.Img
              src="images/medical_research.png"
              width={110}
              height={145}
            />
            <Card.Body>
              <Card.Title as="div">
                <strong>Covid 19 Symptoms</strong>
              </Card.Title>

              <Card.Text as="div">
                <ul>
                  <li>Fever or chills</li>
                  <li>New loss of taste or smell</li>
                  <li>Shortness of breath or difficulty breathing</li>
                  <li>Nausea or vomiting</li>
                  <li>Sore throat</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className="mb-3" style={{ width: "15rem" }}>
            <Card.Img
              src="images/social_distancing.png"
              width={110}
              height={145}
            />
            <Card.Body>
              <Card.Title as="div">
                <strong>Social Distancing</strong>
              </Card.Title>

              <Card.Text as="div">
                <ul>
                  <li>Always wear a mask to prevent virus.</li>
                  <li>Distance yourself at least 1.5m from others</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default CovidScreen;
