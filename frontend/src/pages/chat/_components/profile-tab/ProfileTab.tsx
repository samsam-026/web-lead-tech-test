import useUserStore from '../../../../store/user.store.ts';
import UserCard from '../../../../components/user-card/UserCard.tsx';

const ProfileTab = () => {
  const currentRecipient = useUserStore(state => state.currentRecipient);

  return (
    <div className="flex flex-col gap-4 py-7 text-center">
      {currentRecipient && <UserCard user={currentRecipient} />}
      <p>This tab is a placeholder - no improvements are needed.</p>
    </div>
  );
};

export default ProfileTab;
