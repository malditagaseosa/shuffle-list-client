import React from 'react';
import Client from '../services/api';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { isEmpty } from '../helpers';

const Login = () => {
  const history = useHistory();
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [logginError, setLogginError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const validateForm = () => user.length > 0 && password.length > 0;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {      
      let response = await Client().login({ user: user, password: password });      
      if(!isEmpty(response.token)){
        sessionStorage.setItem('token', response.token);        
        history.push('/home');      
      } else {
        throw new Error('User not found');
      }
    } catch (error) {      
      let message = 'An error occurred, please try again';
      setErrorMessage(message);
      setLogginError(true);
      setIsLoading(false);
    }        
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col></Col>
        <Col xs={10} md={6}>
          <h1 id="login-title" className="text-center mb-3">Shuffle List</h1>
          <Card className="mb-5">
            <Card.Body>
              <Form onSubmit={ handleSubmit }>
                <Form.Group controlId="user">
                  <Form.Label>user</Form.Label>
                  <Form.Control
                    required 
                    onChange={ e => setUser(e.target.value) } 
                    type="text" 
                    placeholder="Enter user" />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    onChange={ e => setPassword(e.target.value) }
                    type="password" 
                    placeholder="Enter password" />
                </Form.Group>
                <Button disabled={!validateForm()} className="mx-auto d-block large" variant="primary" type="submit">
                  { isLoading ? 'Loading...' : 'Login' }
                </Button>
              </Form>
              { 
                logginError 
                ? 
                  <Alert 
                    variant='danger' 
                    className='mt-5' 
                    dismissible 
                    onClose={() => setLogginError(false) }>
                      { errorMessage }
                  </Alert> 
                : 
                  '' 
              }
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Login;
