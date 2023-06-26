import React from 'react';
import Container from 'react-bootstrap/Container';

const PageFooter = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container className="text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Jonas API. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default PageFooter;