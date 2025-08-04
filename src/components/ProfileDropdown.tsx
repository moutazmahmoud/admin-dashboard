import { useAuthStore } from "@/store/useAuthStore";

const ProfileDropdown = () => {
  const { user } = useAuthStore();
  console.log("user:", user);
  return (
    <div className="dropdown-end dropdown">
      <button className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <img src="https://i.pravatar.cc/300" alt="User avatar" />
        </div>
      </button>
      {user && <span>{user.displayName}</span>}
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
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
