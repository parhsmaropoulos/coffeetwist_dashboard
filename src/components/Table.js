import React, { Component } from "react";
import { put_request } from "../actions/lib";
import "../css/slider.css";

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
  }

  changeIngrdientAvailability = (id) => {
    console.log(`Change availability of ${id}`);
  };

  async changeAvailability(id, type) {
    if (type === "product") {
      const res = await put_request(`/products/${id}/change_availability`);
    } else {
    }
  }
  changeProductAvailability = (id) => {
    console.log(`Change availability of ${id}`);
  };

  render() {
    const page = this.props.page;
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
                    selectedCategory={this.props.selectedCategory}
                    changeAvailability={(id) =>
                      this.changeProductAvailability(id)
                    }
                  />
                ) : (
                  <IngredientsTable
                    ingredients={this.state.ingredients}
                    selectedCategory={this.props.selectedCategory}
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
      {products.length > 0
        ? products.map((i, idx) => {
            if (i.category_id === selectedCategory.ID) {
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
      {ingredients.length > 0
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
            }
          })
        : null}
    </>
  );
};
