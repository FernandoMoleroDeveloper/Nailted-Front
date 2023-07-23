import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import CategoryScore from "./CategoryScore";

describe("CategoryScore", () => {
  it("renders the category title and progress circle", () => {
    render(
      <ChakraProvider>
        <CategoryScore />
      </ChakraProvider>
    );

    const title = screen.getByText("Direction");
    expect(title).toBeInTheDocument();

    const progressCircle = screen.getByRole("progressbar");
    expect(progressCircle).toBeInTheDocument();
  });

  it("opens the modal with the correct title and text when clicked", () => {
    render(
      <ChakraProvider>
        <CategoryScore />
      </ChakraProvider>
    );

    const category = screen.getByText("Direction");
    fireEvent.click(category);

    const modalText = screen.getByText("Direction text");
    expect(modalText).toBeInTheDocument();
  });

  it("closes the modal when clicking the close button", () => {
    render(
      <ChakraProvider>
        <CategoryScore />
      </ChakraProvider>
    );

    const category = screen.getByText("Direction");
    fireEvent.click(category);

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
  });
});
