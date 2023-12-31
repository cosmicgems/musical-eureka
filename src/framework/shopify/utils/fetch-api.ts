import { ApiFetcherOptions, ApiFetcherResults } from "@common/types/api";
import { API_URL, STOREFRONT_TOKEN, ADMIN_API_URL, ADMIN_TOKEN } from "@framework/const"
import { getAllOrdersQuery } from "./queries";

const fetchApi = async <T>({
    query,
    variables } : ApiFetcherOptions
    ): Promise<ApiFetcherResults<T>>  => {
    //     console.log(query);
    // console.log(ADMIN_API_URL);        
    const url = query == getAllOrdersQuery ? ADMIN_API_URL : API_URL;
    const token = query == getAllOrdersQuery ? ADMIN_TOKEN : STOREFRONT_TOKEN;

    
    const res = await fetch(url!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": token!
        },
        body: JSON.stringify({
            query,
            variables
        })
    });
        
        const { data, errors } = await res.json()
        
        
        if(errors) {
            throw new Error(errors[0].message ?? errors)
        }

        return { data }
}

export default fetchApi

