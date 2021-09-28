import React, { Component } from "react";
import {
  accept_sse,
  auth_get_request,
  get_request,
  put_request,
} from "../actions/lib";
import withAuthorization from "./firebase/withAuthorization";
import CreateForm from "./Forms/CreateItemForm";
import Header from "./Header";
import OptionBar from "./OptionBar";
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
      choices: [],
      selectedCategory: "",
    };
  }

  async recieveOrder(order) {
    let data = JSON.parse(order.data);
    this.setState({ incoming: this.state.incoming.push(data.order) });
  }

  async acceptOrder(order, time) {
    let data = {
      id: String(order.ID),
      accepted: true,
      time: time,
      from: order.from_id,
    };
    const res = await accept_sse(`sse/acceptorder`, data);
    if (res === true) {
      const newOrder = await put_request(
        `admin/orders/${data.id}/accept_order`,
        { delivery_time: data.time }
      );
      let incoming = this.state.incoming;
      let getting_ready = this.state.getting_ready;
      const index = incoming.findIndex((p) => p.ID === newOrder.ID);
      getting_ready.unshift(incoming[index]);
      incoming.splice(index, 1);
      this.setState({
        incoming: incoming,
        getting_ready: getting_ready,
      });
    }
  }

  async rejectOrder(order) {
    let data = {
      id: String(order.ID),
      accepted: false,
      time: 0,
      from: order.from_id,
    };
    const res = await accept_sse(`sse/acceptorder`, data);
    if (res === true) {
      const newOrder = await put_request(
        `admin/orders/${data.id}/cancel_order`,
        null
      );
      let incoming = this.state.incoming;
      // TODO create cancel order list
      // let getting_ready = this.state.getting_ready;
      const index = incoming.findIndex((p) => p.ID === newOrder.ID);
      // getting_ready.unshift(incoming[index]);
      incoming.splice(index, 1);
      this.setState({
        incoming: incoming,
        // getting_ready: getting_ready,
      });
    }
  }

  async completeOrder(order) {
    const newOrder = await put_request(
      `admin/orders/${order.ID}/complete_order`,
      null
    );
    console.log(newOrder);

    let getting_ready = this.state.getting_ready;
    let completed = this.state.completed;
    const index = getting_ready.findIndex((p) => p.ID === newOrder.ID);
    if (index !== -1) {
      if (completed === null) {
        completed = [];
      }
      completed.unshift(getting_ready[index]);
      getting_ready.splice(index, 1);
    }
    this.setState({
      getting_ready: getting_ready,
      completed: completed,
    });
  }

  componentDidMount() {
    this.eventSource.onmessage = (e) => this.recieveOrder(e);
    this.setState({
      page: this.props.location.pathname.split("/")[1],
    });
    this.get_products();
    this.get_orders();
    this.get_categories();
    this.get_ingredients();
    this.get_choices();
  }

  async get_products() {
    const products = await auth_get_request("products/all");
    this.setState({
      products: products,
    });
  }

  async get_choices() {
    const choices = await get_request("product_choices/all");
    this.setState({
      choices: choices,
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
      // console.log(name);
      this.setState({
        selectedCategory: name,
      });
    }
  }

  render() {
    let table = "products";
    let showCreate = false;
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
    let createForm = "";
    if (this.state.page.includes("create/")) {
      showCreate = true;
      if (this.state.page.includes("product")) {
        createForm = "product";
      } else if (this.state.page.includes("ingredient")) {
        createForm = "ingredient";
      } else if (this.state.page.includes("choice")) {
        createForm = "choice";
      } else if (this.state.page.includes("category")) {
        createForm = "category";
      }
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
            {showCreate === false ? (
              table === "products" || table === "ingredients" ? (
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
                      acceptOrder={(order, time) =>
                        this.acceptOrder(order, time)
                      }
                      completeOrder={(order) => this.completeOrder(order)}
                      rejectOrder={(order) => this.rejectOrder(order)}
                    />
                  </div>
                </div>
              )
            ) : (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-start-2 col-span-10">
                  <CreateForm
                    page={createForm}
                    categories={this.state.categories}
                    choices={this.state.choices}
                    ingredients={this.state.ingredients}
                    ingredientCategories={this.state.ingredientCategories}
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

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Dashboard);
