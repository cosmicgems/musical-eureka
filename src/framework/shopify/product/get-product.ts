

import { ApiConfig, Variables } from "@common/types/api";
import { getProductQuery, normalizeProduct } from "@framework/utils";

import { Product as ShopifyProduct } from "@framework/schema"
import { Product } from "@common/types/product"

type FetchType = {
  productByHandle: ShopifyProduct
}

type ReturnType = {
  product: Product | null
}

const getProduct = async (options: {
  config: ApiConfig,
  variables: Variables
}): Promise<ReturnType> => {
  const { config, variables } = options;

  const { data } = await config.fetch<FetchType>({
    query: getProductQuery,
    variables
  });

  // console.log(JSON.stringify(data.productByHandle, null, 2));
  
  const { productByHandle } = data;
  console.log(productByHandle?.variants.edges[0]);
  

  return {
    product: productByHandle ? normalizeProduct(productByHandle) : null
  }
}

export default getProduct