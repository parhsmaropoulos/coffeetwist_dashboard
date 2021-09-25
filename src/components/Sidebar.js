import React, { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen, onTabChange }) {
  const location = useLocation();
  const { pathname } = location;
  let page = pathname.split("/")[1];
  if (page === "create") {
    page = pathname;
  }
  const sidebar = useRef(null);

  function tabChange(pathname) {
    onTabChange(pathname);
  }

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Logo */}
          <NavLink to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            Παραγγελίες
          </h3>
          <ul className="mt-3">
            {/**Incomings */}
            <Incomings
              key={"inc"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
            <GettingReady
              key={"gtrdy"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
            <Completed
              key={"cmplt"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
          </ul>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            Κατάστημα
          </h3>
          <ul className="mt-3">
            <Products
              key={"prods"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
            <Ingredients
              key={"ingrs"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
            <Settings
              key={"stngs"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
          </ul>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            Δημιουργία
          </h3>
          <ul className="mt-3">
            <CreateProduct
              key={"crtprd"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
            <CreateCategory
              key={"crtctg"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
            <CreateIngredient
              key={"crtingr"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
            <CreateChoice
              key={"crtchc"}
              page={page}
              onTabChange={(pathname) => tabChange(pathname)}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

const Incomings = ({ page, onTabChange }) => {
  return (
    <li
      key={1}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "incoming" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/incoming"
        onClick={() => onTabChange("incoming")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "incomings" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Εισερχόμενες</span>
        </div>
      </NavLink>
    </li>
  );
};

const GettingReady = ({ page, onTabChange }) => {
  return (
    <li
      key={2}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "getting_ready" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/getting_ready"
        onClick={() => onTabChange("getting_ready")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "getting_ready" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Ετοιμάζονται</span>
        </div>
      </NavLink>
    </li>
  );
};
const Completed = ({ page, onTabChange }) => {
  return (
    <li
      key={3}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "completed" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/completed"
        onClick={() => onTabChange("completed")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "completed" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Ολοκληρωμένες</span>
        </div>
      </NavLink>
    </li>
  );
};

const Products = ({ page, onTabChange }) => {
  return (
    <li
      key={4}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "products" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/products"
        onClick={() => onTabChange("products")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "products" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Προϊόντα</span>
        </div>
      </NavLink>
    </li>
  );
};

const Ingredients = ({ page, onTabChange }) => {
  return (
    <li
      key={5}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "ingredients" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/ingredients"
        onClick={() => onTabChange("ingredients")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "ingredients" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Υλικά</span>
        </div>
      </NavLink>
    </li>
  );
};
const Settings = ({ page, onTabChange }) => {
  return (
    <li
      key={6}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "settings" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/settings"
        onClick={() => onTabChange("settings")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "settings" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Ρυθμίσεις</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;

const CreateProduct = ({ page, onTabChange }) => {
  return (
    <li
      key={7}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "/create/product" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/create/product"
        onClick={() => onTabChange("create/product")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "/create/product" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Προϊόν</span>
        </div>
      </NavLink>
    </li>
  );
};

const CreateCategory = ({ page, onTabChange }) => {
  return (
    <li
      key={8}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "/create/category" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/create/category"
        onClick={() => onTabChange("create/category")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "/create/category" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Κατηγορία</span>
        </div>
      </NavLink>
    </li>
  );
};

const CreateIngredient = ({ page, onTabChange }) => {
  return (
    <li
      key={9}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "/create/ingredient" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/create/ingredient"
        onClick={() => onTabChange("create/ingredient")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "/create/ingredient" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Υλικό</span>
        </div>
      </NavLink>
    </li>
  );
};

const CreateChoice = ({ page, onTabChange }) => {
  return (
    <li
      key={10}
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        page === "/create/choice" && "bg-gray-900"
      }`}
    >
      <NavLink
        // exact
        to="/create/choice"
        onClick={() => onTabChange("create/choice")}
        className={`block text-gray-200 hover:text-white transition duration-150 ${
          page === "/create/choice" && "hover:text-gray-200"
        }`}
      >
        <div className="flex flex-grow">
          <span className="text-sm font-medium"> Επιλογή</span>
        </div>
      </NavLink>
    </li>
  );
};
