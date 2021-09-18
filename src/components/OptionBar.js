import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class OptionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      categories: [],
    };
  }
  componentDidMount() {}
  render() {
    const page = this.props.page;
    const categories =
      page === "products"
        ? this.props.categories
        : this.props.ingredientCategories;
    const title = "Κατηγορίες";
    const selectedCategory = this.props.selectedCategory;
    return (
      <div className="col-span-full h-auto xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">{title}</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <Sidebar
              page={page}
              options={categories}
              onCategoryChange={(c) => this.props.onChangeCategory(c)}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>
    );
  }
}

const Sidebar = ({ page, options, selectedCategory, onCategoryChange }) => {
  if (page === "products") {
    options = options.map(function (o) {
      return o["name"];
    });
  }
  return (
    <ul>
      {options
        ? options.map((o, idx) => {
            return (
              <Link
                exact
                to={`/${page}/${o}`}
                onClick={() => onCategoryChange(o)}
                className={`block w-full  text-black-200 hover:text-gray-400 transition duration-150 inline-block`}
              >
                <li
                  className={`px-2 py-2 text-center rounded-sm mb-0.5 last:mb-0 hover:bg-gray-600 ${
                    selectedCategory === o && "bg-blue-300"
                  } `}
                  key={idx}
                >
                  <div className=" text-center flex-grow">
                    <span className="text-m font-medium"> {o}</span>
                  </div>
                </li>
              </Link>
            );
          })
        : null}
    </ul>
  );
};
export default OptionBar;
