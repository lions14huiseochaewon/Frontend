import { useEffect, useMemo, useState } from "react";
import useToastStore from "../store/useToastStore";

function MyPage() {
  const showToast = useToastStore((state) => state.showToast);
  const [mode, setMode] = useState("user");
  const [step, setStep] = useState("userMain");
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
      image: "/images/camera.jpg",
    },
    {
      id: 2,
      name: "삼각대",
      dueDate: "26.01.03",
      image: "/images/tripod.jpg",
    },
    {
      id: 3,
      name: "마이크",
      dueDate: "26.01.05",
      image: "/images/microphone.jpg",
    },
    {
      id: 4,
      name: "조명",
      dueDate: "26.01.07",
      image: "/images/lamp.jpg",
    },
  ]);

  const [adminItems, setAdminItems] = useState([
    {
      id: 1,
      name: "캐논 카메라",
      rentableDays: 7,
      description: "영상 촬영에 사용할 수 있는 카메라입니다.",
      image: "/images/camera.jpg",
    },
    {
      id: 2,
      name: "삼각대",
      rentableDays: 5,
      description: "카메라를 안정적으로 고정할 수 있는 삼각대입니다.",
      image: "/images/tripod.jpg",
    },
    {
      id: 3,
      name: "마이크",
      rentableDays: 3,
      description: "음성 녹음용 마이크입니다.",
      image: "/images/microphone.jpg",
    },
    {
      id: 4,
      name: "조명",
      rentableDays: 4,
      description: "촬영용 보조 조명입니다.",
      image: "/images/lamp.jpg",
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
      showToast(`${newItem.name}이 등록되었습니다.`);
    } else {
      setAdminItems((prev) =>
        prev.map((item) =>
          item.id === selectedAdminItem.id ? selectedAdminItem : item,
        ),
      );
      showToast(`${selectedAdminItem.name}이 수정되었습니다.`);
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
      <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-white px-[36px] pt-[36px] pb-[120px]">
        <div className="pointer-events-none opacity-35">
          <section className="mt-[36px] mb-[32px] flex h-[180px] w-[360px] items-center rounded-[30px] bg-[#F4F8FF] px-[21px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-[16px]">
                <img src="/icons/profile.svg"></img>

                <div>
                  <p className="text-[12px] font-normal text-[#020913]">
                    융합콘텐츠학과
                  </p>

                  <p className="mt-[4px] text-[20px] leading-none font-semibold text-[#020913]">
                    김이름(2400001)
                  </p>

                  <p className="mt-[7px] text-[12px] font-normal text-[#020913]">
                    관리자
                  </p>
                </div>
              </div>

              <div className="flex h-[50px] w-[50px] flex-col items-center justify-center rounded-[12px] bg-[var(--color-main-2)] text-white">
                <p className="text-[12px] leading-none font-normal">연체</p>
                <p className="mt-[4px] text-[10px] leading-none font-light">
                  {userProfile.overdueCount}건
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-[18px] text-[20px] font-semibold">
              나의 대여 목록
            </h2>

            <div className="grid grid-cols-2 gap-x-[14px] gap-y-[28px]">
              {userRentals.map((rental) => (
                <div key={rental.id} className="w-full">
                  <div className="aspect-square w-full overflow-hidden bg-[#8C8C8C]">
                    <img
                      src={rental.image}
                      alt={rental.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-[10px] flex items-center justify-between gap-[8px]">
                    <div className="min-w-0">
                      <p className="text-[16px] leading-none font-semibold text-[#020913]">
                        {rental.name}
                      </p>

                      <p className="mt-[7px] text-[12px] leading-none font-normal text-[#020913]">
                        {rental.dueDate}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="h-[31px] w-[73px] shrink-0 rounded-[16px] bg-[var(--color-main-2)] text-[14px] font-medium text-white"
                    >
                      반납하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="absolute inset-0 bg-black/20" />

        <section className="fixed top-[290px] left-1/2 z-50 flex h-[249px] w-[370px] -translate-x-1/2 flex-col items-center rounded-[20px] bg-[#EEF4FF] pt-[47px]">
          <p className="text-[20px] font-semibold text-[#020913]">
            [{selectedRental.name}] 을 반납하시겠습니까?
          </p>

          <p className="mt-[18px] text-[15px] font-normal text-[#020913]">
            반납 일자: {selectedRental.dueDate}
          </p>

          <div className="mt-[43px] flex gap-[27px]">
            <button
              type="button"
              onClick={() => {
                setSelectedRental(null);
                setStep("userMain");
              }}
              className="h-[45px] w-[140px] rounded-[22px] border border-[var(--color-main-2)] bg-[#EEF4FF] text-[15px] font-semibold text-[#020913] outline-none focus:ring-0 focus:outline-none"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleReturnConfirm}
              className="h-[45px] w-[140px] rounded-[22px] bg-[var(--color-main-2)] text-[15px] font-semibold text-white outline-none focus:ring-0 focus:outline-none"
            >
              확인
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (mode === "admin" && step === "adminStatus") {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[402px] bg-white px-[36px] pt-[76px] pb-[120px]">
        <h1 className="text-[24px] font-normal text-[#020913]">
          대여 상세 내역
        </h1>

        <section className="mt-[45px]">
          <div className="flex h-[58px] w-full items-center justify-between rounded-[10px] bg-[var(--color-main-2)] px-[18px] text-white">
            <button
              type="button"
              onClick={() => setSelectedStatus("대여중")}
              className="flex h-[38px] min-w-[90px] flex-col items-center justify-center text-[12px] font-semibold"
            >
              <span>대여중</span>
              <span className="mt-[4px] font-normal">
                {statusCounts.대여중}건
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedStatus("연체")}
              className="flex h-[38px] min-w-[90px] flex-col items-center justify-center text-[12px] font-semibold"
            >
              <span>연체</span>
              <span className="mt-[4px] font-normal">
                {statusCounts.연체}건
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedStatus("반납완료")}
              className="flex h-[38px] min-w-[90px] flex-col items-center justify-center text-[12px] font-semibold"
            >
              <span>반납완료</span>
              <span className="mt-[4px] font-normal">
                {statusCounts.반납완료}건
              </span>
            </button>
          </div>
        </section>

        <section className="mt-[48px] overflow-hidden rounded-[10px] border border-[#D9D9D9] bg-white">
          <div className="grid h-[67px] grid-cols-[0.9fr_1fr_1fr_1fr_0.9fr] items-center border-b border-[#D9D9D9] text-center text-[14px] font-semibold text-[#020913]">
            <p>사용자</p>
            <p>물품명</p>
            <p>대여일</p>
            <p>반납일자</p>
            <p>상태</p>
          </div>

          <div>
            {filteredAdminRecords.map((record) => (
              <button
                key={record.id}
                type="button"
                onClick={() => {
                  const matchedItem = adminItems.find(
                    (item) => item.name === record.itemName,
                  );

                  setSelectedAdminItem(
                    matchedItem || {
                      id: 0,
                      name: record.itemName,
                      rentableDays: 0,
                      description: "물품 설명",
                    },
                  );
                  setStep("adminEdit");
                }}
                className="grid h-[67px] w-full grid-cols-[0.9fr_1fr_1fr_1fr_0.9fr] items-center border-b border-[#D9D9D9] text-center text-[11px] font-normal text-[#020913] outline-none last:border-b-0 focus:ring-0 focus:outline-none"
              >
                <p>{record.userName}</p>
                <p>{record.itemName}</p>
                <p>{record.rentalDate}</p>
                <p>{record.returnDate}</p>
                <div className="flex justify-center">
                  <span
                    className={`flex h-[25px] min-w-[58px] items-center justify-center rounded-[13px] px-[8px] text-[10px] font-normal text-white ${
                      record.status === "연체"
                        ? "bg-[#D93636]"
                        : record.status === "반납완료"
                          ? "bg-[#838383]"
                          : "bg-[var(--color-main-3)]"
                    }`}
                  >
                    {record.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (mode === "admin" && step === "adminEdit" && selectedAdminItem) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[402px] bg-white pb-[120px]">
        <header className="flex h-[43px] w-full items-center bg-[#D9D9D9] px-[37px]">
          <button
            type="button"
            onClick={() => setStep("adminStatus")}
            className="text-[28px] leading-none font-light text-[#707070] outline-none focus:ring-0 focus:outline-none"
          >
            ‹
          </button>
        </header>

        <section className="px-[37px] pt-[32px]">
          <div className="mx-auto h-[287px] w-[287px] overflow-hidden bg-[#838383]">
            <img
              src={selectedAdminItem.image}
              alt={selectedAdminItem.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mx-auto mt-[27px] flex w-[287px] items-baseline gap-[34px]">
            <input
              id="item-name"
              type="text"
              value={selectedAdminItem.name}
              onChange={(event) =>
                handleAdminItemChange("name", event.target.value)
              }
              className="w-[130px] border-0 bg-transparent text-[24px] leading-none font-semibold text-[#707070] outline-none focus:ring-0 focus:outline-none"
            />

            <div className="flex items-baseline text-[15px] leading-none font-normal text-[#707070]">
              <span>대여기간&nbsp;</span>
              <input
                id="item-days"
                type="number"
                value={selectedAdminItem.rentableDays}
                onChange={(event) =>
                  handleAdminItemChange("rentableDays", event.target.value)
                }
                className="w-[10px] appearance-none border-0 bg-transparent p-0 text-[15px] leading-none font-normal text-[#707070] outline-none focus:ring-0 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span>일</span>
            </div>
          </div>

          <div className="mx-auto mt-[34px] w-[287px]">
            <textarea
              id="item-description"
              value={selectedAdminItem.description}
              onChange={(event) =>
                handleAdminItemChange("description", event.target.value)
              }
              className="min-h-[120px] w-full resize-none border-0 bg-transparent text-[15px] leading-[28px] font-normal text-[#707070] outline-none focus:ring-0 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleAdminItemSave}
            className="mt-[28px] h-[44px] w-full rounded-[10px] bg-[var(--color-main-2)] text-[16px] font-medium text-white"
          >
            저장하기
          </button>
        </section>
      </main>
    );
  }

  if (mode === "admin") {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[402px] bg-white px-[36px] pt-[76px] pb-[120px]">
        <h1 className="text-[24px] font-bold text-[#020913]">관리자 모드</h1>

        <section className="mt-[45px]">
          <h2 className="text-[15px] font-semibold text-[#020913]">
            전체 현황
          </h2>

          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              setSelectedStatus("");
              setStep("adminStatus");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSelectedStatus("");
                setStep("adminStatus");
              }
            }}
            className="mt-[18px] flex h-[58px] w-full cursor-pointer items-center justify-between rounded-[10px] bg-[var(--color-main-2)] px-[18px] text-white"
          >
            <button
              type="button"
              onClick={() => {
                setSelectedStatus("대여중");
                setStep("adminStatus");
              }}
              className="flex h-[38px] min-w-[90px] flex-col items-center justify-center rounded-[5px] text-[12px] font-semibold text-white"
            >
              <span>대여중</span>
              <span className="mt-[4px] font-normal">
                {statusCounts.대여중}건
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedStatus("연체");
                setStep("adminStatus");
              }}
              className="flex h-[38px] min-w-[90px] flex-col items-center justify-center rounded-[5px] text-[12px] font-semibold text-white"
            >
              <span>연체</span>
              <span className="mt-[4px] font-normal">
                {statusCounts.연체}건
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedStatus("반납완료");
                setStep("adminStatus");
              }}
              className="flex h-[38px] min-w-[90px] flex-col items-center justify-center rounded-[5px] text-[12px] font-semibold text-white"
            >
              <span>반납완료</span>
              <span className="mt-[4px] font-normal">
                {statusCounts.반납완료}건
              </span>
            </button>
          </div>
        </section>

        <section className="mt-[68px]">
          <div className="mb-[18px] flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-[#020913]">
              물품 등록 및 수정
            </h2>

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
              className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#D9D9D9] text-[18px] font-normal text-[#020913]"
            >
              +
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-[14px] gap-y-[28px]">
            {adminItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedAdminItem(item);
                  setStep("adminEdit");
                }}
                className="w-full text-left"
              >
                <div className="aspect-square w-full overflow-hidden bg-[#838383]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="mt-[10px] text-[12px] leading-none font-normal text-[#020913]">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[402px] bg-white px-[36px] pt-[36px] pb-[120px]">
      <section className="mt-[36px] mb-[32px] flex h-[181px] w-full items-center rounded-[30px] bg-[#F4F8FF] px-[21px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <img
              src="/icons/profile.svg"
              alt="프로필"
              className="h-[64px] w-[64px]"
            />

            <div>
              <p className="text-[12px] font-normal text-[#020913]">
                융합콘텐츠학과
              </p>

              <p className="mt-[4px] text-[20px] leading-none font-semibold text-[#020913]">
                김이름(2400001)
              </p>

              {userProfile.role === "관리자" ? (
                <button
                  type="button"
                  onClick={openAdminPage}
                  className="mt-[7px] text-[12px] font-normal text-[#020913]"
                >
                  관리자
                </button>
              ) : (
                <p className="mt-[7px] text-[12px] font-normal text-[#020913]">
                  {userProfile.role}
                </p>
              )}
            </div>
          </div>

          <div className="flex h-[50px] w-[50px] flex-col items-center justify-center rounded-[12px] bg-[var(--color-main-2)] text-white">
            <p className="text-[12px] leading-none font-normal">연체</p>
            <p className="mt-[4px] text-[10px] leading-none font-light">
              {userProfile.overdueCount}건
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-[18px] text-[20px] font-semibold">나의 대여 목록</h2>

        <div className="grid grid-cols-2 gap-x-[14px] gap-y-[28px]">
          {userRentals.map((rental) => (
            <div key={rental.id} className="w-full">
              <div className="aspect-square w-full overflow-hidden bg-[#8C8C8C]">
                <img
                  src={rental.image}
                  alt={rental.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-[10px] flex items-center justify-between gap-[8px]">
                <div className="min-w-0">
                  <p className="text-[16px] leading-none font-semibold text-[#020913]">
                    {rental.name}
                  </p>

                  <p className="mt-[7px] text-[12px] leading-none font-normal text-[#020913]">
                    {rental.dueDate}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRental(rental);
                    setStep("userConfirm");
                  }}
                  className="h-[31px] w-[73px] shrink-0 rounded-[16px] bg-[var(--color-main-2)] text-[14px] font-medium text-white"
                >
                  반납하기
                </button>
              </div>
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
    showToast(`[${selectedRental.name}]이 반납 완료되었습니다.`);
    setSelectedRental(null);
    setStep("userMain");
  }
}

export default MyPage;
