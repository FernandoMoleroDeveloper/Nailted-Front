import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import ResultsCategory from "./ResultsCategory";

describe("ResultsCategory", () => {
  const resultsDetails = {
    category: {
      name: "Category Name",
      mark: [
        { min: 0, max: 25, tip: "Tip 1" },
        { min: 26, max: 50, tip: "Tip 2" },
        { min: 51, max: 100, tip: "Tip 3" },
      ],
    },
    score: 75,
  };

  it("renders the results category correctly", () => {
    render(
      <ChakraProvider>
        <ResultsCategory resultsDetails={resultsDetails} circlePosition="right" />
      </ChakraProvider>
    );
    const categoryName = screen.getByText("Category Name");
    expect(categoryName).toBeInTheDocument();
    const scoreTip = screen.getByText("Tip 3");
    expect(scoreTip).toBeInTheDocument();
  });
});
