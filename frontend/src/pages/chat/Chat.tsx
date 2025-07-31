import { useState } from 'react';

import Tabs from 'components/tabs/Tabs';

import { useSocket } from 'hooks/useSocket';

import ChatTab from './_components/chat-tab/ChatTab';
import Header from './_components/header/Header';
import ProfileTab from './_components/profile-tab/ProfileTab';

type TabId = 'chat' | 'profile';

const tabs = [
  { id: 'chat' as const, label: 'Chat' },
  { id: 'profile' as const, label: 'Profile' }
] as const;

const Chat = () => {
  const [activeTab, setActiveTab] = useState<TabId>('chat');
  const socket = useSocket('http://localhost:3001');

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
