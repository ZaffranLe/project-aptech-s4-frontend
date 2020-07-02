import React from "react";
import { 
    Modal,
    ModalBody,
} from 'reactstrap';

const Loading = (props) => (
    <Modal isOpen={props.isLoading}>
        <ModalBody><i className="fa fa-fw fa-spinner fa-pulse"></i> Loading...</ModalBody>
    </Modal>
);

export { Loading };