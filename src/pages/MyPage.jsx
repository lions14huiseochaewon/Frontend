import { useEffect, useMemo, useState } from "react";

function MyPage() {
  const [mode, setMode] = useState("user");
  const [step, setStep] = useState("userMain");
  const [toast, setToast] = useState("");
  const [selectedRental, setSelectedRental] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAdminItem, setSelectedAdminItem] = useState(null);

  const userProfile = {
    department: "컴퓨터공학과",
    name: "김이름",
    studentId: "2400001",
    overdueCount: 1,
    role: "관리자",
    phone: "010-0000-0000",
  };

  const [userRentals, setUserRentals] = useState([
    {
      id: 1,
      name: "캐논 카메라",
      dueDate: "26.01.01",
    },
    {
      id: 2,
      name: "삼각대",
      dueDate: "26.01.03",
    },
    {
      id: 3,
      name: "마이크",
      dueDate: "26.01.05",
    },
    {
      id: 4,
      name: "조명",
      dueDate: "26.01.07",
    },
  ]);

  const [adminItems, setAdminItems] = useState([
    {
      id: 1,
      name: "캐논 카메라",
      rentableDays: 7,
      description: "영상 촬영에 사용할 수 있는 카메라입니다.",
    },
    {
      id: 2,
      name: "삼각대",
      rentableDays: 5,
      description: "카메라를 안정적으로 고정할 수 있는 삼각대입니다.",
    },
    {
      id: 3,
      name: "마이크",
      rentableDays: 3,
      description: "음성 녹음용 마이크입니다.",
    },
    {
      id: 4,
      name: "조명",
      rentableDays: 4,
      description: "촬영용 보조 조명입니다.",
    },
  ]);

  const adminRecords = [
    {
      id: 1,
      userName: "김사용자",
      itemName: "캐논 카메라",
      rentalDate: "26.01.01",
      returnDate: "26.01.08",
      status: "대여중",
    },
    {
      id: 2,
      userName: "이사용자",
      itemName: "삼각대",
      rentalDate: "26.01.02",
      returnDate: "26.01.06",
      status: "연체",
    },
    {
      id: 3,
      userName: "박사용자",
      itemName: "마이크",
      rentalDate: "26.01.03",
      returnDate: "26.01.05",
      status: "반납완료",
    },
    {
      id: 4,
      userName: "최사용자",
      itemName: "조명",
      rentalDate: "26.01.04",
      returnDate: "26.01.08",
      status: "대여중",
    },
    {
      id: 5,
      userName: "정사용자",
      itemName: "빔프로젝터",
      rentalDate: "26.01.01",
      returnDate: "26.01.03",
      status: "반납완료",
    },
    {
      id: 6,
      userName: "한사용자",
      itemName: "멀티탭",
      rentalDate: "26.01.02",
      returnDate: "26.01.04",
      status: "연체",
    },
  ];

  const statusCounts = useMemo(() => {
    return {
      대여중: adminRecords.filter((record) => record.status === "대여중")
        .length,
      연체: adminRecords.filter((record) => record.status === "연체").length,
      반납완료: adminRecords.filter((record) => record.status === "반납완료")
        .length,
    };
  }, [adminRecords]);

  const filteredAdminRecords = useMemo(() => {
    if (!selectedStatus) {
      return adminRecords;
    }

    return adminRecords.filter((record) => record.status === selectedStatus);
  }, [adminRecords, selectedStatus]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAdminItemChange = (field, value) => {
    setSelectedAdminItem((prev) => ({
      ...prev,
      [field]: field === "rentableDays" ? Number(value) : value,
    }));
  };

  const handleAdminItemSave = () => {
    if (!selectedAdminItem) {
      return;
    }

    if (selectedAdminItem.id === 0) {
      const newItem = {
        ...selectedAdminItem,
        id: Date.now(),
      };

      setAdminItems((prev) => [...prev, newItem]);
      setToast(`${newItem.name}이 등록되었습니다.`);
    } else {
      setAdminItems((prev) =>
        prev.map((item) =>
          item.id === selectedAdminItem.id ? selectedAdminItem : item,
        ),
      );
      setToast(`${selectedAdminItem.name}이 수정되었습니다.`);
    }

    setStep("adminMain");
    setSelectedAdminItem(null);
  };

  const openAdminPage = () => {
    setMode("admin");
    setStep("adminMain");
    setSelectedRental(null);
    setSelectedStatus("");
    setSelectedAdminItem(null);
  };

  if (mode === "user" && step === "userConfirm" && selectedRental) {
    return (
      <main>
        {toast && <div>{toast}</div>}

        <h1>물품반납</h1>
        <p>{selectedRental.name}을 반납하시겠습니까?</p>
        <button type="button" onClick={handleReturnConfirm}>
          예
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedRental(null);
            setStep("userMain");
          }}
        >
          아니오
        </button>
      </main>
    );
  }

  if (mode === "admin" && step === "adminStatus") {
    return (
      <main>
        {toast && <div>{toast}</div>}

        <h1>관리자 모드</h1>
        <button type="button" onClick={() => setStep("adminMain")}>
          {"<"} 뒤로가기
        </button>

        <h2>대여 상세 내역</h2>
        <p>{selectedStatus || "전체"}</p>

        <div>
          <button type="button">대여중 {statusCounts.대여중}건</button>
          <button type="button">연체 {statusCounts.연체}건</button>
          <button type="button">반납 완료 {statusCounts.반납완료}건</button>
        </div>

        <div>
          {filteredAdminRecords.map((record) => (
            <div key={record.id}>
              <p>사용자 | {record.userName}</p>
              <p>물품명 | {record.itemName}</p>
              <p>대여일 | {record.rentalDate}</p>
              <p>반납일자 | {record.returnDate}</p>
              <p>상태 | {record.status}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (mode === "admin" && step === "adminEdit" && selectedAdminItem) {
    return (
      <main>
        {toast && <div>{toast}</div>}

        <h1>물품 세부 수정</h1>
        <button type="button" onClick={() => setStep("adminMain")}>
          {"<"} 뒤로가기
        </button>

        <p>사진</p>

        <div>
          <label htmlFor="item-name">물품명</label>
          <input
            id="item-name"
            type="text"
            value={selectedAdminItem.name}
            onChange={(event) =>
              handleAdminItemChange("name", event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="item-days">대여기간</label>
          <input
            id="item-days"
            type="number"
            value={selectedAdminItem.rentableDays}
            onChange={(event) =>
              handleAdminItemChange("rentableDays", event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="item-description">물품 설명</label>
          <textarea
            id="item-description"
            value={selectedAdminItem.description}
            onChange={(event) =>
              handleAdminItemChange("description", event.target.value)
            }
          />
        </div>

        <button type="button" onClick={handleAdminItemSave}>
          저장하기
        </button>
      </main>
    );
  }

  if (mode === "admin") {
    return (
      <main>
        {toast && <div>{toast}</div>}

        <h1>관리자 모드</h1>

        <section>
          <h2>전체 현황</h2>
          <div>
            <button
              type="button"
              onClick={() => {
                setSelectedStatus("대여중");
                setStep("adminStatus");
              }}
            >
              대여중 {statusCounts.대여중}건
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedStatus("연체");
                setStep("adminStatus");
              }}
            >
              연체 {statusCounts.연체}건
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedStatus("반납완료");
                setStep("adminStatus");
              }}
            >
              반납완료 {statusCounts.반납완료}건
            </button>
          </div>
        </section>

        <section>
          <div>
            <h2>물품 등록 및 수정</h2>
            <button
              type="button"
              onClick={() => {
                setSelectedAdminItem({
                  id: 0,
                  name: "새 물품",
                  rentableDays: 0,
                  description: "새로 등록할 물품 설명",
                });
                setStep("adminEdit");
              }}
            >
              +
            </button>
          </div>

          <div>
            {adminItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedAdminItem(item);
                  setStep("adminEdit");
                }}
              >
                <p>사진</p>
                <p>{item.name}</p>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {toast && <div>{toast}</div>}

      <h1>마이페이지</h1>

      <section>
        <h2>사용자 프로필</h2>
        <p>{userProfile.department}</p>
        <p>
          {userProfile.name} ({userProfile.studentId})
        </p>
        <p>연체 {userProfile.overdueCount}건</p>
        {userProfile.role === "관리자" ? (
          <button type="button" onClick={openAdminPage}>
            {userProfile.role}
          </button>
        ) : (
          <p>{userProfile.role}</p>
        )}
      </section>

      <section>
        <h2>나의 대여 목록</h2>
        <div>
          {userRentals.map((rental) => (
            <div key={rental.id}>
              <p>사진</p>
              <p>{rental.name}</p>
              <p>반납기한 {rental.dueDate}</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedRental(rental);
                  setStep("userConfirm");
                }}
              >
                반납하기
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );

  function handleReturnConfirm() {
    if (!selectedRental) {
      return;
    }

    setUserRentals((prev) =>
      prev.filter((rental) => rental.id !== selectedRental.id),
    );
    setToast(`${selectedRental.name}이 반납 완료되었습니다.`);
    setSelectedRental(null);
    setStep("userMain");
  }
}

export default MyPage;
