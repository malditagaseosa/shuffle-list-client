import React from 'react';
import { Card, Button, ButtonGroup, Badge, Modal, Form } from 'react-bootstrap';
import Client from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List = (props) => {
    let apiclient = Client();
    let { handleDelete } = props;
    let  { title, items, id } = props.model;
    const [listItems, setListItems] = React.useState(items);
    const [showItemForm, setShowItemForm] = React.useState(false);
    const [itemFormValues, setItemFormValues] = React.useState({title: '', url: ''});
    const handleAddItemToList = async () => {
        try {
            setShowItemForm(true);
            let result = await apiclient.addListItem(id, itemFormValues);
            setListItems(result);
            setShowItemForm(false);
        } catch (error) {
            console.log(error);
        }        
    };
    const handleRemoveItemFromList = async (elementIndex) => {
        try {
            let result = await apiclient.removeListItem(id, elementIndex);
            if (result === 200) {
                let newArray =  listItems.filter((item, index) => { return index !== elementIndex })             
                setListItems(newArray);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Card>
            <Modal show={showItemForm} onHide={ () => { setShowItemForm(false) } }>
                <Modal.Header closeButton>
                    <Modal.Title>Add Element</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            onChange={ e => setItemFormValues({...itemFormValues, title: e.target.value}) }                            
                            type="text" />
                    </Form.Group>
                    <Form.Group controlId="url">
                        <Form.Label>Url</Form.Label>
                        <Form.Control
                            onChange={ e => setItemFormValues({...itemFormValues, url: e.target.value}) }                           
                            type="text" />
                    </Form.Group>   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => { setShowItemForm(false) } }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ handleAddItemToList }>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card.Title className="pt-3 pl-3 pb-0">{ title }</Card.Title>            
            <Card.Body>                
                { listItems.map((item, index) => {
                    return (<Badge key={index} className="px-2 py-2 my-1 mx-1" variant="dark">{item.title}&nbsp;<FontAwesomeIcon cursor="pointer" onClick={ () => { handleRemoveItemFromList(index) } } className="ml-2 mr-1" size="xs" icon={ ['fas', 'trash'] } /></Badge>)
                }) }                
            </Card.Body>
            <Card.Footer>
                <ButtonGroup>
                    <Button onClick={ () => { setShowItemForm(true) } } variant="primary">
                        <FontAwesomeIcon icon={ ['fas', 'plus'] }></FontAwesomeIcon>
                    </Button>
                    <Button variant="success">
                        <FontAwesomeIcon icon={ ['fas', 'random'] } />
                    </Button>
                    <Button variant="danger" onClick={ () => { handleDelete(id) } } >
                        <FontAwesomeIcon icon={ ['fas', 'trash'] } />
                    </Button>
                </ButtonGroup>
            </Card.Footer>
        </Card>
    );
}

export default List;