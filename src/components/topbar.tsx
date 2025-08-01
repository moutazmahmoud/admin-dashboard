import Searchbar from "./Searchbar";
import LanguageSelector from "./languageSelector";
import NotificationsButton from "./NotificationsButton";
import ProfileDropdown from "./ProfileDropdown";

export default function TopBar() {
  return (
    <div className="flex w-full items-center justify-between bg-base-100 px-[1.875rem] py-[0.8125rem] shadow">
      <Searchbar />
      <div className="flex items-center gap-4">
        <LanguageSelector />
        <NotificationsButton />
        <ProfileDropdown />
      </div>
    </div>
  );
}
