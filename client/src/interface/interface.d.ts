export type SeeCart = {
    seeCart:boolean
}

export type DataProductType = {
    product: { 
     id: number
     description: string
     category: string
     image: string
     price: number
     rating: {}
     title: string
 }
 
 }

 type DataProduct = {
    id: number
    description: string
    category: string
    image: string
    price: number
    rating: {}
    title: string
}
 
export type CartProduct = {
   id: number
     description: string
     category: string
     image: string
     price: number
     rating: {}
     title: string
     amount? : number
 }
 
export type Cart = {
   cart : CartProduct[]
   
 }

export type Total = {
    total: number
} 

export type ValTot = {
    lessTot: boolean
}

// export type DispatchTot = {
//     disp : () => Function
// }

export interface Error{
    response : {
        status: number
        data: {
            message: string
        }
    }  | undefined
}