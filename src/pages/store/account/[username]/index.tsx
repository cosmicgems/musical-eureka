import Loading from '@components/Loading'
import { AccountPageWrapper } from '@components/Store/account-page'
import { AccDashboard, AccountPageSections, ContactUsForm, CustomerInfoForm, DeliveryAddressForm, OrderHistory, OrderTracking, RecentlyViewedProducts, RefundPolicy, ReturnPolicy } from '@components/Store/account-page/building-blocks'
import { Layout } from '@components/big-three-components'
import { getConfig } from '@framework/api/config'
import { getAllOrders } from '@framework/order'
import connectDB from 'lib/connectDB'
import User from 'lib/models/user'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Session } from 'src/utility/types/Session'
import { createAdminApiClient } from "@shopify/admin-api-client"
import { ADMIN_API_URL, ADMIN_TOKEN } from '@framework/const'
import { getAllOrdersQuery, getOrderQuery } from '@framework/utils'
import { Typography } from '@mui/material'
import { refundPolicy, returnPolicy } from 'public/assets/policies'

const AccountPage = ({ user, session:ses }) => {
console.log(ses);


  const {data:session, status} = useSession() as Session;
  const router = useRouter();

  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [verified, setVerified] = useState<boolean>(null);
  const [view, setView] = useState<string>("Account Information");

  const handleUserDataUpdate = (updatedData) => {
    
    setUpdatedUserData(updatedData);
    console.log(updatedUserData);
    
  };
  

  const sessionCheck = async() => {
    if(session?.user._id ) {
        setVerified(true);
        return true
    } else if (!session?.user._id){
        setVerified(false)
        return false
    }
  }

  if(status === "loading" ) {
      return <Loading />
  }

  if(verified === null) {
      const authenticated = sessionCheck();
      if(!authenticated){
          router.push("auth/login")
      }
  }

  const AccountSectionView = () => {
    switch (view) {
      // case "Dashboard":

      //   return <AccDashboard user={user} onUserDataUpdate={handleUserDataUpdate} view={view} setView={setView} />
      //   break;
      case "Account Information":
        return <CustomerInfoForm user={user} onUserDataUpdate={handleUserDataUpdate} />
        break;
      case "Delivery Address":
        return <DeliveryAddressForm user={user} onUserDataUpdate={handleUserDataUpdate}  />
        break;
      case "Order History":
        return <OrderHistory />
        break;
      case "Order Tracking":
        return <OrderTracking />
        break;
      case "Recently Viewed Products":
        return <RecentlyViewedProducts products={user.recentlyViewed} />
        break;
      case "Refund Policy":
        return <RefundPolicy />
        break;
      case "Return Policy":
        console.log(returnPolicy);
        
        return <ReturnPolicy />
        break;
      case "Contact Us":
        return <ContactUsForm />
        break;
    
      default:
        break;
    }
  }
  
  const handleMenuClick = (section) => {
    setView(section)
    return
  }

  return (

    <Layout>
    
      <AccountPageWrapper>
        
        <div className='w-full mt-12 flex justify-end'>
          <Typography variant='h4' component="div" className='md:basis-5/6 md:w-5/6 gradient-text-home px-[3vw]'>
            {view}
          </Typography>
        </div>
          
          <div className='pt-6 md:flex h-full' >

            <div className="md:basis-1/6 h-full">
              <AccountPageSections handleMenuClick={handleMenuClick} />
            </div>

            <div className='md:basis-5/6 md:w-5/6'>

              {AccountSectionView()}


            </div>


            
          </div>

      </AccountPageWrapper>
      
    </Layout>

  )
}

export const getStaticPaths = async () => {
  await connectDB();
  const res = await User.find({}, 'username');
  const usernames = res.map((u) => u.username);

  const paths = usernames.map((username) => ({
    params: { username }
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { username } }, ctx) => {

  const client = createAdminApiClient({
    storeDomain: ADMIN_API_URL,
    apiVersion: '2023-10',
    accessToken: ADMIN_TOKEN,
  });

  const {data, errors, extensions} = await client.request(getAllOrdersQuery, {
  });
  await connectDB();
console.log(data.orders.edges[0].node.id);
const {data: d, errors: e, extensions: e2} = await client.request(getOrderQuery, {
  variables:{
    id: data.orders.edges[0].node.id
  }
});
console.log(d.order.fulfillmentOrders.nodes[0].lineItems);

  // const config = getConfig();
  // const orders = await getAllOrders(config)
  
  const user = await User.findOne({username});
  // console.log(orders);
  const session = await getSession(ctx)

  return {
    props: { user: JSON.parse(JSON.stringify(user)), session }
  }
}

export default AccountPage