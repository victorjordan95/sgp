import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Dashboard({ siteMap }) {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-5">
              {siteMap.map((breadcrumb, key) => {
                if (key + 1 === siteMap.length) {
                  return (
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                      key={key}
                    >
                      {breadcrumb.name}
                    </li>
                  );
                }

                return (
                  <li key={key} className="breadcrumb-item">
                    <NavLink to={breadcrumb.path}>{breadcrumb.name}</NavLink>
                  </li>
                );
              })}
            </ol>
          </nav>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
