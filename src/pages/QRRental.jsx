import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

function QRRental() {
  const navigate = useNavigate();
  const [step, setStep] = useState("select");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  useEffect(() => {
    if (step === "done") {
      navigate("/home", {
        state: { toast: "(물품명)이 대여 완료되었습니다." },
      });
    }
  }, [step, navigate]);

  if (step === "select") {
    return (
      <main className="relative mx-auto h-[874px] w-[402px] overflow-hidden">
        <div className="pointer-events-none">
          <Home />
        </div>

        <div className="absolute inset-0 z-40 bg-black/20" />

        <div className="fixed bottom-[101px] left-1/2 z-[100] h-[87px] w-[377px] -translate-x-1/2 rounded-[10px] bg-[#F7F7F7]">
          <div>
            <button
              onClick={() => setStep("confirm")}
              className="h-[43px] w-full text-[15px] font-normal text-black"
            >
              사진 찍기
            </button>

            <div className="h-[0.3px] w-full bg-[#D9D9D9]" />
          </div>
          <label className="flex h-[43px] w-full cursor-pointer items-center justify-center text-[15px] font-normal text-black">
            사진 보관함
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files[0];

                if (file) {
                  setStep("confirm");
                }
              }}
            />
          </label>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="fixed bottom-[30px] left-1/2 z-[100] h-[57px] w-[377px] -translate-x-1/2 rounded-[10px] bg-[#F7F7F7] text-[15px] font-normal text-black"
        >
          취소
        </button>
      </main>
    );
  }

  if (step === "confirm") {
    return (
      <main className="mx-auto h-[874px] w-[402px] bg-white">
        <section className="pt-[278px]">
          <div className="mx-auto flex h-[202px] w-[202px] items-center justify-center bg-[#838383] text-[15px] font-medium text-black">
            사진
          </div>
        </section>

        <section className="mt-[42px] text-center">
          <p className="text-[20px] font-semibold text-black">
            (물품명) 를 대여하시겠습니까?
          </p>
          <p className="mt-[8px] text-[15px] font-normal text-black">
            반납일 | {year}년 {month}월 {date}일
          </p>
        </section>

        <section className="mt-[27px] flex justify-center gap-[21px]">
          <button
            onClick={() => setStep("done")}
            className="h-[38px] w-[123px] rounded-[4px] bg-[#D9D9D9] text-[15.451px] font-normal text-black"
          >
            예
          </button>
          <button
            onClick={() => setStep("select")}
            className="h-[38px] w-[123px] rounded-[4px] bg-[#D9D9D9] text-[15.451px] font-normal text-black"
          >
            아니오
          </button>
        </section>
      </main>
    );
  }

  if (step === "done") {
    return (
      <main>
        <p>(물품명)이 대여 완료되었습니다.</p>
      </main>
    );
  }
}

export default QRRental;
