import Header from './_components/header/Header.tsx';
import { useState } from 'react';
import ChatTab from './_components/chat-tab/ChatTab.tsx';
import ProfileTab from './_components/profile-tab/ProfileTab.tsx';
import Tabs from '../../components/tabs/Tabs.tsx';
import { io } from 'socket.io-client';

type TabId = 'chat' | 'profile';

const tabs = [
  { id: 'chat' as const, label: 'Chat' },
  { id: 'profile' as const, label: 'Profile' }
] as const;

const Chat = () => {
  const [activeTab, setActiveTab] = useState<TabId>('chat');

  const socket = io('http://localhost:3001', {
    autoConnect: false
  });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div>
        <Header socket={socket} />
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      {activeTab === 'chat' && <ChatTab socket={socket} />}
      {activeTab === 'profile' && <ProfileTab />}
    </div>
  );
};

export default Chat;
