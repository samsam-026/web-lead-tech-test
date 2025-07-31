import UserCard from 'components/user-card/UserCard';

import useUserStore from 'store/user.store';

const ProfileTab = () => {
  const { currentRecipient } = useUserStore();

  return (
    <div className="flex flex-col gap-4 py-7 text-center">
      {currentRecipient && <UserCard user={currentRecipient} />}
      <p>This tab is a placeholder - no improvements are needed.</p>
    </div>
  );
};

export default ProfileTab;
