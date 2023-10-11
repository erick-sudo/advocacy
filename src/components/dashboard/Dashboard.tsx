import { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { AuthContext } from "../context/AuthContext";
import { Login } from "../account/Login";
import { Expired } from "../common/Expired";
import { DashNavBar } from "./DashNavBar";
import { Background } from "../common/DottedBackground";
import Cases from "./Cases";

export function Dashboard() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [handleSession] = useSession();
  const { userInfo, setUserInfo, expiredLogin, setExpiredLogin, logout } =
    useContext(AuthContext);

  const tabs = [
    {
      label: "Dashboard",
      icon: "",
      link: "/dashboard",
    },
    {
      label: "Cases",
      icon: "folder",
      link: "/dashboard/cases",
    },
    {
      label: "Clients",
      icon: "user",
      link: "/dashboard/clients",
    },
    {
      label: "Hearings",
      icon: "calendar",
      link: "/dashboard/hearings",
    },
    {
      label: "Tasks",
      icon: "tasks",
      link: "/dashboard/tasks",
    },
    {
      label: "Users",
      icon: "users",
      link: "/dashboard/users",
    },
    {
      label: "Groups",
      icon: "users-cog",
      link: "/dashboard/groups",
    },
  ];

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
    <div className="fixed inset-0 flex">
      <Background className="-z-10" background="rgba(229, 231, 235)" />
      {userInfo && expiredLogin && (
        <Expired
          onCancel={() => {
            navigate("/");
            logout();
          }}
          onLogin={logout}
        />
      )}
      {userInfo ? (
        <div className="flex-grow flex flex-col">
          <div>
            <DashNavBar
              currentPage={tabs.find((tab) => tab.link === pathname)?.label}
            />
          </div>
          <div className="flex-grow flex">
            <div className="flex flex-col">
              <div className="flex flex-col gap-[2px]">
                {tabs.map((tab, index) => (
                  <div
                    onClick={() => navigate(tab.link)}
                    key={index}
                    className={`cursor-pointer hover:rotate-12 duration-300 border-1 border-transparent hover:border-amber-800 ${
                      tab.link === pathname
                        ? "bg-amber-800 text-white"
                        : "bg-white text-amber-800"
                    } pl-4 pr-12 py-2 text-start shadow-md shadow-black/50 w-full`}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
              <div className="flex-grow"></div>
              <div
                onClick={logout}
                className="text-start px-4 py-2 text-amber-800 m-2 shadow-md cursor-pointer rounded-sm shadow-amber-800 bg-gray-100 hover:bg-amber-800 hover:text-white hover:-translate-y-2 duration-300"
              >
                Logout
              </div>
            </div>
            <div className="px-2 text-sm">
              <Routes>
                <Route path="" element={<div>Dashboard</div>} />
                <Route path="cases" element={<Cases />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
