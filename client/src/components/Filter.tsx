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
  
  const handleFilterCategory = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(filterProducts(e.currentTarget.value))
    // dispatch(addFilters(e.currentTarget.value))
    // let findCopy = filters.find(el => el.includes(e.currentTarget.value))
    // if(e.currentTarget.value === 'Less expensive' || e.currentTarget.value === 'More expensive'){
    //   return;
    // }
    // if(filters.length === 1){
    //   setFilters(e.currentTarget.value)
    //   return;
    // }
    // if(!findCopy ){
    //   setFilters([...filters, e.currentTarget.value])
    // }
    // return;
  };

  // const products = useSelector((state : States) => state.products)


  return (
    <div className="">
      <div className="d-flex justify-content-center mt-4">

      <select onChange={handleFilterCategory} className="m-2">
        <option>Prices</option>
        <option value="Less expensive" >
          Less expensive
        </option>
        <option value="More expensive" >
          More expensive
        </option>
      </select>
      <select className="m-2" onChange={handleFilterCategory}>
        <option>Category</option>
        <option value={`men's clothing`} >
          Mens clothing
        </option>
        <option value="jewelery" >
          Jewelery
        </option>
        <option value="electronics" >
          Electronics
        </option>
        <option value={`women's clothing`} >
          Women's clothing
        </option>
      </select>
      </div>
      {/* <div>
        {filters.length > 0 && filters.map((e, i) => {
          return(
            <div key={i} className='d-flex justify-content-center'>
            <span>{e}</span>
            </div>
          )
        })}
      </div> */}
    </div>
  );
}

export default Filter;
