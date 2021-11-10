import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useCart } from "../../Provider/Cart";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

export const BasicModal = ({ open, handleClose }: ModalProps) => {
  const { Cart, removeCart } = useCart();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll", display: "flex" }}
      >
        <Box
          //   sx={style}
          sx={{
            position: "absolute" as "absolute",
            left: "50%",
            transform: "translate(-50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb="5px"
            textAlign="center"
          >
            Carrinho de compras
          </Typography>
          {Cart.map((item, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                margin: "3px",
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt="green iguana"
                height="100px"
                sx={{ width: "100px" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
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
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => removeCart(item)}
                >
                  Remover
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Modal>
    </div>
  );
};
