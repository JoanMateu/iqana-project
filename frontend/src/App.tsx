import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}