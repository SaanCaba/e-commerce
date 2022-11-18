export const ADD_CART = "ADD_CART"
export const SEARCH_PRODUCT = "SEARCH_PRODUCT"
export const GET_PRODUCT = "GET_PRODUCT"
export const FILTER_PRODUCTS_BY_CATEGORY = "FILTER_PRODUCTS_BY_CATEGORY"
export const FILTER_PRODUCTS_BY_PRICE = "FILTER_PRODUCTS_BY_PRICE"

type DataProduct = {
    id: number
    description: string
    category: string
    image: string
    price: number
    rating: {}
    title: string
}


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

export function addFilters(payload: string){
    return{
        type: "ADD_FILTER",
        payload: payload
    }
}