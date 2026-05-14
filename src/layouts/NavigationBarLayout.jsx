import { NavLink, useLocation } from "react-router-dom";

function NavigationBarLayout() {
  const location = useLocation();

  const isItemsPage = location.pathname === "/items";
  const isMyPage = location.pathname === "/mypage";

  return (
    <nav className="fixed bottom-0 left-1/2 flex h-[66px] w-[402px] -translate-x-1/2 items-end justify-between rounded-t-[10px] bg-[#F4F8FF] px-[36px] pb-[8px]">
      <NavLink
        to="/items"
        className="flex h-full w-[80px] translate-y-[5px] items-center justify-center"
      >
        <img
          src={isItemsPage ? "/icons/items-blue.svg" : "/icons/items-gray.svg"}
          alt="물품"
          className="w-[40px] object-contain"
        />
      </NavLink>

      <NavLink
        to="/qr-rental"
        className="relative flex h-[91px] w-[113px] translate-y-[18px] items-center justify-center rounded-[50%] bg-[#F4F8FF]"
      >
        <img
          src="/icons/qr.svg"
          alt="QR 대여"
          className="w-[33px] object-contain"
        />
      </NavLink>

      <NavLink
        to="/mypage"
        className="flex h-full w-[80px] translate-y-[5px] items-center justify-center"
      >
        <img
          src={isMyPage ? "/icons/mypage-blue.svg" : "/icons/mypage-gray.svg"}
          alt="마이페이지"
          className="w-[55px] object-contain"
        />
      </NavLink>
    </nav>
  );
}

export default NavigationBarLayout;
