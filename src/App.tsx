import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MenuBar from "./components/MenuBar";
import ProductsDetails from "./components/ProductsDetails";

const App: React.FC = () => {

  return (
    <React.Fragment>
      <MenuBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/categorydetails" element={<CategoryDetails />} /> */}
        <Route path="/productsdetails" element={<ProductsDetails />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;




// import { getData } from "./database/crud";
// import Blog from "./database/crud";
//   // React.useEffect(() => {
//   //   getData();
//   // }, []);

//     //  {/* <Blog /> */}