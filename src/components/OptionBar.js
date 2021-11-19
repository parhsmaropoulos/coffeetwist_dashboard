import React, { Component } from "react";

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
    return (
      <div className="col-span-full h-auto xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">{title}</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            {page === "products" ? (
              <ProductsSidebar
                options={categories}
                onCategoryChange={(c, category) =>
                  this.props.onChangeCategory(c, category)
                }
              />
            ) : (
              <IngredientsSidebar
                options={categories}
                onCategoryChange={(c, category) =>
                  this.props.onChangeCategory(c, category)
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const IngredientsSidebar = ({ options, onCategoryChange }) => {
  const selectedCategory = sessionStorage.getItem("ingredientTab");
  return (
    <ul>
      {options
        ? options.map((o, idx) => {
            return (
              <li
                key={idx}
                onClick={() => onCategoryChange(o, "ingredients")}
                className={`px-2 py-2 text-center rounded-sm mb-0.5 last:mb-0 hover:bg-gray-600 ${
                  +selectedCategory === o && "bg-blue-300"
                } `}
              >
                <div className=" text-center flex-grow">
                  <span className="text-m font-medium"> {o}</span>
                </div>
              </li>
            );
          })
        : null}
    </ul>
  );
};
const ProductsSidebar = ({ options, onCategoryChange }) => {
  const selectedCategory = sessionStorage.getItem("productTab");
  return (
    <ul>
      {options
        ? options.map((o, idx) => {
            return (
              <li
                key={idx}
                onClick={() => onCategoryChange(o.ID, "products")}
                className={`px-2 py-2 text-center rounded-sm mb-0.5 last:mb-0 hover:bg-gray-600 ${
                  +selectedCategory === o.ID && "bg-gray-300"
                } `}
              >
                <div className=" text-center flex-grow">
                  <span className="text-m font-medium"> {o.name}</span>
                </div>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default OptionBar;
