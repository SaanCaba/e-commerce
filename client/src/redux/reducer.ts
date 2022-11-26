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

type States = {
    cart: Array<DataProduct>
    products: Array<DataProduct> 
    allProducts: Array<DataProduct>
    vacio :string
    update: boolean
    onFilter: boolean
    seeCart: boolean
    total: number 
    lessTot:boolean
    user?:{}
}

const initial_state : States = {
    cart:[],
    products: [],
    allProducts: [],
    vacio: '',
    update: false,
    onFilter:false,
    seeCart: false,
    total: 0,
    lessTot: false,
    user:{}
}


function rootReducer(state = initial_state, action: Action) {
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
            let filterProductsByCategory: Array<DataProduct>| string[];
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
            if(action.payload === 'all'){
                return{
                    ...state,
                    products: state.allProducts,
                    update:true,
                    onFilter: true
                }
            }
            filterProductsByCategory  =  state.allProducts.filter((e : DataProduct )=>{
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
            case "ADD_CART":
                console.log(action.payload)
                action.payload.qty = 1;
            return{
                ...state,
                cart: [...state.cart, action.payload],
                lessTot: false
            }
            case "SEE_CART":
            return{
                ...state,
                seeCart: true
            }
            case "DONT_SEE_CART":
            return{
                ...state,
                seeCart:false
            }
            case "DELETE_ITEM":
                let removeItem = state.cart.filter(el => el.id !== action.payload)
                return{
                    ...state,
                    cart : removeItem
                }
            case "ADD_TOTAL":
                // let suma = state.total
                // suma += action.payload
                return{
                    ...state,
                    total: state.total + action.payload,
                    lessTot: false
                }
            case "LESS_TOTAL":  
             let resta = state.total
             resta -= action.payload
            
             return{
                ...state,
                total: resta,
                lessTot: true
             } 
            
             case "VAL_TOT":

            return{
                ...state,
                lessTot: true
            }
            case "RESET_CART":

                return{
                    ...state,
                    total: action.payload
                }
            case "CANCEL":
                return{
                    ...state,
                    cart: []
                }
            case "GET_USER":
                return{
                    ...state,
                    user: action.payload
                }
           default: 
            return state
        }
}


export default rootReducer