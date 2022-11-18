import { FILTER_PRODUCTS_BY_CATEGORY, FILTER_PRODUCTS_BY_PRICE, GET_PRODUCT, SEARCH_PRODUCT } from "./actions"

type DataProduct = {
    id: number
    description: string
    category: string
    image: string
    price: number
    rating: {}
    title: string
}



type Action = {
    payload?: any,
    type: string | Array<DataProduct>
}

// type States = {
//     cart: string[]  | Array<DataProduct>
//     products: string[] | Array<DataProduct>
// }

const initial_state = {
    cart:[],
    products: [],
    allProducts: [],
    vacio: '',
    update: false,
    onFilter:false,
    filters:[]
}


function rootReducer(state = initial_state, action: Action)  {
        switch(action.type){
          case GET_PRODUCT:
            return{
                ...state,
                allProducts: action.payload,
                products: action.payload
            }

          case SEARCH_PRODUCT:
            let allProducts : undefined | DataProduct[];
            if(state.onFilter === true){
                allProducts = state.products;
            }
            if(state.onFilter === false){
                allProducts = state.allProducts
            }
           let filterProducts = allProducts?.filter((e: DataProduct) => e.title.toUpperCase().includes(action.payload))
            if(filterProducts?.length === 0){
                return{
                    ...state,
                    vacio: 'No hay resultados con tu búsqueda!',
                    products: []
                }
            }
            return{
                ...state,
                vacio : '',
                products: filterProducts
            }
            case "GET_AGAIN_PRODUCTS" :

            return{
                ...state,
                products: state.allProducts
            }

            case FILTER_PRODUCTS_BY_CATEGORY:
            let filterProductsByCategory: DataProduct | string[];
            // let pepe = state.products    
            if(action.payload === 'Less expensive'){
               filterProductsByCategory= state.products.sort((a: DataProduct, b:DataProduct) => a.price - b.price)
                // console.log(sortedByPrice)
                return{
                    ...state,
                    products: filterProductsByCategory,
                    update: true,
                    onFilter: true
                }
            }
            if(action.payload ==='More expensive'){
                filterProductsByCategory = state.products.sort((a: DataProduct, b:DataProduct) => b.price - a.price)
                // console.log(sortedByPrice)
                return{
                    ...state,
                    products: filterProductsByCategory,
                    update: true,
                    onFilter: true
                }
            }
            filterProductsByCategory  =  state.allProducts.filter((e : DataProduct )=>{
                console.log(action.payload)
                    return e.category === action.payload
                })

                return{
                    ...state,
                    products: filterProductsByCategory,
                    onFilter: true
                }
                
            case "UPDATE":
                return{
                    ...state,
                    update: false
                }
            case "ADD_FILTER":
                
                // return{
                //     ...state,
                //     filters: action.pa
                // }
           default: 
            return state
        }
}


export default rootReducer