import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Button from 'components/button/Button';
import UserCard from 'components/user-card/UserCard';

import type { User } from 'models/user';

import useUserStore from 'store/user.store';

const UserList = () => {
  const { currentUser, setCurrentRecipient, setCurrentUser } = useUserStore();
  const navigate = useNavigate();

  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => fetch('/api/user/all.json').then(res => res.json())
  });

  const switchUser = (userId: number) => {
    const user = users?.find(user => user.id === userId);
    if (user) {
      setCurrentUser(user);
      setCurrentRecipient(null);
    }
  };

  const messageUser = (userId: number) => {
    const user = users?.find(user => user.id === userId);
    if (user) {
      setCurrentRecipient(user);
      navigate('/chat');
    }
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1">
        <h2 className="mb-4 text-lg font-semibold">Select Current User</h2>
        <div className="flex flex-col gap-2.5">
          {users?.map(user => (
            <div className="flex items-center" key={user.id}>
              <UserCard user={user} />
              <div className="ml-auto">
                <Button onClick={() => switchUser(user.id)} disabled={user.id === currentUser.id}>
                  {user.id === currentUser.id ? 'Current User' : 'Switch to'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="mb-4 text-lg font-semibold">Message Someone</h2>
        <div className="flex flex-col gap-2.5">
          {users?.map(user => (
            <div className="flex items-center" key={user.id}>
              <UserCard user={user} />
              <div className="ml-auto">
                <Button onClick={() => messageUser(user.id)} disabled={user.id === currentUser.id}>
                  Message
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
