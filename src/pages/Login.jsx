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
    <main>
      <h1>Believe ADMIN</h1>

      <section>
        <h2>아이디</h2>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
      </section>

      <section>
        <h2>비밀번호</h2>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </section>

      <button type="button" onClick={handleLogin}>
        로그인
      </button>

      <button type="button" onClick={() => navigate("/signup")}>
        회원가입
      </button>
    </main>
  );
}

export default Login;
