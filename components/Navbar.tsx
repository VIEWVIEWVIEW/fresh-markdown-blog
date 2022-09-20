export const MenuEntries = [
  {
    name: "Latest",
    href: "/",
  },
  {
    name: "Archive",
    href: "/archive",
  },
  {
    name: "About",
    href: "/about",
  }
]

export function Navbar() {
  return <>
    <nav class="flex flex-row py-6 justify-around items-baseline ">
      {/* logo */}
      <a href='/' class="text-xl tracking-normal font-serif ">random blog</a>

      {/* menu entries */}
      <div class=" gap-x-2 ">
        {MenuEntries.map((entry) => <a href={entry.href} class="text-sm hover:text-gray-600 mr-4">{entry.name}</a>)}
      </div>
    </nav>
  </>
}