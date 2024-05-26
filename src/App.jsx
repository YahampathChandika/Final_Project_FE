import { Route, Routes } from "react-router-dom";
import Home from "./components/common/Home";
import Overview from "./pages/Overview";
import Users from "./pages/Users";
import Admitted from "./pages/Admitted";
import Patients from "./pages/Patients";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="users" element={<Users />} />
        <Route path="admitted" element={<Admitted />} />
        <Route path="patients" element={<Patients />} />
      </Route>
    </Routes>
  );
}

export default App;
