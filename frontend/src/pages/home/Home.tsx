import Logo from 'assets/logo.svg';

import UserCard from 'components/user-card/UserCard';

import useUserStore from 'store/user.store';

import UserList from './user-list/UserList';

const Home = () => {
  const currentUser = useUserStore(state => state.currentUser);
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-100 bg-gradient-to-b from-white to-gray-50 px-4 py-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src={Logo} alt="Logo" className="w-[150px] drop-shadow-sm" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Muzz</h1>
          <p className="max-w-md text-gray-600">Connect and chat with your friends in a simple and elegant way.</p>
        </div>
      </div>

      <div className="flex flex-grow flex-col gap-6 p-6">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-3">
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
