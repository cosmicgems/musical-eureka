import { Product, ProductImage } from "./product"

export interface Collection {
    id: string
    name: string
    handle?: string
    description: string
    path: string
    image: any
}


export interface CollectionAndProducts {
    id: string
    name: string
    handle?: string
    description: string
    path: string
    image: any
    products: Product[]
}