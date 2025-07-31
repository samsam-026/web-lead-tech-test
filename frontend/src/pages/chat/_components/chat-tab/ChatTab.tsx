import { useEffect, useMemo, useRef, useState } from 'react';
import useMessagesStore from '../../../../store/messages.store.ts';
import useUserStore from '../../../../store/user.store.ts';
import MessageItem from './_components/message/MessageItem.tsx';
import Button from '../../../../components/button/Button.tsx';
import MessageDivider from './_components/message-divider/MessageDivider.tsx';
import { useGroupedMessages } from '../../../../hooks/useGroupedMessages.ts';
import { Socket } from 'socket.io-client';
import type { Message } from '../../../../models/message.ts';

type ChatTabProps = {
  socket: Socket | null;
};

const ChatTab = ({ socket }: ChatTabProps) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const { messages, isLoading, error, getMessages, createMessage, addMessage } = useMessagesStore();
  const currentUser = useUserStore(state => state.currentUser);
  const currentRecipient = useUserStore(state => state.currentRecipient);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Memoize participantIds to prevent unnecessary re-renders
  const participantIds = useMemo(
    () => [currentUser.id, currentRecipient?.id || 0].sort((a, b) => a - b),
    [currentUser.id, currentRecipient?.id]
  );

  useEffect(() => {
    getMessages(currentUser.id, currentRecipient?.id || 0);
    messageContainerRef.current?.scrollTo({ top: messageContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [currentUser, currentRecipient, getMessages]);

  useEffect(() => {
    if (!socket || isSocketConnected) return;

    const handleConnect = () => {
      setIsSocketConnected(true);
      socket.emit('start_chat', participantIds);
    };

    const handleDisconnect = () => {
      socket.emit('end_chat', participantIds);
    };

    const handleReceiveMessage = (message: Message) => {
      addMessage(message);
      messageContainerRef.current?.scrollTo({ top: messageContainerRef.current.scrollHeight, behavior: 'smooth' });
    };

    // Add event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('receive_message', handleReceiveMessage);

    // Connect socket
    socket.connect();

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [addMessage, participantIds, socket]);

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentRecipient || !currentMessage.trim()) return;

    const newMessage = await createMessage({
      senderId: currentUser.id,
      recipientId: currentRecipient.id,
      content: currentMessage.trim()
    });
    socket?.emit('send_message', participantIds, newMessage);
    setCurrentMessage('');
    messageContainerRef.current?.scrollTo({ top: messageContainerRef.current.scrollHeight, behavior: 'smooth' });
  };

  const groupedMessages = useGroupedMessages(messages);

  return (
    <>
      <div className="flex flex-1 flex-col overflow-y-auto p-[10px]" ref={messageContainerRef}>
        {isLoading ? <div className="py-5 text-center">Loading...</div> : null}
        {error ? <div className="bg-red-50 py-5 text-center">{error}</div> : null}
        {!isLoading && !error && groupedMessages.length > 0
          ? groupedMessages.map(item => {
              if (item.type === 'divider') {
                return <MessageDivider key={item.timestamp} timestamp={item.timestamp} />;
              }
              return (
                <MessageItem
                  key={item.message.id}
                  message={item.message}
                  currentUserId={currentUser.id}
                  addExtraSpace={item.addExtraSpace}
                />
              );
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
