export type TabId = 'chat' | 'profile';

export type Tab = {
  id: TabId;
  label: string;
};

export const CHAT_TABS: Tab[] = [
  { id: 'chat', label: 'Chat' },
  { id: 'profile', label: 'Profile' }
] as const;
