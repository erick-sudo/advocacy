import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { images } from "../../assets/images/images";

export function DashNavBar({ currentPage = "Dashboard" }) {
  const { userInfo, setUserInfo } = useContext(AuthContext);

  return (
    <div className="top-0 text-sm sticky z-50 flex p-2">
      <div className="flex-grow flex items-center gap-4">
        <h4 className="text-xl text-amber-800 dancing italic">Kitonga Advocates</h4>
        <div className="flex-grow text-center text-2xl dancing">{currentPage}</div>
      </div>
      <div className="group relative px-4 pb-2 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <span className="text-amber-800">Welcome</span>
            <span>{userInfo.name}</span>
          </div>
          <div className="h-10 w-10 border rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={images.hammer}
              alt=""
            />
          </div>
        </div>
        <div className="hidden shadow shadow-black font-bold group-hover:block gap-2 absolute top-[100%] right-4 bg-white">
          <button className="w-full hover:bg-amber-700 hover:text-white duration-200 text-start px-4 py-4">Profile</button>
          <button className="w-full hover:bg-amber-700 hover:text-white duration-200 text-start px-4 py-4">Settings</button>
          <hr></hr>
          <button
            onClick={() => {
              setUserInfo(null);
              sessionStorage.clear();
            }}
            className={`w-full hover:bg-amber-700 hover:text-white duration-200 text-start px-4 py-4`}
          >
            <span className="relative">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}