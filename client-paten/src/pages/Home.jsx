import React from 'react';
import { Button, Card, CardDeck, Container, Row, Col } from 'react-bootstrap'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AddProduct from './AddProduct';
import Product from './Product'
import EditProduct from './EditProduct'
import Category from './Category';


function Home() {
  let match = useRouteMatch()
  console.log(match, '<=== match useroute');

  return (
    <Container fluid>
      <Row>
        <Col sm='3' className="p-3">
          <Button variant="secondary" as={Link} to={`${match.url}/products`} >

            <h4>
  <div className="d-flex justify-content-center"><i className="fas fa-box"></i>{" "}Products</div>
            </h4>
          </Button>
          <Button variant="secondary" as={Link} to={`${match.url}/category`} >

            <h4>
              <div className="d-flex justify-content-center"><i className="fas fa-tags"></i>Category</div>
            </h4>
          </Button>
        </Col>

        <Col sm='9'>
          <Switch>
            <Route exact path={`${match.url}/`}>
              <Redirect to={`${match.url}/products`}>

              </Redirect>
            </Route>

            <Route path={`${match.url}/add-product`}>
              <AddProduct>

              </AddProduct>
            </Route >

            <Route path={`${match.url}/products`}>
              <Product>

              </Product>
            </Route >

            <Route path={`${match.url}/edit-product`}>
              <EditProduct>
                
              </EditProduct>
            </Route>

            <Route path={`${match.url}/category`}>
              <Category>

              </Category>
            </Route>

          </Switch>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
