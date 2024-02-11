import { FC } from "react";
import { ProductDocument } from "../models/Product";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { decrementProduct, incrementProduct } from "../productSlice";

interface ProductComponentProps {
  product: ProductDocument;
}

export const ProductComponent: FC<ProductComponentProps> = ({ product }) => {
  const { cart } = useAppSelector((state) => state.product);
  let qty = 0;
  const cartItem = cart.find((item) => item._id === product._id);
  if (cartItem) {
    qty = cartItem.quantity;
  }
  const dispatch = useAppDispatch();
  return (
    <div>
      <Card sx={{ width: 300, minWidth: 300 }}>
        <CardMedia
          component="image"
          height="140"
          image="https://via.placeholder.com/300.png/09f/fff"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ${product.price}
          </Typography>
          {product.description && (
            <Typography variant="body2" component="div" color="text.secondary">
              ${product.description}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              dispatch(decrementProduct(product));
            }}
            disabled={qty === 0}
            size="large"
          >
            -
          </Button>
          <span>{qty}</span>
          <Button
            onClick={() => {
              dispatch(incrementProduct(product));
            }}
            size="large"
          >
            +
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
