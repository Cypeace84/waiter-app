import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { getIsLoading } from '../../../redux/LoadingRedux';
import {
  getAllTables,
  getTableById,
  updateTable,
} from '../../../redux/TableRedux';

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tables = useSelector(getAllTables);
  useEffect(() => {
    const tableId = tables.find((table) => table.id === id);
    if (!tableId) {
      navigate('/');
    }
  }, [id, navigate, tables]);

  const table = useSelector((state) => getTableById(state, id)); ///
  const isLoading = useSelector(getIsLoading);

  const [statusValue, setStatusValue] = useState('');
  const [maxPeople, setMaxPeople] = useState(0);
  const [people, setPeople] = useState(null);
  const [billValue, setBillValue] = useState(0);

  useEffect(() => {
    if (table) {
      setMaxPeople(table.maxPeopleAmount);
      setPeople(table.peopleAmount);
      setBillValue(table.bill ? table.bill : 0);
      setStatusValue(table.status);
    }
  }, [table]);
  console.log('people', people);
  console.log('statusValue', statusValue);

  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    const status = formData.get('status');
    const peopleAmount = formData.get('peopleAmount');
    const maxPeopleAmount = formData.get('maxPeopleAmount');
    const bill = formData.get('bill');
    console.log(status, peopleAmount, maxPeopleAmount, bill, id);
    console.log('formData', formData);

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: status,
        peopleAmount: peopleAmount,
        maxPeopleAmount: maxPeopleAmount,
        bill: bill,
      }),
    };
    const URL = `${API_URL}/tables/${id}`;
    console.log('URL', URL);
    // fetch(`http://localhost:3131/tables/${id}`, options);
    fetch(`${URL}`, options);
    dispatch(
      updateTable(id, {
        status,
        peopleAmount,
        maxPeopleAmount,
        bill,
      })
    );
    navigate('/');
  };
  console.log('API', API_URL);

  const handleStatus = (event) => {
    const tableStatus = event.target.value;
    setStatusValue(tableStatus);
  };
  useEffect(() => {
    if (statusValue === 'Free' || statusValue === 'Cleaning') {
      setPeople(0);
    }
  }, [statusValue]);

  const handleMaxPeople = (event) => {
    const newMaxPeople = event.target.value;
    if (newMaxPeople !== '' && newMaxPeople < people) {
      setPeople(newMaxPeople);
    }
    setMaxPeople(newMaxPeople);
  };

  if (isLoading || !table) {
    return (
      <Container className='d-flex align-items-center justify-content-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    );
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
              defaultValue={table.peopleAmount}
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
                defaultValue={table.bill ? table.bill : billValue}
              ></Form.Control>
            </Col>
          </Form.Group>
        ) : null}

        <Button variant='primary' type='submit'>
          Update
        </Button>
      </Form>
    </Container>
  );
};
// Homepage.propTypes = {};

export default Table;
