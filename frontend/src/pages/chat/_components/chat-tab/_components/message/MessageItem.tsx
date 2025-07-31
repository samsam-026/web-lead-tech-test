import type { Message } from "../../../../../../models/message";


type MessageProps = {
  message: Message;
  currentUserId?: number;
};

const MessageItem = ({ message, currentUserId }: MessageProps) => {
  return (
    <div className={`w-max max-w-80 wrap-break-word rounded-lg p-2 my-1 text-sm ${message.senderId === currentUserId ?  "ms-auto bg-[#fadbe1] rounded-br-none": "me-auto bg-slate-100 rounded-bl-none"}`}>
      {message.content}
    </div>
  );
};

export default MessageItem;
