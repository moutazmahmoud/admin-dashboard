import { useAuthStore } from "@/store/useAuthStore";
import { ChevronDown } from "lucide-react";

const ProfileDropdown = () => {
  const { user } = useAuthStore();
  return (
    <div className="dropdown dropdown-end flex items-center gap-4">
      <div className="h-12 w-12 rounded-full overflow-hidden">
        <img src="https://i.pravatar.cc/300" alt="User avatar" />
      </div>
      <div className="flex flex-col">
        {user && <span>{user.displayName}</span>}
        <span>Admin</span>
      </div>

      <button className="w-[1.125rem] h-[1.125rem] btn p-0 min-h-[1.125rem]">
        <ChevronDown className="h-2 w-2 relative" />
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
