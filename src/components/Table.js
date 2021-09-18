import React, { Component } from "react";
import "../css/slider.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      items: [],
    };
  }

  componentDidMount() {
    this.setState({
      items: this.props.items,
    });
  }

  changeAvailability = (id) => {
    console.log(`Change availability of ${id}`);
  };

  render() {
    return (
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Products</h2>
        </header>
        <div className="p-3">
          {/**Table*/}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/**table header */}
              <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
                <tr>
                  <th className="p-3">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-3">
                    <div className="font-semibold text-center">Price</div>
                  </th>
                  <th className="p-3">
                    <div className="font-semibold text-center">Available</div>
                  </th>
                </tr>
              </thead>
              {/** Table body */}
              <tbody className="text-sm font-medium divide-y divide-gray-100">
                <ItemTable
                  items={this.state.items}
                  changeAvailability={(id) => this.changeAvailability(id)}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;

const ItemTable = ({ items, changeAvailability }) => {
  return (
    <>
      {items.length > 0
        ? items.map((i, idx) => {
            return (
              <tr key={idx}>
                <td className="p-3">
                  <div className="text-left">{i.name}</div>
                </td>
                <td className="p-3">
                  <div className="text-center text-green-500">{i.price}</div>
                </td>
                <td className="p-3">
                  <div className="text-center">
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={() => changeAvailability(i.ID)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </td>
              </tr>
            );
          })
        : null}
    </>
  );
};
