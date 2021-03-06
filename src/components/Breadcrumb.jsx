import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledBreadcrumb = styled.nav`
  .breadcrumb {
    background-color: #fafafa;
    margin-bottom: 16px;
    @media screen and (min-width: 1024px) {
      margin-bottom: 3rem !important;
    }
  }
`;

function Dashboard({ siteMap }) {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <StyledBreadcrumb aria-label="breadcrumb">
            <ol className="breadcrumb">
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
          </StyledBreadcrumb>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
