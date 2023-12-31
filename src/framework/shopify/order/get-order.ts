

import { ApiConfig, Variables } from "@common/types/api";
import { getOrderQuery, getProductQuery, normalizeProduct } from "@framework/utils";

import { Order, Order as ShopifyOrder, Product as ShopifyProduct } from "@framework/schema"
import { Product } from "@common/types/product"

type FetchType = {
  orderById: ShopifyOrder
}

type ReturnType = {
  order: Order | null
}

const getOrder = async (options: {
  config: ApiConfig,
  variables: Variables
}): Promise<ReturnType> => {
  const { config, variables } = options;

  const { data } = await config.fetch<FetchType>({
    query: getOrderQuery,
    variables
  });

  // console.log(JSON.stringify(data.productByHandle, null, 2));
  
  const { orderById } = data;
  console.log(orderById);
  

  return {
    order: orderById 
  }
}

export default getOrder