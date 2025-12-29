import Searchbar from "./Searchbar";
import LanguageSelector from "./LanguageSelector";
import NotificationsButton from "./NotificationsButton";
import ProfileDropdown from "./ProfileDropdown";
import { Menu } from "lucide-react";

interface TopbarProps {
  onToggleSidebar: () => void;
  onOpenProfileModal?: () => void;
}

export default function Topbar({  onToggleSidebar, onOpenProfileModal }: TopbarProps) {
  return (
    <div className="flex w-full items-center justify-between bg-base-100 px-[1.875rem] py-[0.8125rem] shadow">
      <div className="flex gap-6">
        <button onClick={onToggleSidebar} className="hover:text-primary transition-colors duration-200 ease-in-out">
          <Menu />
        </button>
        <Searchbar />
      </div>
      <div className="flex items-center gap-4">
        <LanguageSelector />
        <NotificationsButton />
        <ProfileDropdown onOpenProfileModal={onOpenProfileModal} />
      </div>
    </div>
  );
}
