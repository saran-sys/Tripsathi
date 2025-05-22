import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import SustainabilityChat from "./pages/SustainabilityChat";
import Weather from "./components/Weather/Weather";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="sustainability-chat" element={<SustainabilityChat />} />
        <Route path="weather" element={<Weather />} />
      </Route>
    </Routes>
  );
}

export default App;
