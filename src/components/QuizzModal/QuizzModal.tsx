import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Link } from "react-router-dom";
import { editButton, sendButton } from "../../styles/motions/props";

const QuizzModal = ({ onClose, setHasUserAnswered, isOpen, checkTextResponseIsValid, nextQuestionActions }: any) => {
  return (
    <Modal
      onClose={() => {
        onClose();
        setHasUserAnswered(true);
      }}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent m="auto 20px">
        <ModalHeader textAlign="center">Ver resultados</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <span>Una vez confirmes el envío no podrás volver para modificar tus respuestas.</span>
        </ModalBody>
        <ModalFooter m="0px auto">
          <Button
            {...editButton}
            minWidth="fit-content"
            p="25px 0px"
            colorScheme="gray"
            onClick={() => {
              onClose();
              setHasUserAnswered(true);
            }}
            m="0px 20px"
          >
            Modificar
          </Button>
          <Link to="/results" className="home-page__link">
            <Button {...sendButton} minWidth="fit-content" p="25px 30px" colorScheme="blue" onClick={() => checkTextResponseIsValid() && nextQuestionActions} m="0px 10px">
              Enviar
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuizzModal;
