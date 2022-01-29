import React, { Component } from "react";
import { put_request } from "../actions/lib";
import "../css/slider.css";
import ToastNotification from "./ToastNotification";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      products: [],
      ingredients: [],
    };
  }

  componentDidMount() {
    this.setState({
      products: this.props.products,
      ingredients: this.props.ingredients,
    });
    // console.log(this.props.products);
  }

  changeIngrdientAvailability = (id) => {
    this.changeAvailability(id, "ingredient");
  };

  changeProductAvailability = (id) => {
    this.changeAvailability(id, "product");
  };

  async changeAvailability(id, type) {
    if (type === "product") {
      const res = await put_request(`products/${id}/change_availability`);
      if (res && res.code === 200) {
        let newProduct = res.data;
        let newProducts = this.state.products;
        const index = newProducts.findIndex((p) => p.ID === newProduct.ID);
        if (index !== -1) {
          newProducts[index] = newProduct;
        }
        this.setState({
          products: newProducts,
        });
      }
    } else {
      const res = await put_request(`ingredients/${id}/change_availability`);
      if (res && res.code === 200) {
        let newIngredient = res.data;
        let newIngredients = this.state.ingredients;
        const index = newIngredients.findIndex(
          (p) => p.ID === newIngredient.ID
        );
        if (index !== -1) {
          newIngredients[index] = newIngredient;
        }
        this.setState({
          ingredients: newIngredients,
        });
      }
    }
  }

  render() {
    const page = this.props.page;
    const productCategoryId = sessionStorage.getItem("productTab");
    const ingredientsCategoryId = sessionStorage.getItem("ingredientTab");
    return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Προϊόντα</h2>
        </header>
        <div className="p-3">
          {/**Table*/}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/**table header */}
              <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
                <tr>
                  <th className="p-3">
                    <div className="font-semibold text-left">Όνομα</div>
                  </th>
                  <th className="p-3">
                    <div className="font-semibold text-center">Τιμή</div>
                  </th>
                  <th className="p-3">
                    <div className="font-semibold text-center">Διαθέσιμο</div>
                  </th>
                </tr>
              </thead>
              {/** Table body */}
              <tbody className="text-sm font-medium divide-y divide-gray-100">
                {page === "products" ? (
                  <ItemTable
                    products={this.state.products}
                    selectedCategory={+productCategoryId}
                    changeAvailability={(id) =>
                      this.changeProductAvailability(id)
                    }
                  />
                ) : (
                  <IngredientsTable
                    ingredients={this.state.ingredients}
                    selectedCategory={+ingredientsCategoryId}
                    changeAvailability={(id) =>
                      this.changeIngrdientAvailability(id)
                    }
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;

const ItemTable = ({ products, changeAvailability, selectedCategory }) => {
  return (
    <>
      {products
        ? products.map((i, idx) => {
            if (i.category_id === selectedCategory) {
              return (
                <tr key={idx}>
                  <td className="p-3">
                    <div className="text-left">{i.name}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-center text-green-500">
                      {i.price.toFixed(2)} €
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-center">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={i.available}
                          onChange={() => changeAvailability(i.ID)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })
        : null}
    </>
  );
};

const IngredientsTable = ({
  ingredients,
  changeAvailability,
  selectedCategory,
}) => {
  return (
    <>
      {ingredients
        ? ingredients.map((i, idx) => {
            if (i.category === selectedCategory) {
              return (
                <tr key={idx}>
                  <td className="p-3">
                    <div className="text-left">{i.name}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-center text-green-500">
                      {i.price.toFixed(2)} €
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-center">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={i.available}
                          onChange={() => changeAvailability(i.ID)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })
        : null}
    </>
  );
};
