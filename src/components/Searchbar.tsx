import SearchIcon from "../assets/icons/search.svg?react";

const Searchbar = () => {
  return (
    <label className="relative w-[20rem] rounded-[1.25rem] border-[1px] border-solid border-[#D5D5D5] bg-[#F5F6FA] p-3">
      <input
        type="text"
        id="search-input"
        placeholder="Search..."
        className="absolute inset-0 bg-transparent pl-10 pr-4"
      />
      <SearchIcon className="h-4 w-4" />
    </label>
  );
};

export default Searchbar;
