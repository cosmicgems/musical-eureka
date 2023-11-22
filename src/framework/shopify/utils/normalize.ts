
import {
    ImageEdge,
    Product as ShopifyProduct,
    MoneyV2,
    ProductOption,
} from "../schema"
import { Product } from "@common/types/products";

const normalizeProductImages = ({edges}: {edges: Array<ImageEdge>}) => 
    edges.map(({node: { originalSrc: url, ...rest}}) => ({
            url: `/images/${url}`,
            ...rest
        }
    ))

const normalizeProductPrice = ({currencyCode, amount}: MoneyV2) => ({
    value: +amount,
    currencyCode
})

const normalizeProductOption = ({
    id, 
    name: displayName,
    values
}: ProductOption) => {
    console.log(id);
    console.log(displayName);
    console.log(values);
    return {id, displayName, values}
}

export function normalizeProduct(productNode: ShopifyProduct): Product {
    const {
        id,
        title: name,
        handle,
        vendor,
        description,
        images: imageConnection,
        priceRange,
        options,
        ...rest
    } = productNode;

    const product = {
        id,
        name,
        vendor,
        description,
        path: `/${handle}`,
        slug: handle.replace(/^\/+|\/+$/g, ""),
        images: normalizeProductImages(imageConnection),
        price: normalizeProductPrice(priceRange.minVariantPrice),
        options: options ? 
            options.filter(o => o.name !== "Title")
                .map(o => normalizeProductOption(o)) : 
        [],
        ...rest
    }

    return product
}