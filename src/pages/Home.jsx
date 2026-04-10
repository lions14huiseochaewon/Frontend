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
  ];

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
      {toast && <div>{toast}</div>}
      {/*로고*/}
      <section className="mt-[171px] flex justify-center p-[10px]">
        <img src="/icons/Believe.svg" />
      </section>
      {/*환영인사*/}
      <section className="flex justify-center">
        <h2 className="text-center text-[15px] font-normal whitespace-nowrap">
          *** 님 환영합니다!
        </h2>
      </section>

      <section>
        <h2 className="font-size-[15px] w-[330px] items-center font-medium">
          나의 대여상태
        </h2>
        <button onClick={() => navigate("/mypage")}>
          <p>{rentedItem.name} 대여중</p>
          <p>반납일자 | {rentedItem.dueDate}</p>
        </button>
      </section>
      <section>
        <div>
          <h2>대여 가능 물품</h2>
          <button onClick={() => navigate("/items")}>{">"}</button>
        </div>

        <div>
          {availableItems.map((item) => (
            <button key={item.id} onClick={() => navigate("/items")}>
              {item.name}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
