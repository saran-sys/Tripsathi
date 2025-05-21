import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import SustainabilityChat from "./pages/SustainabilityChat";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="sustainability-chat" element={<SustainabilityChat />} />
      </Route>
    </Routes>
  );
}

export default App;
