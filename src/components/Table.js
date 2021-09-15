import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      items: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({
      items: this.props.items,
    });
  }
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
                <ItemTable items={this.state.items} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;

const ItemTable = ({ items }) => {
  return (
    <>
      {items.length > 0 ? (
        items.map((i, idx) => {
          return (
            <tr key={idx}>
              <td className="p-3">
                <div className="flex text-left">{i.name}</div>
              </td>
              <td className="p-3">
                <div className="flex text-center text-green-500">{i.price}</div>
              </td>
              <td className="p-3">
                {i.available ? (
                  <div className="text-center text-green-500">
                    <p>Available</p>
                  </div>
                ) : (
                  <div className="text-center text-red-500">
                    <p>Nott</p>
                  </div>
                )}
              </td>
            </tr>
          );
        })
      ) : (
        <null></null>
      )}
    </>
  );
};
