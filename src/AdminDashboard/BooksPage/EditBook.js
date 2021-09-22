import React from 'react';
import { Modal } from 'react-bootstrap';
import AddBook from './AddBook';

function EditBook({ show, setShow, updateIndex, setUpdateIndex }){
    return(
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">Edit Book Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddBook updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} setShow={setShow} />
            </Modal.Body>
        </Modal>
    )
}
export default EditBook