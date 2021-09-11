import React, { Component } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TableBanner from "./TableBanner";

class Dashboard extends Component {
  render() {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* sidebar */}
        <Sidebar sidebarOpen={true} />
        {/** Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/** Site header */}
          <Header />

          <main>
            {/**Welcome banner */}
            <TableBanner />
            {/**Dashboard actions banner */}
          </main>
        </div>
      </div>
    );
  }
}

export default Dashboard;
