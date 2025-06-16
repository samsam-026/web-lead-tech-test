import useUserStore from "../../store/user.store.ts";
import UserCard from "../../components/user-card/UserCard.tsx";
import Logo from "../../assets/logo.svg";
import UserList from "./user-list/UserList.tsx";

const Home = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  return (
    <div className="flex flex-col h-full">
      <div className="text-center py-8 px-4 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
        <div className="flex flex-col items-center gap-3">
          <img src={Logo} alt="Logo" className="w-[150px] drop-shadow-sm" />
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Muzz</h1>
          <p className="text-gray-600 max-w-md">Connect and chat with your friends in a simple and elegant way.</p>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <UserCard user={currentUser} />
            <div className="text-sm text-gray-500">Currently logged in as</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default Home;
