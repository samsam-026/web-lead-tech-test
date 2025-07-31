import { useEffect, useState } from "react";
import useMessagesStore from "../../../../store/messages.store.ts";
import useUserStore from "../../../../store/user.store.ts";
import MessageItem from "./_components/message/MessageItem.tsx";
import Button from "../../../../components/button/Button.tsx";

const ChatTab = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { messages, isLoading, error, getMessages, createMessage } = useMessagesStore();
  const currentUser = useUserStore((state) => state.currentUser);
  const currentRecipient = useUserStore((state) => state.currentRecipient);


  useEffect(() => {
    getMessages(currentUser.id, currentRecipient?.id || 0);
  }, [currentUser, currentRecipient, getMessages]);

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentRecipient || !currentMessage.trim()) return;

    await createMessage({
      senderId: currentUser.id,
      recipientId: currentRecipient.id,
      content: currentMessage.trim(),
    });
    setCurrentMessage("");
     
  };

  return (
    < >
      <div className="flex flex-col grow p-[10px] overflow-auto">
        {isLoading ? <div className="text-center py-5">Loading...</div>: null}
        {error ? <div className="bg-red-50 text-center py-5">{error}</div>: null}
        {!isLoading && !error && messages.length > 0 ? messages.map((message) => (
          <div key={message.timestamp}>
            <MessageItem
              message={message}
              currentUserId={currentUser.id}
              key={message.id}
            />
          </div>
        )): null}
      </div>
      <div className="flex-none flex-col flex p-[10px] bg-white shadow-[0_-10px_10px_rgba(0,0,0,0.05)]">
        <form onSubmit={(e) => handleMessageSend(e)} className="flex"> 
          <textarea
          rows={1}
          style={{ resize: "none" }}
            placeholder={`Message ${currentRecipient?.name || ""}`}
            className="flex-1 rounded-md border-1 border-[#cfcfcf] p-2 me-1"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <Button buttonType="submit">
            Send
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChatTab;
