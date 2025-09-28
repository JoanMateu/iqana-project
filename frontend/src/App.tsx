
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Operations from "./pages/Operations";
import NextSteps from "./pages/NextSteps";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/ops" element={<Operations />} />
          <Route path="/next-steps" element={<NextSteps />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}