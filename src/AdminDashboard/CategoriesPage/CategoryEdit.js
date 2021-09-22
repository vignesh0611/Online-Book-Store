
import React from 'react';
import { Modal } from 'react-bootstrap';
import AddCategory from './AddCategory';

const EditCategory = ({ show, setShow, updateIndex, setUpdateIndex }) => {
    return (
        // category update modal
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddCategory updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} setShow={setShow} />
            </Modal.Body>
        </Modal>
    );
}

export default EditCategory;