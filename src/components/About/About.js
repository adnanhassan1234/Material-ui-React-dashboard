import { FavoriteBorder } from "@mui/icons-material";
import { Button, Container, Grid, Box, Checkbox, Stack } from "@mui/material";

import * as React from "react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { Typography } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import { customStyle } from "../Style";
import theme from "../../Theme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}




const About = () => {
  const [personName, setPersonName] = React.useState([]);



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <>
    <ThemeProvider theme={theme}>
      <Box component="main" >
        <Container>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Name</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Divider>
            <Chip label="CHIP" />
          </Divider>
          <Typography variant="body1" sx={customStyle.mainPara}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            eligendi voluptatibus, impedit esse commodi error autem enim culpa,
            quas alias officia perspiciatis atque! Enim sapiente eos esse
            dolorum eius molestias?
          </Typography>
          <Button
            className="my-custom-button"
            active={false}
            color="success"
            variant="contained"
            size="medium"
            sx={customStyle.mainPara}
          >
            success
          </Button>
        </Container>
      </Box>
      </ThemeProvider>;
    </>
  );
};

export default About;
