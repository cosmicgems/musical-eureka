import React, {createContext, 
  useContext, 
  useState, 
  useEffect} from "react";
import { toast } from 'react-hot-toast'
import { useRouter } from "next/router";
import { getArticles, getCategories, getSubcategories, getTags, getUsers } from '../sanity/query functions/query';




const Context = createContext();

export const StateContext = ({ children }) => {



  const initialState = [];
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(initialState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [industryHoverName, setIndustryHoverName] = useState('');
  const [pageName, setPageName] = useState('');
  const [hrefContext, setHrefContext] = useState('');
  const [pageSlug, setPageSlug] = useState('');

  const [subcategories, setSubcategories] = useState();
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [subNavbar, setSubNavbar] = useState([])

  let pathSegment = pageName === "/" ? "home" : pageName.split("/")[1]

  console.log(pathSegment);
  

  const router = useRouter();


  let foundProduct;
  let index;

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const categories = await getCategories();
        // Filter the categories to find the one with the matching name
        const matchingCategory = categories.find((category) => category.name.toLocaleLowerCase() === pathSegment.toLocaleLowerCase());
        if (matchingCategory) {
          // Set the subcategories to the matching category's subcategories
          setSubcategories(matchingCategory.subcategories);
        } else {
          // If no matching category is found, reset the subcategories to an empty array
          setSubcategories([]);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        // Handle error, e.g., setSubcategories to an empty array or show an error message
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [pathSegment]);

  useEffect(()=> {
    setPageName(router.pathname);
    const p_slug = pageName.slice(1)
    setPageSlug(p_slug);
    console.log(pageName);
  }, [setPageName, router, pageName, setPageSlug])


  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart-items"));
    const cartQty = JSON.parse(localStorage.getItem("cart-total-qty"))
    if (cartData) {
      setCartItems(cartData);
      setTotalQuantities(cartQty)
    }
  }, [setCartItems]);

  useEffect(() => {
    if (cartItems !== initialState) {
      let cart_num = 0
      localStorage.setItem("cart-items", JSON.stringify(cartItems));
      
      cartItems.map((item) => {
        cart_num = cart_num + item.quantity;
      })
      localStorage.setItem("cart-total-qty", JSON.stringify(cart_num));
    }
  }, [cartItems, initialState, totalQuantities]);
  
  const onAdd = (product, quantity) => {
      const checkProductInCart = cartItems.find((item) => item._id === product._id);
      
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
      
      if(checkProductInCart) {
        const updatedCartItems = cartItems.map((cartProduct) => {
          if(cartProduct._id === product._id) return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        })
  
        setCartItems(updatedCartItems);
      } else {
        product.quantity = quantity;
        
        setCartItems([...cartItems, { ...product }]);
      }
      setQty(1)
      toast.success(`${qty} ${product.name} added to the cart.`);
    } 
  
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
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
      <Context.Provider value={{showCart, setShowCart, cartItems, setCartItems, totalPrice, setTotalPrice, totalQuantities, setTotalQuantities, qty, setQty, incQty, decQty, onAdd, toggleCartItemQuantity, onRemove, industryHoverName, setIndustryHoverName, pageName, pageSlug, pathSegment, subcategories }}>
          {children}
      </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);