import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import FormPage from "./pages/FormPage/FormPage";
import ResultsComponent from "./components/ResultsComponent/ResultsComponent";
import { ChakraProvider } from "@chakra-ui/react";
import HomePageV2 from "./pages/HomePageV2/HomePageV2";

function App(): JSX.Element {
  return (
    <div className="app">
      <ChakraProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePageV2></HomePageV2>}></Route>
            <Route path="/home-2" element={<HomePageV2></HomePageV2>}></Route>
            <Route path="/questionary" element={<FormPage></FormPage>}></Route>
            <Route path="/results" element={<ResultsComponent></ResultsComponent>}></Route>
          </Routes>
        </HashRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
