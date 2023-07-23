import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import ResultsGlobal from "./ResultsGlobal";

describe("ResultsGlobal", () => {
  const results = {
    globalScore: 75,
    globalTip: { tip: "Global Tip" },
  };

  it("renders the results global correctly", () => {
    render(
      <ChakraProvider>
        <ResultsGlobal results={results} />
      </ChakraProvider>
    );

    const resultText = screen.getByText("Resultado global");
    expect(resultText).toBeInTheDocument();

    const globalTip = screen.getByText("Global Tip");
    expect(globalTip).toBeInTheDocument();
  });
});
