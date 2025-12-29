import { useAuthStore } from "@/store/useAuthStore";
import { ChevronDown } from "lucide-react";
import ProfileImg from "@/assets/images/empty-avatar.jpg";

interface ProfileDropdownProps {
  onOpenProfileModal?: () => void;
}

const ProfileDropdown = ({ onOpenProfileModal }: ProfileDropdownProps) => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="dropdown-end dropdown flex items-center gap-4" onClick={onOpenProfileModal}>
      <div className="h-11 w-11 overflow-hidden rounded-full">
        <img src={ProfileImg} alt="User avatar" />

      </div>
      <div className="flex flex-col">
        {user && <span className="font-bold text-sm">{user.displayName}</span>}
        <span className="font-semibold text-xs">Admin</span>
      </div>

      <button className="btn h-6 w-6 p-0 rounded-full min-h-6">
        <ChevronDown className="relative h-4 w-4" />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-[1] mt-48 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a>Profile</a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};
export default ProfileDropdown;
