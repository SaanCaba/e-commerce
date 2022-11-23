import { DataProduct, DataProductType } from "../interface/interface"

export const ADD_CART = "ADD_CART"
export const SEARCH_PRODUCT = "SEARCH_PRODUCT"
export const GET_PRODUCT = "GET_PRODUCT"
export const FILTER_PRODUCTS_BY_CATEGORY = "FILTER_PRODUCTS_BY_CATEGORY"
export const FILTER_PRODUCTS_BY_PRICE = "FILTER_PRODUCTS_BY_PRICE"




export function getProducts(products:Array<DataProduct>){

    return{
        type : GET_PRODUCT,
        payload: products
    }

}

export function searchProduct(payload : string){
    return{
        type: SEARCH_PRODUCT,
        payload: payload
    }
}

export function filterProducts(payload: string){
    return{
        type: FILTER_PRODUCTS_BY_CATEGORY,
        payload: payload
    }
}

export function filterProductsByPrice(payload: string){
    return{
        type: FILTER_PRODUCTS_BY_PRICE,
        payload: payload
    }
}

export function update(){
    return{
        type: "UPDATE"
    }
}

export function getAgainProducts(){
    return{
        type: "GET_AGAIN_PRODUCTS"
    }
}



export function addCart(product: DataProduct ){
    return{
        type: "ADD_CART",
        payload: product
    }
}

export function deleteCart(idProduct : number){
    return {
        type: "DELETE_ITEM",
        payload: idProduct
    }
}

export function seeCart(){
    return{
        type: "SEE_CART"
    }
}

export function cantSeeCart(){
    return{
        type: "DONT_SEE_CART"
    }
}

export function addTotal(payload: number ){
    console.log(payload)
    return{
        type: "ADD_TOTAL",
        payload: payload
    }

}

export function lessTotal(payload:number){
    return{
        type: "LESS_TOTAL",
        payload: payload
    }
}

export function valorTotal(){
    return{
        type: "VAL_TOT",
    }
}