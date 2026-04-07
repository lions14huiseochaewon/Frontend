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
    <main>
      {toast && <div>{toast}</div>}
      <section>
        <h1>Believe</h1>
        <p>*** 님 환영합니다!</p>
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

      <section>
        <h2>나의 대여상태</h2>
        <button onClick={() => navigate("/mypage")}>
          <p>{rentedItem.name} 대여중</p>
          <p>반납일자 | {rentedItem.dueDate}</p>
        </button>
      </section>
    </main>
  );
}

export default Home;
