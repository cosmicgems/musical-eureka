import React, {createContext, 
  useContext, 
  useState, 
  useEffect} from "react";
import { toast } from 'react-hot-toast'
import { useRouter } from "next/router";
import { appItems } from "../public/assets/appItems";
// import { useAddItem } from "@common/cart";




const Context = createContext();

export const StateContext = ({ children }) => {


  // const addItem = useAddItem();
  const initialState = [];
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(initialState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [industryHoverName, setIndustryHoverName] = useState('');
  const [pageName, setPageName] = useState('');
  const [pageSlug, setPageSlug] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [tax, setTax] = useState(0.06)

  const [subcategories, setSubcategories] = useState();

  let pathSegment = pageName === "/" ? "home" : pageName.split("/")[1]
  let appName = pathSegment === "apps" ? pageName.split("/")[2] : null

  // console.log(appName);
  // console.log(appItems[appName]);

  const router = useRouter();
  // console.log(router.pathname);

  let foundProduct;
  let index;

  useEffect(()=> {
    setPageName(router.pathname);
    const p_slug = pageName.slice(1)
    setPageSlug(p_slug);
    // console.log(pageName);
  }, [setPageName, router, pageName, setPageSlug])


  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart-items"));
    const cartQty = JSON.parse(localStorage.getItem("cart-total-qty"));
    const cartGrandTotal = JSON.parse(localStorage.getItem("cart-total"));
    if (cartData) {
      setCartItems(cartData);
      setTotalQuantities(cartQty);
      setCartTotal(cartGrandTotal);
    }
  }, [setCartItems]);


  useEffect(() => {
    if (cartItems !== initialState) {
      let cart_num = 0
      let total = 0
      localStorage.setItem("cart-items", JSON.stringify(cartItems));
      
      cartItems.map((item) => {
        // console.log(item.quantity)
        cart_num = cart_num + item.quantity;
        total = Number(item.node.priceRange.maxVariantPrice.amount * item.quantity) + total
      })
      localStorage.setItem("cart-total-qty", JSON.stringify(cart_num));
      localStorage.setItem("cart-total", JSON.stringify(total))
      setCartTotal(total);
    }
  }, [cartItems, initialState, totalQuantities]);



  const onAdd = (product, quantity) => {

    // const output = addItem(product)
    // alert(JSON.stringify(output));
    
    const checkProductInCart = cartItems.some((item) => item.node.id === product.node.id);
      console.log(checkProductInCart);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.node.priceRange.maxVariantPrice.amount * quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
      
      if(checkProductInCart) {
        console.log(cartItems);
        const updatedCartItems = cartItems.map((cartProduct) => {
          if(cartProduct.node.id === product.node.id) return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
          return cartProduct;
        })
  
        setCartItems(updatedCartItems);
      } else {

        let newCartItem = {};
        newCartItem.product = product; 
        
        setCartItems([...cartItems, { ...product, quantity }]);
      }
      console.log(cartItems);
      setQty(quantity);
      
      toast.success(`${quantity} ${product.node.title} added to the cart.`);
  } 


  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.node.id === product.node.id);
    const newCartItems = cartItems.filter((item) => item.node.id !== product.node.id);
console.log(foundProduct);
    setCartTotal((prevTotalPrice) => prevTotalPrice - (Number(foundProduct.node.priceRange.maxVariantPrice.amount) * foundProduct.quantity));
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }


  const toggleCartItemQuantity = (id, value) => {
    const itemIndex = cartItems.findIndex((item) => item.node.id === id);
    foundProduct = cartItems.find((item) => item.node.id === id)
    let newCartItems = cartItems.filter((item) => item.node.id !== id)

    
    foundProduct.quantity = (value === "inc") ? foundProduct.quantity + 1 : (value === "dec") && foundProduct.quantity > 1 ? foundProduct.quantity - 1 : foundProduct.quantity ;
    console.log("found-products:",foundProduct);
    newCartItems.splice(itemIndex, 0, foundProduct )
    console.log("new-cart-items:", newCartItems);

    if(value === 'inc') {
      setCartItems(newCartItems);
      setCartTotal((prevTotalPrice) => prevTotalPrice + Number(foundProduct.node.priceRange.maxVariantPrice.amount))
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems(newCartItems);
        setCartTotal((prevTotalPrice) => prevTotalPrice - Number(foundProduct.node.priceRange.maxVariantPrice.amount))
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }


  const incQty = () => {
      setQty((prevQty) => prevQty + 1);
  }


  const decQty = () => {
      setQty((prevQty) => {
          if(prevQty - 1 < 1 ) return 1;

          return prevQty - 1
      });
  }

  return (

      <Context.Provider value={{showCart, cartTotal, setShowCart, cartItems, setCartItems, totalPrice, setTotalPrice, totalQuantities, setTotalQuantities, qty, setQty, incQty, decQty, onAdd, toggleCartItemQuantity, onRemove, industryHoverName, setIndustryHoverName, pageName, pageSlug, pathSegment, subcategories, appName, discount, setDiscount, shippingCost, setShippingCost, tax, setTax }}>
          {children}
      </Context.Provider>

  )
}

export const useStateContext = () => useContext(Context);