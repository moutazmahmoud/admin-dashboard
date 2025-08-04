import NotificationIcon from "@/assets/icons/notification.svg?react";

const NotificationsButton = () => {
  return (
    <div className="dropdown-end dropdown">
      <button tabIndex={0} className="btn-ghost btn-circle btn">
        <NotificationIcon />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a>New user registered</a>
        </li>
        <li>
          <a>System update available</a>
        </li>
      </ul>
    </div>
  );
};

export default NotificationsButton;
