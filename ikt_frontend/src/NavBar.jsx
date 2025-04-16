import { useState } from "react"
import { Link } from "react-router-dom";

export default function(){
   const [menuOpen,setMenuOpen] = useState(false);

    return(
        <>
<nav className=" bg-navbar dark:bg-navbar w-full fixed top-0 z-50">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="src\\assets\\IKTlogo.png" className="h-8 lg:h-12 md:h-10 sm:h-8 max-w-none" alt="FINKI questions Logo" />
    </Link>

    <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="inline-flex items-center text-sm text-gray-100 justify-center w-10 h-10 md:hidden hover:bg-gray-200  hover:text-gray-800 rounded-lg focus:outline-none"
    aria-controls="navbar-default"
    aria-expanded={menuOpen}
    >
      <span className="sr-only">Отвори главно мени</span>
      <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
    </button>

    <div
      className={`w-full md:block md:w-auto ${menuOpen ? "block" : "hidden"}`}
      id="navbar-default"
    >
      <ul
        className={` font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 w-full sm:max-w-[300px] ${menuOpen ? "flex justify-center bg-gray-100 text-green-800" : "flex color-pink items-center justify-center"}`}
      >
           <li>
          <Link to="/questionForm" className="block py-2 px-3 rounded-sm text-xl md:hover:text-white" aria-current="page">
            Постави прашање
          </Link>
        </li>
        <li>
          <Link to="/questions" className="block py-2 px-3 rounded-sm text-xl md:hover:text-white">
            Q&A
          </Link>
        </li>
        <li>
          <Link to="/contact" className="block py-2 px-3 rounded-sm text-xl md:hover:text-white">
            Контакт
          </Link>
        </li>
        {/* <li>
          <Link to="/informations" className="block py-2 px-3 rounded-sm text-xl md:hover:text-white">
            Информации
          </Link>
        </li> */}
        <li>
          <Link to="/aboutUs" className="block py-2 px-3 rounded-sm text-xl md:hover:text-white" aria-current="page">
            За нас
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}
