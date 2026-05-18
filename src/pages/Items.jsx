import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToastStore from "../store/useToastStore";

function Items() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortOption, setSortOption] = useState("popular");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [step, setStep] = useState("list");

  const items = [
    {
      id: 1,
      name: "카메라",
      rentableDays: 7,
      returnDate: "26.01.01",
      description: "영상 촬영에 사용할 수 있는 카메라",
      image: "/images/camera.jpg",
      isAvailable: true,
      rentalCount: 15,
      createdAt: "2026-04-01",
    },
    {
      id: 2,
      name: "삼각대",
      rentableDays: 5,
      returnDate: "26.01.03",
      description: "카메라 고정할 때 좋아요",
      image: "/images/tripod.jpg",
      isAvailable: false,
      rentalCount: 8,
      createdAt: "2026-04-05",
    },
    {
      id: 3,
      name: "마이크",
      rentableDays: 3,
      returnDate: "26.01.05",
      description: "녹음 음질 낫 배드",
      image: "/images/microphone.jpg",
      isAvailable: true,
      rentalCount: 12,
      createdAt: "2026-04-03",
    },
    {
      id: 4,
      name: "조명",
      rentableDays: 4,
      returnDate: "26.01.07",
      description: "촬영용 보조 조명입니다.",
      image: "/images/lamp.jpg",
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
      showToast(`[${selectedItem.name}]이 대여 완료되었습니다.`);
      navigate("/home");
    }
  }, [step, selectedItem, navigate, showToast]);

  if (step === "confirm" && selectedItem) {
    return (
      <main className="mx-auto h-[874px] w-[402px] bg-white">
        <section className="pt-[190px]">
          <div className="mx-auto h-[202px] w-[202px] overflow-hidden bg-[#838383]">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="mx-auto mt-[52px] flex h-[215px] w-[300px] flex-col items-center rounded-[20px] bg-[#EEF4FF] pt-[47px]">
          <p className="text-[20px] font-semibold text-[#020913]">
            ({selectedItem.name}) 를 대여하시겠습니까?
          </p>

          <p className="mt-[18px] text-[15px] font-normal text-[#020913]">
            반납 일자: {year}.{String(month).padStart(2, "0")}.
            {String(date).padStart(2, "0")}
          </p>

          <div className="mt-[43px] flex gap-[27px]">
            <button
              type="button"
              onClick={() => setStep("detail")}
              className="h-[43px] w-[123px] rounded-[22px] border border-[var(--color-main-2)] bg-[#EEF4FF] text-[15px] font-semibold text-[#020913] outline-none focus:ring-0 focus:outline-none"
            >
              취소
            </button>

            <button
              type="button"
              onClick={() => setStep("done")}
              className="h-[43px] w-[123px] rounded-[22px] bg-[var(--color-main-2)] text-[15px] font-semibold text-white outline-none focus:ring-0 focus:outline-none"
            >
              확인
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (step === "detail" && selectedItem) {
    return (
      <main className="mx-auto min-h-[874px] w-[402px] bg-white pb-[120px]">
        <header className="flex h-[49px] w-full items-center bg-[var(--color-main-2)] px-[26px]">
          <button
            type="button"
            onClick={() => setStep("list")}
            className="text-[28px] leading-none font-light text-[#F4F8FF] outline-none focus:ring-0 focus:outline-none"
          >
            ‹
          </button>
        </header>

        <section className="px-[37px] pt-[32px]">
          <div className="mx-auto h-[287px] w-[287px] overflow-hidden bg-[#838383]">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mx-auto mt-[27px] flex w-[287px] items-baseline gap-[34px]">
            <h2 className="w-[130px] text-[24px] leading-none font-semibold text-[#020913]">
              {selectedItem.name}
            </h2>

            <p className="text-[15px] leading-none font-normal text-[#707070]">
              대여기간 {selectedItem.rentableDays}일
            </p>
          </div>

          <p className="mx-auto mt-[34px] w-[287px] text-[15px] leading-[28px] font-normal text-[#707070]">
            {selectedItem.description}
          </p>

          <button
            type="button"
            onClick={() => setStep("confirm")}
            className="mx-auto mt-[184px] flex h-[31px] w-[107px] items-center justify-center rounded-[5px] bg-[#D9D9D9] text-[15px] font-normal text-[#020913] outline-none focus:ring-0 focus:outline-none"
          >
            대여하기
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[874px] w-[402px] bg-white pb-[90px]">
      <h1 className="ml-[40px] pt-[78px] text-[24px] font-bold text-black">
        물품 목록
      </h1>

      <div className="mt-[26px] ml-[40px] flex w-[322px] items-center justify-between">
        <button
          onClick={() => setShowAvailableOnly((prev) => !prev)}
          className={`flex h-[30px] w-[80px] items-center justify-center rounded-[30px] border border-[#020913] text-[16px] font-medium outline-none focus:ring-0 focus:outline-none ${
            showAvailableOnly
              ? "bg-[#204470] text-white"
              : "bg-[#F4F8FF] text-[#020913]"
          }`}
        >
          대여가능
        </button>

        <div className="relative z-20">
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="flex h-[40px] w-[140px] items-center border border-[#204470] bg-white text-[16px] font-normal text-black outline-none focus:ring-0 focus:outline-none"
          >
            <span className="flex h-full w-[100px] items-center justify-center">
              {sortOption === "popular"
                ? "대여 많은 순"
                : sortOption === "recent"
                  ? "최신 등록 순"
                  : "가나다 순"}
            </span>
            <span className="flex h-full w-[40px] items-center justify-center bg-[#204470] text-white">
              {isSortOpen ? (
                <img
                  src="/icons/up_arrow.svg"
                  alt="드롭다운 닫기"
                  className="h-[14px] w-[14px] object-contain"
                />
              ) : (
                <img
                  src="/icons/down_arrow.svg"
                  alt="드롭다운 열기"
                  className="h-[14px] w-[14px] object-contain"
                />
              )}
            </span>
          </button>

          {isSortOpen && (
            <div className="absolute top-[40px] left-0 w-[100px] border-x border-b border-[#204470] bg-white text-[16px] font-normal text-black">
              {[
                { value: "popular", label: "대여 많은 순" },
                { value: "recent", label: "최신 등록 순" },
                { value: "name", label: "가나다 순" },
              ]
                .filter((option) => option.value !== sortOption)
                .map((option, index, array) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortOption(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`h-[40px] w-full pl-[10px] text-left outline-none focus:ring-0 focus:outline-none ${
                      index !== array.length - 1
                        ? "border-b border-[#D9D9D9]"
                        : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-[17px] ml-[40px] grid w-[322px] grid-cols-2 gap-x-[15px] gap-y-[34px]">
        {filteredAndSortedItems.map((item) => (
          <div key={item.id} className="w-[153px]">
            <button
              type="button"
              onClick={() => {
                setSelectedItem(item);
                setStep("detail");
              }}
              className="h-[153px] w-[153px] overflow-hidden bg-[#838383]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </button>

            <div className="mt-[10px] flex items-center justify-between gap-[8px]">
              <div className="min-w-0">
                <p className="text-[16px] leading-none font-semibold text-[#020913]">
                  {item.name}
                </p>

                <p className="mt-[7px] text-[12px] leading-none font-normal text-[#020913]">
                  {item.returnDate}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedItem(item);
                  setStep("confirm");
                }}
                className="h-[31px] w-[73px] shrink-0 rounded-[16px] bg-[var(--color-main-2)] text-[14px] font-medium text-white"
              >
                대여하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Items;
