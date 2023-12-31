import { Collection } from "@common/types/Collection"
import { ApiConfig } from "@common/types/api"
import { Product } from "@common/types/product"
import { CollectionConnection, ProductConnection } from "@framework/schema"
import { getAllCollectionPathsQuery } from "@framework/utils"

type ReturnType = {
    collections: Pick<Collection, "handle" & "id" >[]
}

const getAllCollectionsPaths = async (config: ApiConfig): Promise<ReturnType> => {

  const { data } = await config.fetch<{collections: CollectionConnection}>({
    query: getAllCollectionPathsQuery})


  const collections = data.collections.edges.map(({node: {handle, id}}) => {
    return {
      handle: handle,
      id: id
    }
  })

  
  return { collections }
}

export default getAllCollectionsPaths