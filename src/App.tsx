import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import QuizzPage from "./pages/QuizzPage/QuizzPage";
import Results from "./components/Results/Results";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage/HomePage";
import { useState, createContext } from "react";

export const SessionContext = createContext<any>({});
export const ResponseContext = createContext<any>({});

function App(): JSX.Element {
  const [session] = useState<any>();

  return (
    <div className="app">
      <ResponseContext.Provider value={{}}>
        <SessionContext.Provider value={session}>
          <ChakraProvider>
            <HashRouter>
              <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/quizz" element={<QuizzPage></QuizzPage>}></Route>
                <Route path="/results" element={<Results></Results>}></Route>
              </Routes>
            </HashRouter>
          </ChakraProvider>
        </SessionContext.Provider>
      </ResponseContext.Provider>
    </div>
  );
}

export default App;
