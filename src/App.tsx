import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import FormPage from "./pages/FormPage/FormPage";
import { ChakraBaseProvider } from "@chakra-ui/react";

function App(): JSX.Element {
  return (
    <div className="app">
      <ChakraBaseProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/questionary" element={<FormPage></FormPage>}></Route>
          </Routes>
        </HashRouter>
      </ChakraBaseProvider>
    </div>
  );
}

export default App;
