import { ChevronLeft, Ellipsis } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Socket } from 'socket.io-client';

import UserCard from 'components/user-card/UserCard';

import useUserStore from 'store/user.store';

type HeaderProps = {
  socket: Socket | null;
};

const Header = ({ socket }: HeaderProps) => {
  const currentRecipient = useUserStore(state => state.currentRecipient);
  const currentUser = useUserStore(state => state.currentUser);
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    socket?.disconnect();
    navigate('/');
  }, [navigate, socket]);

  // Handle case where currentRecipient or currentUser is not set
  // This can happen if the user navigates directly to the chat page without selecting a recipient
  useEffect(() => {
    if (!currentRecipient || !currentUser) {
      goHome();
    }
  }, [currentRecipient, currentUser, goHome]);

  if (!currentRecipient || !currentUser) {
    return null;
  }

  return (
    <div className="flex justify-between p-[20px]">
      <ChevronLeft onClick={() => goHome()} className="cursor-pointer" />
      <UserCard user={currentRecipient} />
      {/* Doesn't need to do anything */}
      <Ellipsis className="cursor-pointer" />
    </div>
  );
};

export default Header;
