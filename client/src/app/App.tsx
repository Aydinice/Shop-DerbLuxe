import React, { ChangeEvent, useEffect, useState } from "react";
import "./styles.scss";
import Navbar from "@/widgets/Navbar/ui/Navbar";
import Sidebar from "@/widgets/Sidebar/ui/Sidebar";
import Layout from "@/widgets/Layout/ui/Layout";

const App = () => {
  return (
    <div className="App">
      <Layout />
    </div>
  );
};

export default App;
