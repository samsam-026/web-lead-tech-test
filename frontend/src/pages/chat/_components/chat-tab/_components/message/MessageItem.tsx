import type { Message } from 'models/message';

type MessageProps = {
  message: Message;
  currentUserId?: number;
  addExtraSpace?: boolean;
};

const MessageItem = ({ message, currentUserId, addExtraSpace }: MessageProps) => {
  return (
    <div
      className={`mt-1 w-max max-w-80 rounded-lg p-2 text-sm wrap-break-word ${addExtraSpace ? 'mt-4' : ''} ${message.senderId === currentUserId ? 'ms-auto rounded-br-none bg-[#fadbe1]' : 'me-auto rounded-bl-none bg-slate-100'}`}
    >
      {message.content}
    </div>
  );
};

export default MessageItem;
