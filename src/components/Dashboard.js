import React, { Component } from "react";
import { get_request } from "../actions/lib";
import Header from "./Header";
import OptionBar from "./OptionBar";
import Sidebar from "./Sidebar";
import Table from "./Table";
import TableBanner from "./TableBanner";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      products: [],
      categories: [],
      ingredients: [],
    };
  }
  componentDidMount() {
    this.setState({
      page: this.props.location.pathname.split("/")[1],
    });
    this.get_products();
  }

  async get_products() {
    const products = await get_request("products/all", null);
    this.setState({
      products: products,
    });
  }

  onTabChange(name) {
    this.setState({
      page: name,
    });
  }

  render() {
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
            <div className="grid grid-cols-12 gap-6">
              {/** OptionBar */}
              <OptionBar page={this.state.page} />
              {/** Table */}
              <Table page={this.state.page} items={this.state.products} />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Dashboard;
