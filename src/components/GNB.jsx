import { NavLink } from "react-router-dom";

function GNB() {
  return (
    <nav>
      <NavLink to="/items">물품</NavLink>
      <NavLink to="/qr-rental">QR 대여</NavLink>
      <NavLink to="/mypage">마이페이지</NavLink>
    </nav>
  );
}

export default GNB;
