import React from 'react';
import { Card, Button, ButtonGroup, Badge, Modal, Form } from 'react-bootstrap';
import Client from '../services/api';
import { isEmpty } from '../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List = (props) => {
    let apiclient = Client();

    let { handleDeleteList } = props;
    let  { title, items, id } = props.model;

    const [listState, setListState] = React.useState({
        items: items,
        showItemForm: false,
        showRandomItem: false,
        randomItem: '',
        itemFormValues: {title: '', url: ''}
    });

    const handleAddItemToList = async () => {
        try {            
            setListState({...listState, showItemForm: true})
            let items = await apiclient.addListItem(id, listState.itemFormValues);
            items = isEmpty(items) || !Array.isArray(items) ? [] : items;
            setListState({...listState, items: items, showItemForm: false});            
        } catch (error) {
            console.log(error);
        }        
    };
    const handleRemoveItemFromList = async (elementIndex) => {
        try {
            let result = await apiclient.removeListItem(id, elementIndex);
            if (result === 200) {
                let newArray =  listState.items.filter((item, index) => { return index !== elementIndex })             
                setListState({...listState, items: newArray});
            }
        } catch (error) {
            console.log(error);
        }
    };
    const selectRandomItemFromList = async (id) => {
        try {
            setListState({...listState, randomItem: ''});
            let item = await apiclient.pickRandomFromList(id);            
            setListState({...listState, randomItem: item.title, showRandomItem: true});            
        } catch (error) {
            console.log(error);
        }        
    }


    return (
        <Card>
            <Modal show={listState.showItemForm} onHide={ () => { setListState({...listState, showItemForm: false}) } }>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            onChange={ e => setListState({...listState, itemFormValues: {...listState.itemFormValues, title: e.target.value}}) }
                            type="text" />
                    </Form.Group>
                    <Form.Group controlId="url">
                        <Form.Label>Url</Form.Label>
                        <Form.Control
                            onChange={ e => setListState({...listState, itemFormValues: {...listState.itemFormValues, url: e.target.value}}) }                           
                            type="text" />
                    </Form.Group>   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => setListState({...listState, showItemForm: false}) }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ () => handleAddItemToList() }>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={listState.showRandomItem} onHide={ () => setListState({...listState, showRandomItem: false}) }>
                <Modal.Body closeButton>
                    <h2 className="text-center m-3">{ listState.randomItem }</h2>
                </Modal.Body>                
            </Modal>
            <Card.Title className="pt-3 pl-3 pb-0">{ title }</Card.Title>            
            <Card.Body>                
                { listState.items.map((item, index) => 
                {
                    if (item.url) {
                        return (<a rel="noreferrer" target="_blank" href={item.url} key={index}><Badge className="px-2 py-2 my-1 mx-1" variant="info">{item.title}&nbsp;<FontAwesomeIcon cursor="pointer" onClick={ () => { handleRemoveItemFromList(index) } } className="ml-2 mr-1" size="xs" icon={ ['fas', 'trash'] } /></Badge></a>);
                    }

                    return (<Badge key={index} className="px-2 py-2 my-1 mx-1 text-break" variant="dark">{item.title}&nbsp;<FontAwesomeIcon cursor="pointer" onClick={ () => { handleRemoveItemFromList(index) } } className="ml-2 mr-1" size="xs" icon={ ['fas', 'trash'] } /></Badge>)
                }) }                
            </Card.Body>
            <Card.Footer>
                <ButtonGroup>
                    <Button onClick={ () => setListState({...listState, showItemForm: true}) } variant="primary">
                        <FontAwesomeIcon icon={ ['fas', 'plus'] }></FontAwesomeIcon>
                    </Button>
                    <Button onClick={ () => selectRandomItemFromList(id) } variant="success">
                        <FontAwesomeIcon icon={ ['fas', 'random'] } />
                    </Button>
                    <Button variant="danger" onClick={ () => handleDeleteList(id) } >
                        <FontAwesomeIcon icon={ ['fas', 'trash'] } />
                    </Button>
                </ButtonGroup>
            </Card.Footer>
        </Card>
    );
}

export default List;