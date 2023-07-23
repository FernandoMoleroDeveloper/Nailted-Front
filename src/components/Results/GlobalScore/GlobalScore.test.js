import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalScore from "./GlobalScore";

describe("GlobalScore", () => {
  it("renders the global result title and progress circle", () => {
    render(
      <ChakraProvider>
        <GlobalScore />
      </ChakraProvider>
    );

    const title = screen.getByText("Resultado general");
    expect(title).toBeInTheDocument();

    const progressCircle = screen.getByRole("progressbar");
    expect(progressCircle).toBeInTheDocument();
  });

  it("opens the modal with the correct title and text when clicked", () => {
    render(
      <ChakraProvider>
        <GlobalScore />
      </ChakraProvider>
    );

    const resultGlobal = screen.getByText("Resultado general");
    fireEvent.click(resultGlobal);

    const modalTitle = screen.getByText("Direction");
    expect(modalTitle).toBeInTheDocument();

    const modalText = screen.getByText("Direction text");
    expect(modalText).toBeInTheDocument();
  });

  it("closes the modal when clicking the close button", () => {
    render(
      <ChakraProvider>
        <GlobalScore />
      </ChakraProvider>
    );

    const resultGlobal = screen.getByText("Resultado general");
    fireEvent.click(resultGlobal);

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
  });
});
