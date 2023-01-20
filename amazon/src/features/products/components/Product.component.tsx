import { FC, useState } from "react";
import { ProductDocument } from "../models/Product";
import { useAppDispatch } from "../../../hooks/redux/hooks";
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
  const [count, setCount] = useState(0);
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
              setCount((prevCount) => {
                if (prevCount === 0) return 0;
                return prevCount - 1;
              });
              dispatch(decrementProduct(product));
            }}
            disabled={count === 0}
            size="large"
          >
            -
          </Button>
          <span>{count}</span>
          <Button
            onClick={() => {
              setCount((prevCount: number) => {
                return prevCount + 1;
              });
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
