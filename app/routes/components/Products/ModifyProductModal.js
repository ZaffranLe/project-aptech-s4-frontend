import React from "react";
import { Input, Form, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "./../../../components";

class ModifyProductModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, handleCloseModal } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={handleCloseModal}>
                <ModalHeader></ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        );
    }
}

export default ModifyProductModal;