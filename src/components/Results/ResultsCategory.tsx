import { Box, Text, Flex, CircularProgress, CircularProgressLabel, FormLabel, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import "../../styles/layouts/ResultsCategory.scss";
import { BiSolidPlusCircle } from "react-icons/bi";
import { useState } from "react";

const ResultsCategory = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="results-category page">
      <Flex display="flex" flexDirection="column" alignItems="center" margin="5px" marginTop="30px">
        <Box display="flex" flexWrap="wrap">
          <FormLabel fontWeight="extrabold" margin="0 5px 0 0" textAlign="left" as="legend">
            Direction
          </FormLabel>
        </Box>
        <CircularProgress className="results-category__progress-circle" value={62} color="green.400" size="120px" thickness="8px">
          <CircularProgressLabel>62%</CircularProgressLabel>
        </CircularProgress>
        <Box display="flex" alignItems="center" flexWrap="wrap" margin="0 0 0 5px">
          <Text className="results-category__text-info">Info</Text>
          <BiSolidPlusCircle
            className="results-category__btn-info"
            onClick={() => {
              onOpen();
              setText("Direction text");
              setTitle("Direction");
            }}
          />
        </Box>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{text}</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default ResultsCategory;
