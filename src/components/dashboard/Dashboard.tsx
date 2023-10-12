import { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { AuthContext } from "../context/AuthContext";
import { Login } from "../account/Login";
import { Expired } from "../common/Expired";
import { DashNavBar } from "./DashNavBar";
// import { Background } from "../common/DottedBackground";
import Cases from "./Cases";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import {
  faCalendar,
  faClose,
  faDashboard,
  faFolder,
  faRightFromBracket,
  faTasks,
  faUser,
  faUsers,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";

export function Dashboard() {
  const { pathname } = useLocation();
  const [showNavBar, setShowNavBar] = useState(false);
  const navigate = useNavigate();
  const [handleSession] = useSession();
  const { userInfo, setUserInfo, expiredLogin, setExpiredLogin, logout } =
    useContext(AuthContext);

  const tabs = [
    {
      label: "Dashboard",
      icon: faDashboard,
      link: "/dashboard",
    },
    {
      label: "Cases",
      icon: faFolder,
      link: "/dashboard/cases",
    },
    {
      label: "Clients",
      icon: faUser,
      link: "/dashboard/clients",
    },
    {
      label: "Hearings",
      icon: faCalendar,
      link: "/dashboard/hearings",
    },
    {
      label: "Tasks",
      icon: faTasks,
      link: "/dashboard/tasks",
    },
    {
      label: "Users",
      icon: faUsers,
      link: "/dashboard/users",
    },
    {
      label: "Groups",
      icon: faUsersCog,
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
      {/* <Background className="-z-10" background="rgba(229, 231, 235)" /> */}
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
            <div className="flex flex-col shadow">
              <div className="flex justify-end">
                {!showNavBar ? (
                  <button
                    onClick={() => setShowNavBar(true)}
                    className="bg-gray-100 h-10 w-10 shadow shadow-dark duration-300 hover:bg-amber-800 hover:text-white"
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowNavBar(false)}
                    className="bg-gray-100 h-8 w-8 shadow-md rounded-full shadow-black m-3 duration-300 hover:scale-125 hover:bg-amber-800 hover:text-white"
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                )}
              </div>

              <div className="flex flex-col">
                {tabs.map((tab, index) =>
                  !showNavBar ? (
                    <button
                      className={`h-10 border-b border-amber-800/50 ${
                        tab.link === pathname
                          ? "bg-amber-800 text-white"
                          : "bg-white text-amber-800"
                      }`}
                      key={index}
                      onClick={() => navigate(tab.link)}
                    >
                      <FontAwesomeIcon icon={tab.icon} />
                    </button>
                  ) : (
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
                  )
                )}
              </div>
              <div className="flex-grow"></div>
              {!showNavBar ? (
                <button onClick={logout} className="text-amber-800 h-10 duration-300 hover:bg-amber-800 hover:text-white">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              ) : (
                <div
                  onClick={logout}
                  className="text-start px-4 py-2 text-amber-800 m-2 shadow-md cursor-pointer rounded-sm shadow-amber-800 bg-gray-100 hover:bg-amber-800 hover:text-white hover:-translate-y-2 duration-300"
                >
                  Logout
                </div>
              )}
            </div>
            <div className="text-sm flex-grow relative">
              <div className="absolute inset-0 overflow-y-scroll">
                <Routes>
                  <Route path="" element={<div>Dashboard</div>} />
                  <Route path="cases" element={<Cases />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
