import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import List from './List';
import { Container } from 'react-bootstrap';

const App = () => {
  let lists = [
    {title: "Lista 1"},
    {title: "Lista 2"}
  ];
  return (
    <Container className="mt-4">
      { lists.map((item) => {
        return (<List title={item.title} />)
      }) }
    </Container>
  );
}

export default App;
