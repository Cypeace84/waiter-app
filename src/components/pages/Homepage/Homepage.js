import { Button, Col, Container, Row, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllTables } from '../../../redux/tableRedux';

const Homepage = () => {
  const tables = useSelector(getAllTables);

  console.log(tables);
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
