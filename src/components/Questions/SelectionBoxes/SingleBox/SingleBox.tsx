import { Button } from "@chakra-ui/react";
import { selectionBoxesButton, selectionBoxesButtonActive } from "../../../../styles/motions/props";
import "../SingleBox/SingleBox.scss";
import { useState } from "react";

const SingleBox = (): JSX.Element => {
  const [active, setActive] = useState(false);

  const toggleActive = (): void => {
    setActive(!active);
  };

  return (
    <Button {...(active ? selectionBoxesButtonActive : selectionBoxesButton)} className="selection-boxes__option" onClick={toggleActive}>
      <span>Texto de la opcion</span>
    </Button>
  );
};

export default SingleBox;
