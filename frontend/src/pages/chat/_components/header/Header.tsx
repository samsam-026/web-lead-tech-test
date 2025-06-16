import { ChevronLeft, Ellipsis } from "lucide-react";
import UserCard from "../../../../components/user-card/UserCard.tsx";
import usePageStore from "../../../../store/page.store.ts";
import useUserStore from "../../../../store/user.store.ts";

const Header = () => {
  const setCurrentPage = usePageStore((state) => state.setCurrentPage);
  const currentRecipient = useUserStore((state) => state.currentRecipient);
  const currentUser = useUserStore((state) => state.currentUser);

  if (!currentRecipient || !currentUser) {
    return null;
  }

  return (
    <div className="flex justify-between p-[20px]">
      <ChevronLeft
        onClick={() => setCurrentPage("home")}
        className="cursor-pointer"
      />
      <UserCard user={currentRecipient} />
      {/* Doesn't need to do anything */}
      <Ellipsis className="cursor-pointer" />
    </div>
  );
};

export default Header;
