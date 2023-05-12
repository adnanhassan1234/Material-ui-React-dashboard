import { Button, Container, Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import profile from "../../assets/image/hassan.jpg";
import profile1 from "../../assets/image/pexels-photo-122892.jpeg";
import profile2 from "../../assets/image/pexels-photo-631317.jpeg";
import profile3 from "../../assets/image/pexels-photo-1757247.jpeg";
import profile4 from "../../assets/image/pexels-photo-634613.jpeg";
import CardModel from "./CardModel";
import { useState } from "react";

const cardData = [
  {
    id: 1,
    image: profile,
    title: "Adnan hassan",
    para: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
  {
    id: 2,
    image: profile1,
    title: "Usman ali",
    para: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
  {
    image: profile2,
    title: "Haris ullah",
    para: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
  {
    id: 3,
    image: profile3,
    title: "Abu bakr",
    para: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
  {
    id: 4,
    image: profile4,
    title: "Gull Khan",
    para: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
];

function Cards() {

    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({});

  const selectedFunction = (item) => {
    console.log(item);
    if (open == true) {
      setOpen(false);
      setSelectedData({});
      // setOpen(true);
    } else {
      setOpen(true);
      setSelectedData(item);
      // setOpen(true);
    }
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          // py: 8,
          // backgroundColor:"#3D4044"
        }}
      >
        <Container>
          <Grid container spacing={3}>
            {cardData?.map((content) => {
              return (
                <>
                  <Grid item lg={3} md={6}>
                    <Card>
                      <CardMedia
                        sx={{ height: 230 }}
                        image={content.image}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {content.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {content.para}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          className="my-custom-button"
                          active={false}
                          color="success"
                          variant="contained"
                          size="medium"
                          sx={{ mb: 2 }}
                          // onClick={handleOpen}
                          onClick={() => selectedFunction(content)}
                        >
                          success
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Container>
        <CardModel open={open} handleClose={handleClose} selectedData={selectedData} onHide={() => setOpen(false)} />
      </Box>
    </>
  );
}

export default Cards;
