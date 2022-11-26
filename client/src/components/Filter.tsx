import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {  filterProducts, filterProductsByPrice} from "../redux/actions";

type DataProduct = {
  id: number
  description: string
  category: string
  image: string
  price: number
  rating: {
    rate: number 
    count: number
  }
  title: string

}

type FilterData = {
  info : string
}

type States = {
  cart: Array<DataProduct> 
  products: Array<DataProduct> 
  vacio : string
}

function Filter() {


  const [filters, setFilters] = useState<string[] | FilterData[]>([])

  const dispatch = useDispatch()
  
  const handleFilterOrd = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(filterProducts(e.currentTarget.value))

  }

  const handleFilterCategory = (e: React.MouseEvent<HTMLElement>, id:any) => {
    const text = document.getElementById(id)?.innerText.toLowerCase()
    if(text !== undefined){
      dispatch(filterProducts(text))
    }
  };


  return (
    <div className="">
      <div className="d-flex justify-content-center mt-4">
      <select onChange={handleFilterOrd} className="m-2">
        <option>Prices</option>
        <option value="Less expensive" >
          Less expensive
        </option>
        <option value="More expensive" >
          More expensive
        </option>
      </select>
      </div>
      <div>
        <div className="d-flex justify-content-center">
          <button id='1' className="border-0 btn-dark text-light m-1 btn btn-outline-secondary" onClick={(e) => handleFilterCategory(e, '1')}>Men's clothing</button>
          <button id='2' className="border-0 btn-dark text-light m-1 btn btn-outline-secondary" onClick={(e) => handleFilterCategory(e, '2')}>Jewelery</button>
          <button id='3' className="border-0 btn-dark text-light m-1 btn btn-outline-secondary" onClick={(e) => handleFilterCategory(e, '3')}>Electronics</button>
          <button id='4' className="border-0 btn-dark text-light m-1 btn btn-outline-secondary" onClick={(e) => handleFilterCategory(e, '4')}>Women's clothing</button>
          <button id='5' className="border-0 btn-dark text-light m-1 btn btn-outline-secondary" onClick={(e) => handleFilterCategory(e, '5')}>All</button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
