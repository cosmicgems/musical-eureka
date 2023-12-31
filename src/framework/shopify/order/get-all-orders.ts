import {
    normalizeProduct, 
    getAllProductsQuery ,
    getAllOrdersQuery
} from "../utils";

import { OrderConnection, ProductConnection } from "../schema";
import { Product } from "@common/types/product";
import { ApiConfig } from "@common/types/api";

type ReturnType = {
    orders: Partial<OrderConnection>
}


const getAllOrders = async(config: ApiConfig): Promise<any[]> => {

    const { data } = await config.fetch<ReturnType>({
        query: getAllOrdersQuery
    });
console.log(data);

    const orders = data.orders.edges

    return orders
}

export default getAllOrders