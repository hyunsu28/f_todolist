import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Main from "./pages/Main";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { auth } from "./firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/modules/userSlice";

function App() {
  const dispatch = useDispatch();

  // 유저 정보 불러오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        try {
          dispatch(setUser({ email: user.email, id: user.uid }));
        } catch (error) {
          console.log("사용자 정보를 가져오는 데 실패했습니다.\n", error);
        }
      } else {
        dispatch(setUser({ email: null, id: null }));
        // 로그인되지 않은 상태면 null로 설정
      }
    });
    return () => unsubscribe(); // 컴포넌트 언마운트 시 이벤트 구독 해제
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/main" element={<Main />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
export default App;
