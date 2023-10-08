import "./App.css";
import { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "./components/hooks/useSession";
import { AuthContext } from "./components/context/AuthContext";
import { Login } from "./components/account/Login";
import { Expired } from "./components/common/Expired";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [handleSession] = useSession();
  const { userInfo, setUserInfo, expiredLogin, setExpiredLogin } = useContext(AuthContext);

  useEffect(() => {
    handleSession();

    const interval = setInterval(() => {
      handleSession();
    }, 360000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setUserInfo(handleSession());
  }, [pathname]);

  return (
    <div>
      {userInfo && expiredLogin && (
        <Expired
          onCancel={() => {
            navigate("/");
            setUserInfo(null);
            sessionStorage.clear();
            setExpiredLogin(false);
          }}
          onLogin={() => {
            setUserInfo(null);
            sessionStorage.clear();
            setExpiredLogin(false);
          }}
        />
      )}
      {userInfo ? (
        <div>
          <Routes>
            <Route path="" element={<div>Home Page</div>} />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
