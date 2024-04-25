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
        borderColor: 'white', // Changing the border color
        borderRadius: '15px', // Border radius for rounded corners
        borderWidth: '5px',
      },
      color: 'white', // Text color
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white', // Label color when focused
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white', // Underline color before focus
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'white', // Underline color on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white', // Underline color after focus
    },
    '& .MuiOutlinedInput-input': {
      color: 'white', // Input text color
    },
    '& .MuiPlaceholder-root': {
      color: 'white', // Placeholder text color
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'white', // Placeholder text color
      opacity: 1,
    },
  },
  iconButton: {
    color: 'white', // Icon button color
  },
  // ... (Other style definitions)
};
