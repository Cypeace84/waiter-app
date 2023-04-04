import React from 'react';
import { Container } from 'react-bootstrap';

import styles from './NotFound.module.scss';

const NotFound = () => (
  <Container>
    {' '}
    <div className={styles.root}>NOT FOUND</div>
  </Container>
);

// Homepage.propTypes = {};

export default NotFound;
