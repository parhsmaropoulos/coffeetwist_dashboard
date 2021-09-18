import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class OrdersSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ["incoming", "getting ready", "completed"],
      names: ["Εισερχόμενες", "Ετοιμάζονται", "Ολοκληρωμένες"],
    };
  }
  componentDidMount() {}
  render() {
    const page = this.props.page;
    const title = "Κατάσταση Παραγγελίας";

    return (
      <div className="col-span-full xl:col-span-3 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">{title}</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <Sidebar
              page={page}
              options={this.state.options}
              names={this.state.names}
            />
          </div>
        </div>
      </div>
    );
  }
}

const Sidebar = ({ page, options, names }) => {
  return (
    <ul>
      {options.length > 0
        ? options.map((o, idx) => {
            return (
              <li
                className={`px-2 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  page === "settings" && "bg-black-900"
                }`}
                key={idx}
              >
                <NavLink
                  exact
                  to={`/${o.replace(" ", "_")}`}
                  className={`block text-black-200 hover:text-white transition duration-150 inline-block ${
                    page === "settings" && "hover:text-black-200"
                  }`}
                >
                  <div className="flex flex-grow">
                    <span className="text-sm font-medium"> {names[idx]}</span>
                  </div>
                </NavLink>
              </li>
            );
          })
        : null}
    </ul>
  );
};
export default OrdersSideBar;
