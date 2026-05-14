import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = () => {
    if (
      !id ||
      !password ||
      !passwordConfirm ||
      !name ||
      !department ||
      !role ||
      !phone
    ) {
      return;
    }

    if (password !== passwordConfirm) {
      return;
    }

    navigate("/login");
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[402px] bg-[#EEEEEE] px-[37px] pt-[98px] pb-[60px]">
      <h1 className="mt-[40px] text-[24px] font-normal text-[#020913]">
        회원가입
      </h1>

      <section className="mt-[61px] flex flex-col gap-[23px]">
        <div className="flex items-center justify-between">
          <label
            htmlFor="signup-id"
            className="w-[72px] text-[13px] font-normal text-[#545454]"
          >
            아이디
          </label>
          <input
            id="signup-id"
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="h-[34px] w-[213px] rounded-[6px] border border-[#D9D9D9] bg-[#F7F7F7] px-[12px] text-[12px] text-[#020913] outline-none placeholder:text-[#B3B3B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="signup-password"
            className="w-[72px] text-[13px] font-normal text-[#545454]"
          >
            비밀번호
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[34px] w-[213px] rounded-[6px] border border-[#D9D9D9] bg-[#F7F7F7] px-[12px] text-[12px] text-[#020913] outline-none placeholder:text-[#B3B3B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="signup-password-confirm"
            className="w-[72px] text-[13px] font-normal text-[#545454]"
          >
            비밀번호 확인
          </label>
          <input
            id="signup-password-confirm"
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="h-[34px] w-[213px] rounded-[6px] border border-[#D9D9D9] bg-[#F7F7F7] px-[12px] text-[12px] text-[#020913] outline-none placeholder:text-[#B3B3B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="signup-name"
            className="w-[72px] text-[13px] font-normal text-[#545454]"
          >
            이름
          </label>
          <input
            id="signup-name"
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-[34px] w-[213px] rounded-[6px] border border-[#D9D9D9] bg-[#F7F7F7] px-[12px] text-[12px] text-[#020913] outline-none placeholder:text-[#B3B3B3] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="signup-department"
            className="w-[72px] text-[13px] font-normal text-[#545454]"
          >
            학과
          </label>
          <input
            id="signup-department"
            type="text"
            placeholder="학과 검색"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-[34px] w-[213px] rounded-[6px] border border-[#D9D9D9] bg-[#F7F7F7] px-[12px] text-center text-[12px] text-[#020913] outline-none placeholder:text-[#707070] focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="signup-role"
            className="w-[72px] text-[13px] font-normal text-[#545454]"
          >
            접속권한
          </label>
          <select
            id="signup-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-[34px] w-[213px] rounded-[6px] border border-[#D9D9D9] bg-[#F7F7F7] px-[12px] text-[12px] text-[#707070] outline-none focus:ring-0 focus:outline-none"
          >
            <option value="">접속권한을 선택해주세요</option>
            <option value="user">이용자</option>
            <option value="admin">관리자</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="signup-phone"
            className="w-[72px] text-[13px] font-normal text-[#545454]"
          >
            전화번호
          </label>
          <input
            id="signup-phone"
            type="text"
            placeholder="전화번호를 입력하세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-[34px] w-[213px] rounded-[6px] border border-[#D9D9D9] bg-[#F7F7F7] px-[12px] text-[12px] text-[#020913] outline-none placeholder:text-[#B3B3B3] focus:ring-0 focus:outline-none"
          />
        </div>
      </section>

      <button
        type="button"
        onClick={handleSignup}
        className="mt-[38px] flex h-[45px] w-full items-center justify-center rounded-[10px] bg-[#838383] text-[15px] font-normal text-white outline-none focus:ring-0 focus:outline-none"
      >
        가입 완료 →
      </button>
    </main>
  );
}

export default Signup;
