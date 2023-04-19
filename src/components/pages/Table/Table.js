import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getIsLoading } from '../../../redux/LoadingRedux';
import { getTableById } from '../../../redux/TableRedux';

const Table = () => {
  const { id } = useParams();
  const table = useSelector((state) => getTableById(state, id)); ///
  const isLoading = useSelector(getIsLoading);

  const [statusValue, setStatusValue] = useState('');
  const [maxPeople, setMaxPeople] = useState(0);
  const [people, setPeople] = useState(0);
  const [billValue, setBillValue] = useState(0);

  useEffect(() => {
    if (table) {
      setMaxPeople(table.maxPeopleAmount);
      setPeople(table.peopleAmount);
      setBillValue(table.bill);
      setStatusValue(table.status);
    }
  }, [table]);
  console.log('people', people);
  console.log('statusValue', statusValue);

  useEffect(() => {
    if (statusValue === 'Free' || statusValue === 'Cleaning') {
      setPeople(0);
    }
  }, [statusValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const status = formData.get('status');
    const peopleAmount = formData.get('peopleAmount');
    const maxPeopleAmount = formData.get('maxPeopleAmount');
    const bill = formData.get('bill');
    console.log(status, peopleAmount, maxPeopleAmount, bill);
  };

  const handleStatus = (event) => {
    // event.preventDefault();
    setStatusValue(event.target.value);
    if (event.target.value === 'Free' || event.target.value === 'Cleaning') {
      setPeople(0);
    }
  };

  const handleMaxPeople = (event) => {
    const newMaxPeople = event.target.value;
    if (newMaxPeople !== '' && newMaxPeople < people) {
      setPeople(newMaxPeople);
    }
    setMaxPeople(newMaxPeople);
  };

  if (isLoading || !table) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col className='fs-1'>Table {id}</Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>
            <strong>Status:</strong>
          </Form.Label>
          <Col xs={4}>
            <Form.Select
              onChange={handleStatus}
              type='text'
              name='status'
              aria-label='Default select example'
            >
              <option>{statusValue ? statusValue : table.status}</option>
              <option value='Free'>Free</option>
              <option value='Reserved'>Reserved</option>
              <option value='Busy'>Busy</option>
              <option value='Cleaning'>Cleaning</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='d-flex align-items-center my-3'>
          <Form.Label column sm={1}>
            <strong>People: </strong>
          </Form.Label>
          <Col xs={1}>
            <Form.Control
              type='number'
              name='peopleAmount'
              min={0}
              max={maxPeople}
              value={people}
              onChange={(event) => setPeople(event.target.value)}
            ></Form.Control>
          </Col>
          /
          <Col xs={1}>
            <Form.Control
              type='number'
              name='maxPeopleAmount'
              min={0}
              max={10}
              defaultValue={table.maxPeopleAmount}
              value={maxPeople}
              onChange={handleMaxPeople}
            ></Form.Control>
          </Col>
        </Form.Group>

        {statusValue === 'Busy' ? (
          <Form.Group as={Row} className='d-flex align-items-center my-3'>
            <Form.Label column sm={1}>
              <strong>Bill:</strong>
            </Form.Label>
            &#36;
            <Col xs={1}>
              <Form.Control
                type='number'
                name='bill'
                defaultValue={billValue}
              ></Form.Control>
            </Col>
          </Form.Group>
        ) : null}
        {/* <NavLink to='/' className='nav-link' activeClassName='active'> */}
        <Button variant='primary' type='submit'>
          Update
        </Button>
        {/* </NavLink> */}
      </Form>
    </Container>
  );
};
// Homepage.propTypes = {};

export default Table;
