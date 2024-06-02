import { Route, Routes } from "react-router-dom";
import Home from "./components/common/Home";
import Overview from "./pages/Overview";
import Users from "./pages/Users";
import Admitted from "./pages/Admitted";
import Patients from "./pages/Patients";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />}>
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="users" element={<Users />} />
        <Route path="admitted" element={<Admitted />} />
        <Route path="patients" element={<Patients />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
