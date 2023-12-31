

import Link from 'next/link'
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded'
import RemoveCircleOutlineRounded from '@mui/icons-material/RemoveCircleOutlineRounded'
import DeleteIcon from '@mui/icons-material/Delete';
import { LineItem } from '@common/types/cart'
import { ButtonGroup, CardMedia, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import useRemoveItem from '@framework/cart/use-remove-item';
import { useUpdateItem } from '@common/cart';
import { ChangeEvent, useState } from 'react';

const CartItem = ({
  item,
  currencyCode
}: {
  item: LineItem
  currencyCode: string
}) => {

  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem()

  const [quantity, setQuantity] = useState(item.quantity)
  const price = (item.variant.price! * item.quantity) || 0;
  const { options } = item;

  const handleQuantityChange = async(val: number) => {
      // console.log(item.id);
      
      if (Number.isInteger(val) && val >= 0) {
        setQuantity(val);
        
        const p = await updateItem({
          id: item.id,
          variantId: item.variantId, 
          quantity: val
        })
        
      }
  }

  const handleQuantity = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);

    handleQuantityChange(val);
  }

  const incrementQuantity = async (n = 1) => {
    const  val = Number(quantity) + n

    handleQuantityChange(val);

  }

  return (

        <div className='cart-item-wrapper ' onClick={(e)=> {e.stopPropagation()}}
        > 
      <div className='cart-item-container flex-row justify-between'>
       
          <div>        
            <Link href={`/store/products/product/t-shirt${item.path}`}>
              <CardMedia 
              component="img"
              alt="something"
              onClick={() => {}}
              className="cart-item-sidebar-image"
              src={item.variant.image!.url}
              />        
            </Link>
          </div>


          <div className='flex flex-col'>

            <div className='cart-item-name-qty-container '>
                        
              <div className=''>
                <Typography variant='body1' component="div" className='gradient-text-category'>
                  ${item.name}
                </Typography>            
              </div>

              
              <div>
                <Typography variant='body1' component="div"  className='gradient-text-category'>
                  {price}
                </Typography>            
              </div>



            </div> 
          
            <div className='w-full text-left flex flex-col'>
              {/* <Typography sx={{color: grey[900]}}></Typography> */}

              {
                options && options.length > 0 &&
                (options.map((option) => {
                  const value = option.values[0]
                  return (
                  <>
                  <div style={{color: "#000"}} className=''>
                    {value.label}
                    {value.hexColor}
                  </div>
                  
                  </>
                  )
                }
                  
                ))
              }
            </div>

            <div className='flex justify-between items-center'>
              <ButtonGroup className='w-[45%] gap-3 items-center'>
                
                <div onClick={()=>{
                  incrementQuantity(-1)
                }}>
                  <RemoveCircleOutlineRounded sx={{color: grey[900]}}/>
                </div>
                  
                  <TextField size='small' variant='outlined' onChange={handleQuantity} value={quantity} sx={{color: grey[900]}} />
                
                  <div onClick={()=>{
                  incrementQuantity(+1)
                  }}>
                    <AddCircleOutlineRounded sx={{color: grey[900]}}/>
                  </div>                
                  
                
              </ButtonGroup>

              <div className='w-[10%]'
              onClick={() => {
              removeItem({id: item.id})
              }}
              >
                <DeleteIcon  sx={{color: grey[900]}}/>
              </div>
            </div>

          </div>
           
          
          

        </div>
      </div>




  )
}

export default CartItem