import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Items() {
  const navigate = useNavigate();
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortOption, setSortOption] = useState("popular");
  const [selectedItem, setSelectedItem] = useState(null);
  const [step, setStep] = useState("list");

  const items = [
    {
      id: 1,
      name: "카메라",
      rentableDays: 7,
      description: "영상 촬영에 사용할 수 있는 카메라",
      isAvailable: true,
      rentalCount: 15,
      createdAt: "2026-04-01",
    },
    {
      id: 2,
      name: "삼각대",
      rentableDays: 5,
      description: "카메라 고정할 때 좋아요",
      isAvailable: false,
      rentalCount: 8,
      createdAt: "2026-04-05",
    },
    {
      id: 3,
      name: "마이크",
      rentableDays: 3,
      description: "녹음 음질 낫 배드",
      isAvailable: true,
      rentalCount: 12,
      createdAt: "2026-04-03",
    },
    {
      id: 4,
      name: "조명",
      rentableDays: 4,
      description: "촬영용 보조 조명입니다.",
      isAvailable: true,
      rentalCount: 4,
      createdAt: "2026-04-06",
    },
  ];

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    if (showAvailableOnly) {
      result = result.filter((item) => item.isAvailable);
    }

    if (sortOption === "popular") {
      result.sort((a, b) => b.rentalCount - a.rentalCount);
    }

    if (sortOption === "recent") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sortOption === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    }

    return result;
  }, [items, showAvailableOnly, sortOption]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  useEffect(() => {
    if (step === "done" && selectedItem) {
      navigate("/home", {
        state: { toast: `${selectedItem.name}이 대여 완료되었습니다.` },
      });
    }
  }, [step, selectedItem, navigate]);

  if (step === "confirm" && selectedItem) {
    return (
      <main>
        <h1>물품 대여 확인</h1>
        <p>사진</p>
        <p>{selectedItem.name}을 대여하시겠습니까?</p>
        <p>
          반납일 | {year}년 {month}월 {date}일
        </p>
        <button onClick={() => setStep("done")}>예</button>
        <button onClick={() => setStep("detail")}>아니오</button>
      </main>
    );
  }

  if (step === "detail" && selectedItem) {
    return (
      <main>
        <button onClick={() => setStep("list")}>{"<"} 뒤로가기</button>
        <p>사진</p>
        <h2>{selectedItem.name}</h2>
        <p>대여기간 {selectedItem.rentableDays}일</p>
        <p>{selectedItem.description}</p>
        <button onClick={() => setStep("confirm")}>대여하기</button>
      </main>
    );
  }

  return (
    <main>
      <h1>물품 목록</h1>

      <div>
        <button onClick={() => setShowAvailableOnly((prev) => !prev)}>
          {showAvailableOnly ? "전체 보기" : "대여 가능"}
        </button>

        <select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
        >
          <option value="popular">대여 많은 순</option>
          <option value="recent">최신 등록 순</option>
          <option value="name">가나다순</option>
        </select>
      </div>

      <div>
        {filteredAndSortedItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedItem(item);
              setStep("detail");
            }}
          >
            <p>사진</p>
            <p>{item.name}</p>
          </button>
        ))}
      </div>
    </main>
  );
}

export default Items;
