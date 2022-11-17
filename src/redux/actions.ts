export const ADD_CART = "ADD_CART"
export const SEARCH_PRODUCT = "SEARCH_PRODUCT"
export const GET_PRODUCT = "GET_PRODUCT"

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