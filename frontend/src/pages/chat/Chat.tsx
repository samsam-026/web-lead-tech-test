import { useState } from 'react';

import Tabs from 'components/tabs/Tabs';

import { API_CONFIG } from 'config/env';

import { useSocket } from 'hooks/useSocket';

import ChatTab from './_components/chat-tab/ChatTab';
import Header from './_components/header/Header';
import ProfileTab from './_components/profile-tab/ProfileTab';
import { CHAT_TABS, type TabId } from './constants';

const Chat = () => {
  const [activeTab, setActiveTab] = useState<TabId>('chat');
  const socket = useSocket(API_CONFIG.SOCKET_URL);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div>
        <Header socket={socket} />
        <Tabs tabs={CHAT_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      {activeTab === 'chat' && <ChatTab socket={socket} />}
      {activeTab === 'profile' && <ProfileTab />}
    </div>
  );
};

export default Chat;
