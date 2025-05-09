import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className=" flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for any IP address or domain"
          className=" bg-white px-6 py-3 rounded-l-lg w-full md:w-[400px] lg:w-[450px] outline-none md:placeholder:text-[16px] placeholder:text-[12px]"
        />
        <button
          type="submit"
          className=" bg-black py-[17px] px-5 rounded-r-lg cursor-pointer"
        >
          <img src="/images/icon-arrow.svg" alt="" />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
