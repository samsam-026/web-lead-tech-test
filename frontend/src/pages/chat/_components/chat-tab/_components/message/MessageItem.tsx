import type { Message } from "../../../../../../store/messages.store.ts";

type MessageProps = {
  message: Message;
};

const MessageItem = ({ message }: MessageProps) => {
  return (
    <div className="rounded-lg px-[10px] py-[4px] text-sm bg-amber-50 m-[8px]">
      {message.content}
    </div>
  );
};

export default MessageItem;
