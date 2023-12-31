/* eslint-disable react-hooks/rules-of-hooks */

import { useApiProvider } from "@common"
import useCart, { UseCart } from "@common/cart/use-cart"
import { Cart } from "@common/types/cart"
import { SWRHook } from "@common/types/hooks"
import { Checkout } from "@framework/schema"
import {
  checkoutToCart,
  createCheckout,
  getCheckoutQuery
} from "@framework/utils"
import Cookies from "js-cookie"
import { getSession, useSession } from "next-auth/react"
import { useMemo } from "react"
import { Session } from "src/utility/types/Session"

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string
  }
  fetcherOutput: {
    node: Checkout
  }
  data: Cart
}

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    // get checkout query
    query: getCheckoutQuery
  },
  async fetcher({
    fetch,
    options,
    input: { checkoutId }
  }) {
    let checkout: Checkout

    if (checkoutId) {
      const { data } = await fetch({
        ...options,
        variables: {
          checkoutId
        }
      })

      checkout = data.node
    } else {


      const session = await getSession() as Session ;
      const {user:{ _id: id, username, email}} = session as any;

      
      const variables = {
        
        id,
        username,
        email
      }

      
      console.log(`{ id: ${variables.id}, username: ${variables.username}, email: ${variables.email} }`);


      checkout = await createCheckout(fetch as any,variables )

    }

    const cart = checkoutToCart(checkout)
    return cart
  },


  useHook: ({useData}) => () => {
    const { checkoutCookie } = useApiProvider()
    const result = useData({
      swrOptions: {
        revalidateOnFocus: false
      }
    })

    if (result.data?.completedAt) {
      Cookies.remove(checkoutCookie)
    }
    return useMemo(() => {
      return {
        ...result,
        isEmpty: (result.data?.lineItems.length ?? 0) <= 0
      }
    }, [result])
  }
}