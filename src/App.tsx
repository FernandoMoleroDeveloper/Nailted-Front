import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import FormPage from "./pages/FormPage/FormPage";
import { ChakraProvider } from "@chakra-ui/react";
import FormPageText from "./pages/FormPageText/FormPageText";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

function App(): JSX.Element {
  return (
    <div className="app">
      <ChakraProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/questionary" element={<FormPage></FormPage>}></Route>
            <Route path="/text-questionary" element={<FormPageText></FormPageText>}></Route>
            <Route path="/results" element={<ResultsPage></ResultsPage>}></Route>
          </Routes>
        </HashRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
