import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllTables, getTableById } from '../../../redux/tableRedux';

import styles from './Table.module.scss';

const Table = () => {
  const [status, setStatus] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
  const [bill, setBill] = useState(0);

  const table = useSelector(getAllTables);
  console.log(table);

  console.log(status);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // const status = formData.get('status');

    const people1 = formData.get('people1');
    const people2 = formData.get('people2');
    const bill = formData.get('bill');
    console.log(status, people1, people2, bill);
  };
  return (
    <Container>
      <Row>
        <Col className='fs-1'>Table 1</Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>
            <strong>Status:</strong>
          </Form.Label>
          <Col xs={4}>
            <Form.Select
              onChange={(e) => setStatus(e.target.value)}
              type='text'
              name='status'
              aria-label='Default select example'
            >
              <option></option>
              <option value='Free'>Free</option>
              <option value='Reserved'>Reserved</option>
              <option value='Busy'>Busy</option>
              <option value='Cleaning'>Cleaning</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='d-flex align-items-center my-3'>
          <Form.Label column sm={1}>
            <strong>People:</strong>
          </Form.Label>
          <Col xs={1}>
            <Form.Control
              type='number'
              name='people1'
              min={0}
              max={10}
            ></Form.Control>
          </Col>
          /
          <Col xs={1}>
            <Form.Control
              type='number'
              name='people2'
              min={0}
              max={10}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='d-flex align-items-center my-3'>
          <Form.Label column sm={1}>
            <strong>Bill:</strong>
          </Form.Label>
          &#36;
          <Col xs={1}>
            <Form.Control type='number' name='bill'></Form.Control>
          </Col>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Update
        </Button>
      </Form>
    </Container>
  );
};
// Homepage.propTypes = {};

export default Table;
