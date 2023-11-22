
// import { handler } from "@framework/cart/use-add-item";
import { 
    useHook, 
    useMutationHook 
} from "@common/utils/use-hook";

const useAddItem = () => {
    const hook = useHook((hooks) => { 
        return hooks.cart.useAddItem
    })

    return useMutationHook({...hook})
}

export default useAddItem