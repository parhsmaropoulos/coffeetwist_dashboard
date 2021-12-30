import React, { Component } from "react";
import { auth_get_request, put_request } from "../actions/lib";
import withAuthorization from "./firebase/withAuthorization";
import CreateForm from "./Forms/CreateItemForm";
import Header from "./Header";
import OptionBar from "./OptionBar";
import OrdersTable from "./OrdersTable";
import Sidebar from "./Sidebar";
import Table from "./Table";
import TableBanner from "./TableBanner";
import Sound from "react-sound";
import song from "../music/indaclub.mp3";
import { sendMsg, socket } from "../utils/socket";

class Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    socket.onmessage = (msg) => {
      this.recieveOrder(msg);
    };
    this.state = {
      page: "",
      products: [],
      categories: [],
      ingredients: [],
      incoming: [],
      accepted: [],
      completed: [],
      orders: [],
      choices: [],
      selectedCategory: "",
      isPlaying: false,
      showToast: false,
      toastType: "",
      recievedOrder: false,
    };
    this.startMusic = this.startMusic.bind(this);
    this.stopMusic = this.stopMusic.bind(this);
    this.recieveOrder = this.recieveOrder.bind(this);
    this.acceptOrder = this.acceptOrder.bind(this);
    this.rejectOrder = this.rejectOrder.bind(this);
    this.completeOrder = this.completeOrder.bind(this);
  }

  startMusic() {
    this.setState({
      isPlaying: true,
    });
  }
  stopMusic() {
    this.setState({
      isPlaying: false,
    });
  }

  async recieveOrder(socketData) {
    if (this._isMounted) {
      // let data = JSON.parse(socketData.data);
      // let incs = this.state.incoming ? this.state.incoming : [];
      // incs.push(data.order);
      // this.setState({ incoming: incs, isPlaying: true, page: "incoming" });
      await this.get_orders();
      this.setState({ isPlaying: true, page: "incoming" });
    }
  }

  async acceptOrder(order, time) {
    let data = {
      id: String(order.ID),
      accepted: true,
      time: time,
      from: "admin",
      to: order.from_id,
    };
    sendMsg(JSON.stringify(data));
    const newOrder = await put_request(`admin/orders/${data.id}/accept_order`, {
      delivery_time: data.time,
    });
    let incoming = this.state.incoming;
    let accepted = this.state.accepted ? this.state.accepted : [];
    const index = incoming
      ? incoming.findIndex((p) => p.ID === newOrder.ID)
      : 0;
    accepted.unshift(incoming[index]);
    incoming.splice(index, 1);
    this.setState({
      incoming: incoming,
      accepted: accepted,
    });
    this.stopMusic();
  }

  async rejectOrder(order) {
    let data = {
      id: String(order.ID),
      accepted: false,
      time: 0,
      from: "admin",
      to: order.from_id,
    };
    sendMsg(JSON.stringify(data));

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
    this.stopMusic();
  }

  async completeOrder(order) {
    const newOrder = await put_request(
      `admin/orders/${order.ID}/complete_order`,
      null
    );
    let accepted = this.state.accepted;
    let completed = this.state.completed ? this.state.completed : [];
    const index = accepted.findIndex((p) => p.ID === newOrder.ID);

    completed.unshift(accepted[index]);
    accepted.splice(index, 1);
    this.setState({
      accepted: accepted,
      completed: completed,
    });
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      page: this.props.location.pathname.split("/")[1],
      recieveOrder: false,
    });
    this.get_products();
    this.get_orders();
    this.get_categories();
    this.get_ingredients();
    this.get_choices();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async get_products() {
    const products = await auth_get_request("products/all");
    this.setState({
      products: products,
    });
  }

  async get_choices() {
    const choices = await auth_get_request("product_choices/all");
    this.setState({
      choices: choices,
    });
  }

  async get_orders() {
    const orders = await auth_get_request("admin/today");
    this.setState({
      incoming: orders.incoming,
      accepted: orders.getting_ready,
      completed: orders.completed,
    });
  }

  async get_categories() {
    const categories = await auth_get_request("product_category/all");
    this.setState({
      categories: categories,
    });
  }

  async get_ingredients() {
    const res = await auth_get_request("ingredients/all");
    this.setState({
      ingredients: res.ingredients,
      ingredientCategories: res.categories,
    });
  }

  onTabChange(name) {
    switch (name) {
      case "incoming":
      case "getting_ready":
      case "completed":
        this.get_orders();
        break;
      case "products":
        this.get_products();
        break;
      case "ingredients":
        this.get_ingredients();
        break;
      case "create/product":
        this.get_choices();
        this.get_ingredients();
        this.get_categories();
        break;
      case "create/category":
        break;
      case "create/ingredient":
        break;
      case "create/choice":
        break;
      default:
        break;
    }
    this.setState({
      page: name,
    });
  }

  onCategoryChange(selected, category) {
    if (category === "products") {
      sessionStorage.setItem("productTab", selected);
      this.get_products();
      this.get_categories();
    } else if (category === "ingredients") {
      sessionStorage.setItem("ingredientTab", selected);
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
        <Sound
          url={song}
          playStatus={
            this.state.isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
          }
          playFromPosition={300}
          // onLoading={handleSongLoading}
          // onPlaying={handleSongPlaying}
          // onFinishedPlaying={handleSongFinishedPlaying}
        />
        {/* <ToastNotification
          type={this.state.toastType}
          showNotification={this.state.showToast}
        /> */}
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
                      onChangeCategory={(c, tag) =>
                        this.onCategoryChange(c, tag)
                      }
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
                      accepted={this.state.accepted}
                      completed={this.state.completed}
                      acceptOrder={(order, time) =>
                        this.acceptOrder(order, time)
                      }
                      completeOrder={(order) => this.completeOrder(order)}
                      rejectOrder={(order) => this.rejectOrder(order)}
                      stopMusic={this.stopMusic}
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
