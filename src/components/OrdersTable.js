/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { recipientHtml } from "../lib/receipt";
class OrdersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      accepted: [],
      incoming: [],
      completed: [],
      selectedTime: 10,
      selectedReciept: "",
    };
    this.printOrder = this.printOrder.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      incoming: this.props.incoming,
      accepted: this.props.getting_ready,
      completed: this.props.completed,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  printOrder = (order) => {
    let orderRecieptHtml = recipientHtml(order);
    const recieptWidnow = window.open();
    recieptWidnow.document.write(orderRecieptHtml);
    recieptWidnow.document.close();
    recieptWidnow.focus();
    recieptWidnow.print();
  };

  render() {
    const page = this.props.page;
    let orders;
    if (page === "incoming") {
      orders = this.props.incoming;
    } else if (page === "getting_ready") {
      orders = this.props.accepted;
    } else if (page === "completed") {
      orders = this.props.completed;
    }
    return (
      <div className="col-span-full xl:col-span-9 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100 ">
          <h2 className="font-semibold text-gray-800">Παραγγελίες</h2>
        </header>
        <div className="p-3">
          {/**Table*/}
          <div className="overflow-x-auto ">
            <table className="table-auto  w-full ">
              {/**table header */}
              <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm ">
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
              <tbody className="text-sm font-medium divide-y divide-black-300">
                <OrderTable
                  orders={orders}
                  page={page}
                  changeTime={(t) =>
                    this.setState({ selectedTime: parseInt(t) })
                  }
                  acceptOrder={(order) =>
                    this.props.acceptOrder(order, this.state.selectedTime)
                  }
                  completeOrder={(order) => this.props.completeOrder(order)}
                  rejectOrder={(order) => this.props.rejectOrder(order)}
                  printOrder={(order) => this.printOrder(order)}
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

const OrderTable = ({
  orders,
  page,
  changeTime,
  acceptOrder,
  completeOrder,
  rejectOrder,
  printOrder,
}) => {
  return (
    <>
      {orders &&
        orders.map((i, idx) => {
          let fullAddess = `${i.client_address_name} ${i.client_address_number} ,
          ${i.client_area_name} , ${i.client_zip}`;
          return (
            <tr key={idx} id={`order-id-${i.ID}`}>
              <td className="w-3/4 pb-20">
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
                        {fullAddess}{" "}
                        <a
                          href={`https://www.google.com/maps/place/${encodeURIComponent(
                            fullAddess
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button
                            type="button"
                            class="mr-2 bg-red-600 text-white p-2 rounded  leading-none flex items-center"
                          >
                            <i class="fa-solid fa-location-dot"></i>
                          </button>
                        </a>
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
                        {i.payment_type === "Cash" ? "Μετρητά" : "Κάρτα"}
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
                          {i.products.map((p, idx) => (
                            <li
                              key={idx}
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
                                    {p.option_answers.map((a, indx) => (
                                      <li key={indx}>
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
                                    {p.extra_ingredients.map((ing, indx) => (
                                      <li key={indx}>
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
              <td className="flex unprintable">
                <ActionButtons
                  order={i}
                  state={page}
                  changeTime={(t) => changeTime(t)}
                  acceptOrder={(order) => acceptOrder(order)}
                  completeOrder={(order) => completeOrder(order)}
                  rejectOrder={(order) => rejectOrder(order)}
                  printOrder={() => printOrder(i)}
                />
              </td>
            </tr>
          );
        })}
    </>
  );
};

const timeOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const ActionButtons = ({
  order,
  state,
  changeTime,
  acceptOrder,
  completeOrder,
  rejectOrder,
  printOrder,
}) => {
  let buttonA = {};
  let buttonB = {};
  let buttonC = {};
  let showTime = false;
  if (state === "incoming") {
    buttonA.text = "Print it";
    buttonA.func = printOrder;
    buttonA.color = "bg-gray-400";
    buttonB.text = "Accept";
    buttonB.color = "bg-green-400";
    buttonB.func = acceptOrder;
    buttonC.text = "Decline";
    buttonC.color = "bg-red-400 ";
    buttonC.func = rejectOrder;
    showTime = true;
  } else if (state === "getting_ready") {
    buttonA.text = "Print it";
    buttonA.color = "bg-gray-400";
    buttonA.func = printOrder;
    buttonB.text = "Complete";
    buttonB.color = "bg-green-400 ";
    buttonB.func = completeOrder;
    buttonC.text = null;
  } else if (state === "completed") {
    buttonA.text = "Print it";
    buttonA.color = "bg-gray-400";
    buttonA.func = printOrder;
    buttonB.text = null;
    buttonC.text = null;
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        className={`${buttonA.color} col-span-3  text-white font-bold py-1 px-1 rounded-full`}
        onClick={printOrder}
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
          onClick={() => buttonB.func(order)}
        >
          {buttonB.text}
        </button>
      </div>
      <div className="col-end-4 col-span-1">
        <button
          className={`${buttonC.color}
        text-white font-bold py-2 px-4 rounded-full`}
          onClick={() => buttonC.func(order)}
        >
          {buttonC.text}
        </button>
      </div>
    </div>
  );
};
