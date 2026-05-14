import { NavLink } from "react-router-dom";

function NavigationBarLayout() {
  return (
    <nav className="fixed bottom-0 left-1/2 flex h-[66px] w-[402px] -translate-x-1/2 items-end justify-between bg-[#D9D9D9] px-[36px] pb-[12px]">
      <NavLink
        to="/items"
        className="flex h-full w-[80px] items-center justify-center text-[15px] font-medium whitespace-nowrap text-black"
      >
        물품
      </NavLink>

      <NavLink
        to="/qr-rental"
        className="relative flex h-[91px] w-[113px] translate-y-[18px] items-center justify-center rounded-[50%] bg-[#D9D9D9] text-[15px] font-medium whitespace-nowrap text-black"
      >
        QR 대여
      </NavLink>

      <NavLink
        to="/mypage"
        className="flex h-full w-[80px] items-center justify-center text-[15px] font-medium whitespace-nowrap text-black"
      >
        마이페이지
      </NavLink>
    </nav>
  );
}

export default NavigationBarLayout;
