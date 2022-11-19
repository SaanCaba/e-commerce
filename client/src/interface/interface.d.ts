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
 }
 
export type Cart = {
   cart : CartProduct[]
 }