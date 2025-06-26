import * as React from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { MainPage, TerminologyPage, TerminologyQuizPage} from "./pages";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/terminology" element={<TerminologyPage />} />
          <Route exact path="/terminologyquiz" element={<TerminologyQuizPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
