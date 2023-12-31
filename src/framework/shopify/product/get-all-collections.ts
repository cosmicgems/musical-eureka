import {
    normalizeCollection,
    getAllCollectionsQuery
} from "../utils";

import { CollectionConnection, ProductConnection, CollectionEdge } from "../schema";
import { Product } from "@common/types/product";
import { ApiConfig } from "@common/types/api";
import { Collection } from "@common/types/Collection";

type ReturnType = {
    collections: CollectionConnection
}


const getAllCollections = async(config: ApiConfig): Promise<any> => {
    const { data } = await config.fetch<ReturnType>({
        query: getAllCollectionsQuery
    });
    
    console.log(data);
    
    const collections = data.collections.edges.map(({node: collection}) => 
        normalizeCollection(collection)
    ) ?? []
    
    console.log(collections);
    
    return collections
}

export default getAllCollections