import React, { useState } from "react";
import Header from "../../Components/Header";
import Banner from "./Banner";
import Doctors from "./Doctors";

const Home = () => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <Header />
      <Banner search={search} handleChange={handleChange} />
      <Doctors search={search} />
    </div>
  );
};

export default Home;
