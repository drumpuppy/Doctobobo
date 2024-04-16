import React, { useState } from "react";
import Header from "../../Components/Header";
import Banner from "./Banner";
import Doctors from "./Doctors";

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchPostalCode, setSearchPostalCode] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChangePostalCode = (e) => {
    setSearchPostalCode(e.target.value);
  };

  return (
    <div>
      <Header />
      <Banner search={search} handleChange={handleChange} handleChangePostalCode={handleChangePostalCode} />
      <Doctors search={search} searchPostalCode={searchPostalCode} />
    </div>
  );
};


export default Home;

