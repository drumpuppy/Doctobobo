import { Box, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { LuSearch } from "react-icons/lu";

const Search = ({ handleChange, handleChangePostalCode, search, searchPostalCode }) => {
  return (
    <Box sx={style.main}>
      <Grid container columnSpacing={5}>
        <Grid item lg={7} xs={12} sx={style.searchBox}>
          <TextField
            fullWidth
            type="search"
            placeholder="Chercher un docteur"
            value={search}
            onChange={(e) => handleChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton sx={style.iconButton}>
                    <LuSearch />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={style.textField}
          />
        </Grid>
        <Grid item lg={5} xs={12} sx={style.searchBox}>
          <TextField
            fullWidth
            type="search"
            placeholder="Chercher par code postal"
            value={searchPostalCode}
            onChange={(e) => handleChangePostalCode(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton sx={style.iconButton}>
                    <LuSearch />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={style.textField}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;

const style = {
  main: {
    width: "100%",
    marginTop: "60px",
  },
  searchBox: {
    display: "flex",
    justifyContent: { md: "start", xs: "center" },
    '& .MuiTextField-root': {
      margin: "8px",
    },
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', 
        borderRadius: '15px', 
        borderWidth: '5px',
      },
      color: 'white', 
    },
    '& .MuiInputLabel-root': {
      color: 'white', 
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white', 
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'white', 
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiPlaceholder-root': {
      color: 'white',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'white', 
      opacity: 1,
    },
  },
  iconButton: {
    color: 'white',
  },

};
