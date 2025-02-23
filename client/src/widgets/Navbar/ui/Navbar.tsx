import React from "react";
import "./Navbar.scss";
import Navigation from "@/features/Navigation/ui/Navigation";
import { useNavigation } from "@/features/Navigation/lib/useNavigation";

const Navbar = () => {
  const { elements } = useNavigation();
  return <Navigation elements={elements} />;
};

export default Navbar;
