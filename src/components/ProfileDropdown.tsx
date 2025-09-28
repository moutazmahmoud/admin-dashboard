import { useAuthStore } from "@/store/useAuthStore";
import { ChevronDown } from "lucide-react";
import ProfileImg from "@/assets/images/empty-avatar.jpg";

const ProfileDropdown = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="dropdown-end dropdown flex items-center gap-4">
      <div className="h-12 w-12 overflow-hidden rounded-full">
        <img src={ProfileImg} alt="User avatar" />

      </div>
      <div className="flex flex-col">
        {user && <span>{user.displayName}</span>}
        <span>Admin</span>
      </div>

      <button className="btn h-[1.125rem] min-h-[1.125rem] w-[1.125rem] p-0">
        <ChevronDown className="relative h-2 w-2" />
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
