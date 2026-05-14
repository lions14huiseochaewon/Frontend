import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (id && password) {
      navigate("/home");
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[402px] bg-[#EEEEEE] px-[37px] pt-[167px]">
      <img
        src="/icons/Believe.svg"
        alt="Believe"
        className="mx-auto h-auto w-[178px]"
      />

      <section className="mt-[84px]">
        <h2 className="mb-[11px] ml-[16px] text-[15px] font-medium text-[#707070]">
          아이디
        </h2>

        <input
          type="text"
          placeholder="아이디를 입력하세요"
          value={id}
          onChange={(event) => setId(event.target.value)}
          className="h-[42px] w-full rounded-[10px] border border-[#D9D9D9] bg-[#F7F7F7] px-[15px] text-[15px] text-[#020913] outline-none placeholder:text-[#B3B3B3] focus:ring-0 focus:outline-none"
        />
      </section>

      <section className="mt-[26px]">
        <h2 className="mb-[11px] ml-[16px] text-[15px] font-medium text-[#707070]">
          비밀번호
        </h2>

        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-[42px] w-full rounded-[10px] border border-[#D9D9D9] bg-[#F7F7F7] px-[15px] text-[15px] text-[#020913] outline-none placeholder:text-[#B3B3B3] focus:ring-0 focus:outline-none"
        />
      </section>

      <button
        type="button"
        onClick={handleLogin}
        className="mt-[38px] flex h-[45px] w-full items-center justify-center rounded-[10px] bg-[#838383] text-[15.723px] font-semibold text-white outline-none focus:ring-0 focus:outline-none"
      >
        로그인 →
      </button>

      <button
        type="button"
        onClick={() => navigate("/signup")}
        className="mt-[23px] block w-full text-center text-[15px] font-medium text-[#707070] outline-none focus:ring-0 focus:outline-none"
      >
        회원가입
      </button>
    </main>
  );
}

export default Login;
