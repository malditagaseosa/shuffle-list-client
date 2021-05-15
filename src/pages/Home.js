import React from 'react';
import List from '../components/List';
import { Container, Row, Col, Alert, Button, Modal, Form } from 'react-bootstrap';
import Client from '../services/api';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Home = () => {
  let history = useHistory();
  const apiClient = Client();

  const [homeState, setHomeState] = React.useState({
    lists: [],
    showListForm: false,
    newListName: ''
  });  

  const handleDeleteList = async (listId) => {
    try {
        let result = await apiClient.deleteList(listId);
        if (result !== undefined && result) {
          setHomeState({...homeState, lists: homeState.lists.filter(item => item.id !== listId)});
        }
    } catch (error) {
        console.log(error);
    }
  }
  const handleNewList = async () => {
    let title = homeState.newListName;
    try {
      if (title) {
        let result = await apiClient.createList({title});      
        if (result) {        
          setHomeState({lists: [...homeState.lists, {id: result, title, items: []}]});
        }
      }      
    } catch (error) {
      console.log(error);
    }
  }
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    history.push('/login');
  }

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    let fetchData = async () => {    
      let data = await Client().getLists(source);
      data = (Array.isArray(data)) ? data : [];
      setHomeState({...homeState, lists: data});      
    }
    fetchData();
    return () => { source.cancel() };
  }, []);

  return (
    <Container className="mt-4 mb-5">
      <Modal show={homeState.showListForm} onHide={ () => { setHomeState({...homeState, showListForm: false}) } }>
        <Modal.Header closeButton>
            <Modal.Title>Add List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="title">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    onChange={ e => setHomeState({...homeState, newListName: e.target.value}) }
                    type="text" />
            </Form.Group>              
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={ () => setHomeState({...homeState, showListForm: false}) }>
                Close
            </Button>
            <Button variant="primary" onClick={ () => handleNewList() }>
                Save Changes
            </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col xs={12} md={2}>
          <Button onClick={ () => setHomeState({...homeState, showListForm: true}) } className="mt-3" variant="success">New List</Button>
          <br></br>
          <Button onClick={ () => handleLogout() } className="mt-3" variant="danger">Logout</Button>
        </Col>
        <Col xs={12} md={10}>
          <Row>
            { homeState.lists.map((item) => {
              return (
                <Col className="mb-3 mt-3" key={item.id} xs={12} md={12} sm={12}>
                  <List handleDeleteList={ handleDeleteList } model={item} />
                </Col>
              )
            }) }
            { homeState.lists.length > 0 
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

export default Home;
