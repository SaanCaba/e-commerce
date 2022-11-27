import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { FilterData } from "../interface/interface";
import {  filterProducts} from "../redux/actions";




function Filter() {

  const [filters, setFilters] = useState<string[] | FilterData[]>([])

  const dispatch = useDispatch()
  
  const handleFilterOrd = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(filterProducts(e.currentTarget.value))

  }

  const handleFilterCategory = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const text = document.getElementById(id)?.innerText.toLowerCase()
    if(text !== undefined){
      dispatch(filterProducts(text))
    }
  };


  return (
    <div className="">
      <div className="mt-4 mb-3" style={{width:'10%', display:'block', margin:'auto'}}>
      <select  onChange={handleFilterOrd} className="form-select form-select-sm size 10" aria-label=".form-select-sm example">
        <option  className="border-0">Prices</option>
        <option  className="border-0" value="Less expensive" >
          Less expensive
        </option>
        <option className="border-0" value="More expensive" >
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
