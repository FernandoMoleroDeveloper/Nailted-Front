import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";

const ResultsModal = ({ onClose, isOpen, title, text, getScoreTip, categoryName }: any): React.JSX.Element => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent m="auto 20px">
        <ModalHeader>{title || categoryName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{text || getScoreTip}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultsModal;
