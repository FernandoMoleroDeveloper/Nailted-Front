import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import SingleBox from "./SingleBox";

describe("SingleBox", () => {
  const option = {
    _id: "option_id",
    optionText: "Option 1",
    score: 10,
  };
  const optionSelected = [];
  const setOptionSelected = jest.fn();
  const multiSelection = true;

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <ChakraProvider>
        <SingleBox option={option} optionSelected={optionSelected} setOptionSelected={setOptionSelected} multiSelection={multiSelection} />
      </ChakraProvider>
    );
  });

  it("renders the option text correctly", () => {
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("calls setOptionSelected when clicked for multiSelection", () => {
    const optionBox = screen.getByText("Option 1");

    fireEvent.click(optionBox);

    expect(setOptionSelected).toHaveBeenCalledWith([option]);
  });

  it("calls setOptionSelected to remove the option when clicked again for multiSelection", () => {
    const optionBox = screen.getByText("Option 1");

    fireEvent.click(optionBox);
    fireEvent.click(optionBox);

    expect(setOptionSelected).toHaveBeenCalledTimes(2);
    expect(setOptionSelected).toHaveBeenNthCalledWith(1, [option]);
  });
});
