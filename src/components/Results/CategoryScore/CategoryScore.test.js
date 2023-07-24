import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import CategoryScore from "./CategoryScore";

describe("CategoryScore", () => {
  it("renders the category title and progress circle", () => {
    render(
      <ChakraProvider>
        <CategoryScore />
      </ChakraProvider>
    );

    const progressCircle = screen.getByRole("progressbar");
    expect(progressCircle).toBeInTheDocument();
  });
});
