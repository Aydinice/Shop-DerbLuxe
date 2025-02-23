import React, { useState } from "react";
import "./Sidebar.scss";

export default function Sidebar() {
  const [isAct, setIsAct] = useState<boolean>(false);

  const handleisAct = () => {
    setIsAct((prev) => !prev);
  };
  return (
    <aside className={!isAct ? "Sidebar" : "Sidebar offWidth"}>
      <div>
        <select name="Сортировка" id="">
          <option value="toij">По размеру</option>
          <option value="dfgj">По цвету</option>
        </select>
      </div>
      <div className="containerSidebar">
        <button onClick={handleisAct} className="butOf">
          On/off
        </button>
      </div>
    </aside>
  );
}
