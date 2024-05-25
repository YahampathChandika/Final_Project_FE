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
        <Route index path="overview" element={<Overview />} />
        <Route index path="users" element={<Users />} />
        <Route index path="admitted" element={<Admitted />} />
        <Route index path="patients" element={<Patients />} />
      </Route>
    </Routes>
  );
}

export default App;
