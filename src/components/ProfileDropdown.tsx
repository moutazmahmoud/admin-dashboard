import { useAuthStore } from "@/store/useAuthStore";
import { ChevronDown } from "lucide-react";

const ProfileDropdown = () => {
  const { user } = useAuthStore();
  console.log("user:", user);
  return (
    <div className="dropdown dropdown-end flex items-center gap-1">
      <div className="h-3 w-3 rounded-full overflow-hidden">
        <img src="https://i.pravatar.cc/300" alt="User avatar" />
      </div>
      <div className="flex flex-col">
        {user && <span>{user.displayName}</span>}
        <span>Admin</span>
      </div>

      <button className="w-[1.125rem] h-[1.125rem] btn p-0 min-h-[1.125rem]">
        <ChevronDown className="h-0.5 w-0.5 relative" />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-[1] mt-12 w-52 bg-base-100 p-0.5 shadow"
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
