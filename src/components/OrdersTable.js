/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from "react";

class OrdersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      selectedTime: 10,
    };
  }

  componentDidMount() {
    // console.log(this.props);
    this.setState({
      orders: this.props.orders,
    });
  }
  render() {
    const page = this.props.page;
    return (
      <div className="col-span-full xl:col-span-9 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Παραγγελίες</h2>
        </header>
        <div className="p-3">
          {/**Table*/}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/**table header */}
              <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
                <tr>
                  <th className="p-8">
                    <div className="font-semibold text-left">Λεπτομέριες</div>
                  </th>
                  <th className="p-4">
                    <div className="font-semibold text-center">Επιλογές</div>
                  </th>
                </tr>
              </thead>
              {/** Table body */}
              <tbody className="text-sm font-medium divide-y divide-gray-100">
                <OrderTable
                  orders={this.state.orders}
                  page={page}
                  changeTime={(t) => this.setState({ selectedTime: t })}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default OrdersTable;

const OrderTable = ({ orders, page, changeTime }) => {
  return (
    <>
      {orders.length > 0
        ? orders.map((i, idx) => {
            return (
              <tr key={idx}>
                <td className="w-3/4">
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Αριθμός Παραγγελίας
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {i.ID}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Ώρα Παραγγελίας
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {i.CreatedAt.slice(11, 19)}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Διεύθυνση
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          Ιασωνίδου 10, Ελληνικό
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Όνομα
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {i.name} {i.surname}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Τηλέφωνο
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {i.phone}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Όροφος
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {i.floor}
                        </dd>
                      </div>
                      <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Κουδούνι
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {i.bell_name}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Σύνολο
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {i.after_discount_price.toFixed(2)} €
                        </dd>
                      </div>
                      <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Πληρωμή
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {i.payment_type}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Προϊόντα
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <ul
                            role="list"
                            className="border border-gray-200 rounded-md divide-y divide-gray-200"
                          >
                            {/* Map products */}
                            {i.products.map((p) => (
                              <li
                                key={p.ID}
                                className="pl-3 pr-4 py-3 flex flex-wrap  items-center justify-between text-sm"
                              >
                                <div className="w-0 flex-1 flex items-center">
                                  <span className="ml-2 flex-1 w-0 truncate">
                                    {p.item_name}
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <span className="ml-2 flex-1 w-0 truncate">
                                    {" "}
                                    x {p.quantity}
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <span className="ml-2 flex-1 w-0 truncate">
                                    {" "}
                                    {p.total_price.toFixed(2)} €
                                  </span>
                                </div>
                                {p.option_answers ? (
                                  <div className="w-full divide-y divide-light-blue-400">
                                    <ul>
                                      {p.option_answers.map((a) => (
                                        <li key={a}>
                                          <span className="text-gray-500">
                                            {" "}
                                            + {a}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : null}
                                {p.extra_ingredients ? (
                                  <div className="w-full divide-y divide-light-blue-400">
                                    <ul>
                                      {p.extra_ingredients.map((ing) => (
                                        <li key={ing}>
                                          <span className="text-gray-500">
                                            {" "}
                                            + {ing}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Σχόλια
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          Αδερφή
                        </dd>
                      </div>
                    </dl>
                  </div>
                </td>
                <td className="flex">
                  <ActionButtons
                    state={page}
                    changeTime={(t) => changeTime(t)}
                  />
                </td>
              </tr>
            );
          })
        : null}
    </>
  );
};

const timeOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const ActionButtons = ({ state, changeTime }) => {
  let buttonA = {};
  let buttonB = {};
  let buttonC = {};
  let showTime = false;
  if (state === "incoming") {
    buttonA.text = "Print it";
    buttonA.color = "bg-gray-400";
    buttonB.text = "Accept";
    buttonB.color = "bg-green-400";
    buttonC.text = "Decline";
    buttonC.color = "bg-red-400 ";
    showTime = true;
  } else if (state === "getting_ready") {
    buttonA.text = "Print it";
    buttonA.color = "bg-gray-400";
    buttonB.text = "Complete";
    buttonB.color = "bg-green-400 ";
    buttonC.text = null;
  } else if (state === "completed") {
    buttonA.text = "Print it";
    buttonA.color = "bg-gray-400";
    buttonB.text = null;
    buttonC.text = null;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        className={`${buttonA.color} col-span-3  text-white font-bold py-1 px-1 rounded-full`}
      >
        {buttonA.text}
      </button>
      <div className="col-span-3">
        {showTime ? (
          <>
            <label htmlFor="time">Επιλέξτε χρόνο:</label>
            <select
              id="time"
              name="time"
              onChange={(e) => changeTime(e.target.value)}
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="col-start-1 col-end-2">
        {" "}
        <button
          className={`${buttonB.color} text-white font-bold py-2 px-4 rounded-full`}
        >
          {buttonB.text}
        </button>
      </div>
      <div className="col-end-4 col-span-1">
        <button
          className={`${buttonC.color}
        text-white font-bold py-2 px-4 rounded-full`}
        >
          {buttonC.text}
        </button>
      </div>
    </div>
  );
};
