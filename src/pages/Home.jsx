import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const availableItems = [
    { id: 1, name: "카메라", image: "/images/camera.jpg" },
    { id: 2, name: "삼각대", image: "/images/tripod.jpg" },
    { id: 3, name: "마이크", image: "/images/microphone.jpg" },
    { id: 4, name: "조명", image: "/images/lamp.jpg" },
    { id: 5, name: "카메라", image: "/images/camera.jpg" },
    { id: 6, name: "삼각대", image: "/images/tripod.jpg" },
  ];

  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleItems = availableItems.slice(scrollIndex, scrollIndex + 3);

  const rentedItem = {
    name: "캐논 카메라",
    dueDate: "260410",
  };

  return (
    <main className="mx-auto h-[874px] w-[402px]">
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
              className="h-[100px] w-[100px] overflow-hidden bg-[#838383]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
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
          className="mt-[10px] ml-[36px] flex h-[78px] w-[330px] flex-col items-start justify-center rounded-[10px] bg-[#F4F8FF] pl-[15px]"
        >
          <div className="flex items-center gap-[10px]">
            <span className="text-[16px] font-medium text-[#020913]">
              {rentedItem.name}
            </span>

            <span className="flex h-[20px] w-[52px] items-center justify-center rounded-[13px] bg-[var(--color-main-3)] px-[8px] text-[8px] font-normal text-white">
              대여중
            </span>
          </div>

          <p className="text-[12px] leading-[18px] text-black">
            <span className="font-light">반납일자 | </span>
            <span className="font-light">{rentedItem.dueDate}</span>
          </p>
        </button>
      </section>
    </main>
  );
}

export default Home;
