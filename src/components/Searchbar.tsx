import SearchIcon from "../assets/icons/search.svg?react";

const Searchbar = () => {
  return (
    <label className="relative border-[1px] border-solid border-[#D5D5D5] w-[20rem] p-0.75 bg-[#F5F6FA] rounded-[1.25rem]">
      <input
        type="text"
        id="search-input"
        placeholder="Search..."
        className="absolute inset-0 pl-2.5 pr-1 bg-transparent"
      />
      <SearchIcon className="w-1 h-1" />
    </label>
  );
};

export default Searchbar;
