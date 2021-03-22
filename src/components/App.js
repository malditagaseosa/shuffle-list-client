import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import List from './List';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Client from '../services/api';
import axios from 'axios';

const App = () => {

  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    let fetchData = async () => { 
      let apiClient = Client();     
      let data = await apiClient.getLists(source);
      data = (Array.isArray(data)) ? data : [];
      setLists(data);      
    }
    fetchData();
    return () => { source.cancel() };
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        { lists.map((item) => {
          return (
            <Col key={item.id} xs={12} md={4} sm={12}>
              <List model={item} />
            </Col>
          )
        }) }
        { lists.length > 0 
          ? "" 
          : <Alert className="center mx-auto" variant="danger">
              No se han encontrado listas para mostrar
            </Alert> 
        }
      </Row>
    </Container>
  );
}

export default App;
