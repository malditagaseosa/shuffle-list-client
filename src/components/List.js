import React from 'react';
import { Card, Button, ButtonGroup, Badge, Modal, Form } from 'react-bootstrap';
import Client from '../services/api';

const List = (props) => {
    let apiclient = Client();
    let  { title, elements, id } = props.model;
    const [listElements, setListElements] = React.useState(elements);
    const [showElementForm, setShowElementForm] = React.useState(false);
    const [elementFormValues, setElementFormValues] = React.useState({title: '', url: ''});
    const handleAddElementToList = async () => {
        try {
            setShowElementForm(true);
            let result = await apiclient.addListElement(id, elementFormValues);
            setListElements(result);
            setShowElementForm(false);
        } catch (error) {
            console.log(error);
        }        
    };
    return (
        <Card>
            <Modal show={showElementForm} onHide={ () => { setShowElementForm(false) } }>
                <Modal.Header closeButton>
                    <Modal.Title>Add Element</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            onChange={ e => setElementFormValues({...elementFormValues, title: e.target.value}) }                            
                            type="text" />
                    </Form.Group>
                    <Form.Group controlId="url">
                        <Form.Label>Url</Form.Label>
                        <Form.Control
                            onChange={ e => setElementFormValues({...elementFormValues, url: e.target.value}) }                           
                            type="text" />
                    </Form.Group>   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => { setShowElementForm(false) } }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ handleAddElementToList }>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card.Title className="pt-3 pl-3 pb-0">{ title }</Card.Title>            
            <Card.Body>                
                { listElements.map((item, index) => {
                    return (<Badge key={index} className="px-2 py-2 my-1 mx-1" variant="dark">{item.title}</Badge>)
                }) }                
            </Card.Body>
            <Card.Footer>
                <ButtonGroup>
                    <Button onClick={ () => { setShowElementForm(true) } } variant="primary">add to list</Button>
                    <Button variant="success"> Pick random </Button>
                </ButtonGroup>
            </Card.Footer>
        </Card>
    );
}

export default List;