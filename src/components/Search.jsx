import Fuse from "fuse.js";
import { useState } from "react";

const options = {
  keys: ["data.title", "data.description", "data.slug"],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.3,
  isCaseSensitive: false,
};

function Search({ searchList }) {
  // User's input
  const [query, setQuery] = useState("");

  const fuse = new Fuse(searchList, options);

  // Set a limit to the posts: 5
  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  return (
    <div className="mt-8">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-zinc-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleOnSearch}
          className="w-full h-10 px-3 text-sm outline-none border border-dashed rounded-md focus:border-solid focus:ring-0 focus:border-black dark:focus:borders-white border-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:placeholder-neutral-400 dark:text-white hover:border-neutral-800 dark:hover:border-neutral-100 duration-200"
          placeholder="Search for blog posts..."
        />
      </div>
      {query.length > 1 && (
        <div className="my-4">
          Found {posts.length} {posts.length === 1 ? "result" : "results"} for "
          {query}"
        </div>
      )}
      <ul className="mt-6 grid grid-cols-1 gap-6">
        {posts.map((data) => (
          <li
            class="
            
            lg:flex-row lg:items-baseline lg:justify-between
            border-b border-spacing-y-2 border-zinc-300 dark:border-zinc-800 pb-4
          "
          >
            <a
              href={`/post/${data.slug}/`}
              class="relative group flex flex-col sm:flex-row gap-0.5"
            >
              <div class="flex flex-col">
                <p class="mb-1 font-semibold dark:text-zinc-300 text-zinc-950 group-hover:text-zinc-400 dark:group-hover:text-green transition-colors">
                  {data.data.title}
                </p>

                <p class="leading-relaxed max-w-prose">{data.data.description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;