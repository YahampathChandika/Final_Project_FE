import { Route, Routes } from "react-router-dom";
import Home from "./components/common/Home";
import Overview from "./pages/Overview";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index path="overview" element={<Overview />} />
        <Route index path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
