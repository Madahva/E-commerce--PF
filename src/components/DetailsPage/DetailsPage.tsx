import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectProductDetailds } from "../../redux/features/productSlice";
import { fetchPayment, selectPayment } from "../../redux/features/paymentSlice";
import {
  addItem,
  selectShoppingCartItems,
} from "../../redux/features/shoppingCartSlice";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Breadcrumbs, Typography } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  detailsPage: {
    backgroundColor: "#ededed",
    padding: "2rem 4rem 6rem 4rem",
  },
  detail: {
    alignItems: "center",
    display: "flex",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "1rem 1rem 4rem 1rem",
    width: "75vw",
    margin: "0 auto",
  },
  productImage: {
    maxWidth: "100%",
    maxHeight: "420px",
    width: "auto",
    height: "auto",
  },
  link: {
    color: "inherit",
    cursor: "pointer",
    textTransform: "capitalize",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  detail__description: {
    alignItems: "center",
    display: "flex",
    gap: "2rem",
    justifyContent: "space-between",
  },
}));

const DetailsPage: React.FC = () => {
  const classes = useStyles();

  const url = window.location.href;
  const splitUrl = url.split("/");
  const productCategory = splitUrl[3];

  const productDetaild: Product[] = useAppSelector(selectProductDetailds);
  if (productDetaild[0]) {
    var product = productDetaild[0];
  }

  const dispatch = useAppDispatch();
  const response = useAppSelector(selectPayment);
  console.log(response);
  useEffect(() => {
    if (response?.init_point) {
      window.location.href = response.init_point;
    }
  }, [response]);

  const handleAddToShoppingCart = (name: any, id: any, price: any) => {
    dispatch(
      addItem({
        title: name,
        id,
        quantity: 1,
        unit_price: parseInt(price),
      })
    );
  };

  const handleBuy = (name: string, price: string) => {
    dispatch(
      fetchPayment([
        {
          title: name,
          quantity: 1,
          unit_price: parseInt(price),
        },
      ])
    );
  };

  return (
    <div>
      {product ? (
        <div className={classes.detailsPage}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link className={classes.link} to="/">
              Categories
            </Link>
            <p className={classes.link} onClick={() => window.history.back()}>
              {productCategory}
            </p>

            <Typography color="text.primary">{product.name}</Typography>
          </Breadcrumbs>
          <Box sx={{ margin: "20px" }}></Box>

          <div className={classes.detail}>
            <h1>{product.name}</h1>
            <div className={classes.detail__description}>
              <img
                src={product.img}
                alt={product.name}
                className={classes.productImage}
              />
              <div>
                <div>
                  <p>{product.description}</p>
                  <p>{product.Marca}</p>
                  <p>{product.price}</p>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleAddToShoppingCart(
                      product.name,
                      product.id,
                      product.price
                    );
                  }}
                >
                  <AddShoppingCart />
                  Add to cart
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    handleBuy(product.name, product.price);
                  }}
                  style={{ backgroundColor: "#4CAF50", marginLeft: "2rem" }}
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DetailsPage;
