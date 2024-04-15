import { Box, Grid } from "@mui/material";
import React from "react";
import { LuSearch } from "react-icons/lu";


const Search = ({ handleChange, handleChangePostalCode, search, searchPostalCode }) => {
  return (
    <>
      <Box sx={style.main}>
        <Grid container columnSpacing={5}>
          <Grid item lg={7} xs={12}>
            <Box sx={style.searchLeftBox}>
              <form className="search-box">
                <button
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: "23px",
                      verticalAlign: "-1px",
                      color: "#9B9B9B",
                    }}
                  >
                    <LuSearch style={{ marginTop: "5px" }} />
                  </span>
                </button>
                <input
                  style={{ verticalAlign: "4px", width: "100%" }}
                  type="search"
                  name="focus"
                  placeholder="Chercher un docteur"
                  id="search-input"
                  value={search}
                  onChange={(e) => handleChange(e)}
                />
              </form>
            </Box>
          </Grid>
          <Grid item lg={5} xs={12}>
            <Box sx={style.searchLeftBox}>
              <form className="search-box">
                <button
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: "23px",
                      verticalAlign: "-1px",
                      color: "#9B9B9B",
                    }}
                  >
                    <LuSearch style={{ marginTop: "5px" }} />
                  </span>
                </button>
                <input
                  style={{ verticalAlign: "4px", width: "100%" }}
                  type="search"
                  name="focus"
                  placeholder="Chercher par code postal"
                  id="search-input"
                  value={searchPostalCode}
                  onChange={(e) => handleChangePostalCode(e)}
                />
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};


export default Search;
const style = {
  main: {
    width: "100%",
    color: "black",
    marginTop: "60px",
  },
  searchLeftBox: {
    width: "100%",
    display: "flex",
    justifyContent: { md: "start", xs: "center" },
  },
  searchRightBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  groupBtn: {
    color: "#5283E5",
    background: "white",
    borderRadius: "30px",
    paddingY: "10px",
    paddingX: "16px",
    fontWeight: 600,
    fontFamily: "Poppins",
    fontSize: "13px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    boxShadow: 2,
    textTransform: "capitalize",
    letterSpacing: "0px",
  },
  addiconBox: {
    background: "#4F81E5",
    color: "white",
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "45px",
    marginX: "40px",
  },
  size: {
    fontSize: "32px",
    opacity: 0.7,
  },
  flexAvatar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    marginX: "12px",
  },
  bold: {
    fontWeight: 600,
    fontFamily: "Poppins",
    fontSize: "14px",
  },
};
