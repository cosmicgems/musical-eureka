import {
    normalizeProduct, 
    getAllProductsQuery, 
    normalizeCollectionAndProducts
} from "../utils";

import { Collection, CollectionConnection, ProductConnection } from "../schema";
import { Product } from "@common/types/product";
import { ApiConfig, Variables } from "@common/types/api";
import getCollectionProductsQuery from "@framework/utils/queries/get-collection-products";
import { Product as ShopifyProduct } from "@framework/schema"

type ReturnType = {
    products: any
}

type FetchType = {
    collection: Collection
  }

const getCollectionProducts = async (options: {
    config: ApiConfig,
    variables: Variables
  }): Promise<ReturnType> => {
    const { config, variables } = options;
    // console.log(variables);
    
    const { data } = await config.fetch<FetchType>({
        query: getCollectionProductsQuery,
        variables
    });
    

    let products = normalizeCollectionAndProducts(data.collection)
    console.log(products);
    

    return products
}

export default getCollectionProducts