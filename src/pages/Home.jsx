import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState("");

  const availableItems = [
    { id: 1, name: "물건1" },
    { id: 2, name: "물건2" },
    { id: 3, name: "물건3" },
    { id: 4, name: "물건4" },
    { id: 5, name: "물건5" },
    { id: 6, name: "물건6" },
  ];

  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleItems = availableItems.slice(scrollIndex, scrollIndex + 3);

  const rentedItem = {
    name: "캐논 카메라",
    dueDate: "260410",
  };

  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast);

      const timer = setTimeout(() => {
        setToast("");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <main className="mx-auto h-[874px] w-[402px]">
      {toast && (
        <div className="toast-fade fixed top-[32px] left-1/2 z-[100] flex h-[60px] w-[360px] -translate-x-1/2 items-center rounded-[10px] bg-[#222222] px-[21px] text-[15px] font-normal text-white">
          {toast}
        </div>
      )}

      <section className="mt-[181px] flex justify-center">
        <img src="/icons/Believe.svg" className="w-[165px]" />
      </section>

      <section className="mt-[20px] flex justify-center">
        <h2 className="text-[15px] font-normal whitespace-nowrap">
          *** 님 환영합니다!
        </h2>
      </section>

      <section className="mt-[102px] ml-[36px]">
        <h2 className="text-[15px] font-medium">대여 가능 물품</h2>

        <div className="mt-[10px] flex items-center gap-[14px]">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate("/items")}
              className="flex h-[100px] w-[100px] items-center justify-center bg-[#838383] text-[15px] font-medium"
            >
              {item.name}
            </button>
          ))}

          <button
            onClick={() =>
              setScrollIndex((prev) =>
                prev + 3 >= availableItems.length ? 0 : prev + 3,
              )
            }
            className="text-[15px] font-medium"
          >
            {">"}
          </button>
        </div>
      </section>

      <section>
        <h2 className="mt-[94px] mb-[19px] ml-[36px] w-[330px] text-[15px] font-medium">
          나의 대여상태
        </h2>

        <button
          onClick={() => navigate("/mypage")}
          className="mt-[10px] ml-[36px] flex h-[55px] w-[330px] flex-col items-start justify-center bg-[#D9D9D9] pl-[15px]"
        >
          <p className="text-[12px]">
            <span className="font-normal">{rentedItem.name}</span>{" "}
            <span className="font-bold">대여중</span>
          </p>

          <p className="text-[10px] leading-[18px] text-black">
            <span className="font-light">반납일자 | </span>
            <span className="font-light">{rentedItem.dueDate}</span>
          </p>
        </button>
      </section>
    </main>
  );
}

export default Home;
