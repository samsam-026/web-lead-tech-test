import type { User } from 'models/user';

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <img className="h-auto w-10 rounded-full" src={user.profile} alt={user.name} />
      <div className="font-semibold">{user.name}</div>
    </div>
  );
};

export default UserCard;
