import { useState } from "react";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("EN");

  return (
    <div className="dropdown-end dropdown">
      <button tabIndex={0} className="btn-ghost btn-circle btn">
        {language}
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-[1] w-24 bg-base-100 p-2 shadow"
      >
        <li onClick={() => setLanguage("EN")}>
          <a>EN</a>
        </li>
        <li onClick={() => setLanguage("AR")}>
          <a>AR</a>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSelector;
