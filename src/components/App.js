import React from 'react';
import '../styles/App.css';
import List from './List';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import Client from '../services/api';
import axios from 'axios';

const App = () => {

  const [lists, setLists] = React.useState([]);
  const apiClient = Client();

  const handleDeleteList = async (listId) => {
    try {
        let result = await apiClient.deleteList(listId);
        if (result !== undefined && result) {
          setLists(lists.filter(item => item.id !== listId));
        }
    } catch (error) {
        console.log(error);
    }
  }
  const handleNewList = async () => {
    let title = prompt("¿Cual es el titulo de la lista?");
    try {
      if (title) {
        let result = await apiClient.createList({title});      
        if (result) {        
          setLists([...lists, {id: result, title, items: []}]);
        }
      }      
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    let fetchData = async () => {    
      let data = await Client().getLists(source);
      data = (Array.isArray(data)) ? data : [];
      setLists(data);      
    }
    fetchData();
    return () => { source.cancel() };
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={2}>
          <Button onClick={ handleNewList } className="mt-3" variant="success">Nueva lista</Button>
        </Col>
        <Col xs={12} md={10}>
          <Row>
            { lists.map((item) => {
              return (
                <Col className="mb-3 mt-3" key={item.id} xs={12} md={12} sm={12}>
                  <List handleDelete={ handleDeleteList } model={item} />
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
        </Col>
      </Row>
    </Container>
  );
}

export default App;
