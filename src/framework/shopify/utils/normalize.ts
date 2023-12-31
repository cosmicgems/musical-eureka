
import { Collection, CollectionAndProducts } from "@common/types/Collection";
import {
    ImageEdge,
    Product as ShopifyProduct,
    MoneyV2,
    ProductOption,
    ProductVariantConnection,
    SelectedOption,
    Checkout,
    CheckoutLineItemEdge,
    Collection as ShopifyCollection
} from "../schema";
import { Cart, LineItem } from "@common/types/cart";
import { Product } from "@common/types/product";

export const normalizeCart = (checkout: Checkout): Cart => {
    return {
        id: checkout.id,
        createdAt: checkout.createdAt,
        completedAt: checkout.completedAt,
        currency: {
            code: checkout.totalPriceV2.currencyCode
        },
        taxesIncluded:  checkout.taxesIncluded,
        lineItemsSubtotalPrice: +checkout.subtotalPriceV2.amount,
        totalPrice: +checkout.totalPriceV2.amount,
        lineItems: checkout.lineItems.edges.map(normalizeLineItem),
        discounts: []
    }
}

const normalizeLineItem = ({
    node: { id, title, quantity, variant, ...rest}
}: CheckoutLineItemEdge): LineItem => {
    
    
    return {
        id,
        variantId: String(variant?.id),
        productId: String(variant?.id),
        quantity: Number(quantity),
        name: title,
        discounts: [],
        path: variant?.product?.handle ?? "",
        options: variant?.selectedOptions.map(({name, value}: SelectedOption) => {
            const option = normalizeProductOption({
                id,
                name,
                values: [value]
            })

            return option
        }),
        variant: {
            id: String(variant?.id),
            sku: variant?.sku ?? "",
            name: variant?.title,
            product: {
                name: variant?.product.title,
                id: variant?.product.id,
                description: variant?.product.description
            },
            image: {
                url: process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local" ?
                `/images/${variant?.image?.originalSrc}` : 
                variant?.image?.originalSrc ?? "/product-image-placeholder.svg"
            },
            requiresShipping: variant.requiresShipping ?? false,
            price: variant?.priceV2.amount,
            listPrice: variant?.compareAtPriceV2?.amount,
        },
        ...rest
    }
}


const normalizeProductImages = ({edges}: {edges: Array<ImageEdge>}) => 
    edges.map(({node: { originalSrc: url, ...rest}}) => ({
        url: process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local" ?
        `/images/${url}` : 
        url ?? "/product-image-placeholder.svg",
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
    const normalized = {
        id, 
        displayName,
        values: values.map(value => {
            let output: any =  {
                label: value
            }

            if (displayName.match(/colou?r/gi)) {
                output = {
                    ...output,
                    hexColor: value
                }
            }
            return output
        })
    }
    return normalized
}

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {

    return edges.map(({node}) => {
        const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node;

        return {
            id, 
            name: "title",
            sku: sku || id,
            price: +priceV2.amount,
            listPrice: +compareAtPriceV2?.amount ?? null,
            requiresShipping: true, 
            options: selectedOptions.map(({name, value}: SelectedOption) => {
                const option = normalizeProductOption({
                    id,
                    name,
                    values: [value]
                })

                return option
            })
        }
    })
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
        variants,
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
        variants: variants ?
            normalizeProductVariants(variants) : [],
        ...rest
    }
    // console.log(product);
    
    return product
}

export function normalizeCollection(collectionNode: ShopifyCollection): Collection {
    const { 
        id,
        title,
        handle,
        image,
        description,
        updatedAt,
    } = collectionNode;
    
    const collection = {
        id,
        name: title,
        path: `/store/products/collections/collection/${handle}`,
        image,
        description,
        updatedAt,
    }


    return collection
}


export function normalizeCollectionAndProducts(collectionNode: ShopifyCollection): CollectionAndProducts {
    const { 
        id,
        title,
        handle,
        image,
        description,
        products
    } = collectionNode;
    
    const collection = {
        id,
        name: title,
        handle,
        path: `/store/products/collections/collection/${handle}`,
        image,
        description,
        products: products.edges.map(({node:product}) => normalizeProduct(product))
    }


    return collection
}