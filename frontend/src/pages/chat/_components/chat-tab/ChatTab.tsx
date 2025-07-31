import { useEffect, useState } from 'react';
import useMessagesStore from '../../../../store/messages.store.ts';
import useUserStore from '../../../../store/user.store.ts';
import MessageItem from './_components/message/MessageItem.tsx';
import Button from '../../../../components/button/Button.tsx';
import MessageDivider from './_components/message-divider/MessageDivider.tsx';
import { useGroupedMessages } from '../../../../hooks/useGroupedMessages.ts';

const ChatTab = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const { messages, isLoading, error, getMessages, createMessage } = useMessagesStore();
  const currentUser = useUserStore(state => state.currentUser);
  const currentRecipient = useUserStore(state => state.currentRecipient);

  useEffect(() => {
    getMessages(currentUser.id, currentRecipient?.id || 0);
  }, [currentUser, currentRecipient, getMessages]);

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentRecipient || !currentMessage.trim()) return;

    await createMessage({
      senderId: currentUser.id,
      recipientId: currentRecipient.id,
      content: currentMessage.trim()
    });
    setCurrentMessage('');
  };

  const groupedMessages = useGroupedMessages(messages);

  return (
    <>
      <div className="flex grow flex-col overflow-auto p-[10px]">
        {isLoading ? <div className="py-5 text-center">Loading...</div> : null}
        {error ? <div className="bg-red-50 py-5 text-center">{error}</div> : null}
        {!isLoading && !error && groupedMessages.length > 0
          ? groupedMessages.map(item => {
              if (item.type === 'divider') {
                return <MessageDivider key={item.timestamp} timestamp={item.timestamp} />;
              }
              return <MessageItem key={item.message.id} message={item.message} currentUserId={currentUser.id} />;
            })
          : null}
      </div>
      <div className="flex flex-none flex-col bg-white p-[10px] shadow-[0_-10px_10px_rgba(0,0,0,0.05)]">
        <form onSubmit={e => handleMessageSend(e)} className="flex">
          <textarea
            rows={1}
            style={{ resize: 'none' }}
            placeholder={`Message ${currentRecipient?.name || ''}`}
            className="me-1 flex-1 rounded-md border-1 border-[#cfcfcf] p-2"
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
          />
          <Button buttonType="submit">Send</Button>
        </form>
      </div>
    </>
  );
};

export default ChatTab;
