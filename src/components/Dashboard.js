import React, { Component } from "react";
import { get_request } from "../actions/lib";
import Header from "./Header";
import OptionBar from "./OptionBar";
import OrdersSideBar from "./OrdersSideBar";
import OrdersTable from "./OrdersTable";
import Sidebar from "./Sidebar";
import Table from "./Table";
import TableBanner from "./TableBanner";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.eventSource = new EventSource(
      "http://localhost:8080/sse/events/admin"
    );
    this.state = {
      page: "",
      products: [],
      categories: [],
      ingredients: [],
      incoming: [],
      getting_ready: [],
      completed: [],
      orders: [],
      selectedCategory: "",
    };
  }

  async recieveOrder(order) {
    let data = JSON.parse(order.data);
    // console.log(data);
    this.setState({ incoming: this.state.incoming.push(data.order) });
    // this.props.get_order(data.order);

    // this.setState({
    //   selectedTab: "Εισερχόμενες",
    // });
  }

  // async acceptOrder(order) {
  //   let data = {
  //     id: order.ID,
  //     accepted: true,
  //     time: this.state.selected_time,
  //     from: order.from,
  //   };
  //   await this.props.post_request(
  //     `http://localhost:8080/sse/acceptorder`,
  //     data,
  //     ACCEPT_ORDER
  //   );

  //   let orders = this.state.orders;
  //   const newOrders = orders.filter((ord) => ord.ID !== data.id);
  //   this.setState({
  //     orders: newOrders,
  //   });
  // }

  // async rejectOrder(order) {
  //   let data = {
  //     id: order.ID,
  //     accepted: false,
  //     time: 0,
  //     from: order.from,
  //   };
  //   await this.props.post_request(
  //     `http://localhost:8080/sse/acceptorder`,
  //     data,
  //     ACCEPT_ORDER
  //   );
  //   let orders = this.state.orders;
  //   const newOrders = orders.filter((ord) => ord.ID !== data.id);
  //   this.setState({
  //     orders: newOrders,
  //   });
  // }

  componentDidMount() {
    this.eventSource.onmessage = (e) => this.recieveOrder(e);
    this.setState({
      page: this.props.location.pathname.split("/")[1],
    });
    this.get_products();
    this.get_orders();
    this.get_categories();
    this.get_ingredients();
  }

  async get_products() {
    const products = await get_request("products/all");
    this.setState({
      products: products,
    });
  }

  async get_orders() {
    const orders = await get_request("admin/today");
    this.setState({
      incoming: orders.incoming,
      getting_ready: orders.getting_ready,
      completed: orders.completed,
    });
  }

  async get_categories() {
    const categories = await get_request("product_category/all");
    this.setState({
      categories: categories,
    });
  }

  async get_ingredients() {
    const res = await get_request("ingredients/all");
    this.setState({
      ingredients: res.ingredients,
      ingredientCategories: res.categories,
    });
  }

  onTabChange(name) {
    this.setState({
      page: name,
    });
  }

  onCategoryChange(name) {
    if (this.state.page === "ingredients") {
      this.setState({
        selectedCategory: name,
      });
    } else {
      this.setState({
        selectedCategory: this.state.categories.find((c) => c.name === name),
      });
    }
  }

  render() {
    let table = "products";
    if (
      this.state.page === "incoming" ||
      this.state.page === "completed" ||
      this.state.page === "getting_ready"
    ) {
      table = "orders";
    } else if (this.state.page === "settings") {
      table = "settings";
    } else if (this.state.page === "products") {
      table = "products";
    } else if (this.state.page === "ingredients") {
      table = "ingredients";
    }
    return (
      <div className="flex h-screen overflow-hidden">
        {/* sidebar */}
        <Sidebar
          sidebarOpen={true}
          onTabChange={(name) => this.onTabChange(name)}
        />
        {/** Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/** Site header */}
          <Header />

          <main>
            {/**Welcome banner */}
            <TableBanner />
            {/**Dashboard actions banner */}

            {/* Cards */}
            {table === "products" || table === "ingredients" ? (
              <div className="grid grid-cols-12 gap-6">
                {/** OptionBar */}
                <div className="col-span-2">
                  <OptionBar
                    page={this.state.page}
                    categories={this.state.categories}
                    selectedCategory={this.state.selectedCategory}
                    onChangeCategory={(c) => this.onCategoryChange(c)}
                    ingredientCategories={this.state.ingredientCategories}
                  />
                </div>
                {/** Table */}
                <div className="col-span-10">
                  <Table
                    selectedCategory={this.state.selectedCategory}
                    page={this.state.page}
                    products={this.state.products}
                    ingredients={this.state.ingredients}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-6">
                {/** OptionBar */}
                {/* <div className="col-span-2 h-auto">
                  <OrdersSideBar page={this.state.page} />
                </div> */}
                <div className="col-start-2 col-span-10">
                  {/** Table */}
                  <OrdersTable
                    page={this.state.page}
                    incoming={this.state.incoming}
                    getting_ready={this.state.getting_ready}
                    completed={this.state.completed}
                  />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }
}

export default Dashboard;
