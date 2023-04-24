import { Button, Col, Container, Row, Nav, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getIsLoading } from '../../../redux/LoadingRedux';
import { getAllTables } from '../../../redux/TableRedux';

const Homepage = () => {
  const tables = useSelector(getAllTables);
  const isLoading = useSelector(getIsLoading);

  // console.log(tables);

  // if (isLoading || !tables) {
  if (isLoading) {
    console.log('is', isLoading);
    return (
      <Container className='d-flex align-items-center justify-content-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    );
  }
  console.log('is', isLoading);
  return (
    <Container>
      <Row>
        <Col className='fs-1'>All tables</Col>
      </Row>
      {tables.map((table) => (
        <Row
          key={table.id}
          className='border-bottom border-secondary d-flex align-items-end py-3'
        >
          <Col className='fs-2'>
            Table {table.id}
            <div className='d-inline ms-3 '>
              <span className='fs-6'>
                <strong>Status:</strong>
                {table.status}
              </span>
            </div>
          </Col>

          <Col className='d-flex justify-content-end '>
            <Nav.Link as={NavLink} to={`/table/${table.id}`}>
              <Button>Show more</Button>
            </Nav.Link>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

// Homepage.propTypes = {};

export default Homepage;
