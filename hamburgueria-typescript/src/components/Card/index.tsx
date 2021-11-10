import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useAuth } from "../../Provider/Auth";
import { useCart } from "../../Provider/Cart";

import { Product } from "../../interfaceProduct/products";

interface CardProps {
  item: Product;
}

export const CardItem = ({ item }: CardProps) => {
  const { authToken, userid } = useAuth();
  const { addCart } = useCart();
  const sendItemCart = { ...item, userId: Number(userid) };

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "200px",
      }}
    >
      <Card
        sx={{
          width: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid #E0E0E0",
        }}
      >
        <CardMedia
          component="img"
          image={item.image}
          alt="green iguana"
          sx={{ width: "200px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.category}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ color: "green" }}
          >
            R$ {item.price.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          {authToken ? (
            <Button
              size="small"
              variant="contained"
              onClick={() => addCart(sendItemCart)}
            >
              Adcionar
            </Button>
          ) : (
            <Button disabled={true} size="small" variant="contained">
              Adcionar
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
