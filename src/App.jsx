import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import GNB from "./components/GNB";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import QRRental from "./pages/QRRental";
import Signup from "./pages/Signup";

function LayoutWithGNB() {
  return (
    <>
      <Outlet />
      <GNB />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<LayoutWithGNB />}>
        <Route path="/home" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/qr-rental" element={<QRRental />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
