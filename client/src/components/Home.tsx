import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Cart } from "../interface/interface";
import { getProducts, resetCart, update } from "../redux/actions";
import Card from "./Card";
import Filter from "./Filter";
import FlyCart from "./FlyCart";
import SearchBar from "./SearchBar";
import useCall from "./useCall";
import Skeleton from 'react-loading-skeleton'
import "./styles/Home.css";
import "react-loading-skeleton/dist/skeleton.css"

type DataProduct = {
  id: number;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};

type States = {
  cart: Array<DataProduct>;
  products: Array<DataProduct>;
  vacio: string;
  update: boolean;
};

function Home() {
  // console.log(user)

  const [loader, setLoader] = useState(false)

  let token = localStorage.getItem("token");
  let history = useHistory();
  let dispatch = useDispatch();
  let products = useSelector((state: States) => state.products);
  let response = useCall<Array<DataProduct>>(
    "https://fakestoreapi.com/products"
  );
  let vacio = useSelector((state: States) => state.vacio);
  let update2 = useSelector((state: States) => state.update);
  const cart = useSelector((state: Cart) => state.cart);

  useEffect(() => {
    console.log(token);
    if (!token) {
      return history.push("/login");
    }
    if (cart.length === 0) {
      dispatch(resetCart(0));
    }
    if (response.data !== null && products.length === 0) {
      dispatch(getProducts(response.data));
    }
    if(products.length > 0){
      setLoader(true)
    }else{
      setLoader(false)
    }
    dispatch(update());
  }, [response.data, update2]);


  const LoaderSkeleton = () => {
    return(
      <>
      <Skeleton />
      </>
    )
  }

  return (
    <div className="cont-main-home min-vh-100">
      
      <div className="d-flex justify-content-center">
        <SearchBar />
      </div>
      <div className="">
        <Filter />
      </div>
      
      
      <div>{/* <FlyCart /> */}</div>
      {vacio.length > 0 && (
        <div>
          <h2 className="text-center mt-5">{vacio}</h2>
        </div>
      )}
      <div className="d-flex justify-content-center mt-4">
        <div className={cart.length === 0 ? "cards" : "cards cards-cart"}>
          {products.length > 0 &&
            products.map((e) => {
              return <Card key={e.id} product={e} />;
            })
            
            }
        </div>
        {cart.length > 0 && <FlyCart />}
      </div>
    </div>
  );
}

export default Home;
