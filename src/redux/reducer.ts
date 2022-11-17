import { GET_PRODUCT } from "./actions"

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
    cart: string[]  | Array<DataProduct>
    products: string[] | Array<DataProduct>
}

const initial_state = {
    cart:[],
    products: []
}


function rootReducer(state = initial_state, action: Action) {
        switch(action.type){
          case GET_PRODUCT:
            return{
                ...state,
                products: action.payload
            }
           default: 
            return state
        }
}


export default rootReducer