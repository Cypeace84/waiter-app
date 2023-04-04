import React from 'react';
import { Container } from 'react-bootstrap';

import styles from './Homepage.module.scss';

const Homepage = () => (
  <Container>
    {' '}
    <div className={styles.root}>HOME</div>
  </Container>
);

// Homepage.propTypes = {};

export default Homepage;
