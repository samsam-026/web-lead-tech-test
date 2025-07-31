import { format } from 'date-fns';

interface MessageDividerProps {
  timestamp: string;
}

const MessageDivider = ({ timestamp }: MessageDividerProps) => {
  const today = new Date();
  const isToday = new Date(timestamp).toDateString() === today.toDateString();
  const date = new Date(timestamp);
  const day = format(date, 'd MMM yyyy'); // Full day name (e.g., "Monday")
  const time = format(date, 'HH:mm'); // 24-hour format (e.g., "14:30")

  return (
    <div className="flex items-center justify-center py-4">
      <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
        {isToday ? 'Today' : day} {time}
      </div>
    </div>
  );
};

export default MessageDivider;
