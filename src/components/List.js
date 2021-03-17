import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

const List = (props) => {
    let  { title } = props;
    return (
        <Card className="mx-3 my-3">
            <Card.Header as="h5">{ title }</Card.Header>
            <Card.Body>                
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <ButtonGroup>
                    <Button variant="primary">add to list</Button>
                    <Button variant="success"> Pick random </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
}

export default List;