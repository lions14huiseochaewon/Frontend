import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <main>
        <h1>QR 대여</h1>
        <button onClick={() => setStep("confirm")}>사진 찍기</button>
        <button onClick={() => setStep("confirm")}>사진 보관함</button>
        <button onClick={() => navigate("/home")}>취소</button>
      </main>
    );
  }
  if (step === "confirm") {
    return (
      <main>
        <h1>QR 대여</h1>
        <p>(물품명)을 대여 하시겠습니까?</p>
        <p>
          반납일 | {year}년 {month}월 {date}일
        </p>
        <button onClick={() => setStep("done")}>예</button>
        <button onClick={() => setStep("select")}>아니오</button>
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
