import { AccountPageWrapper } from '@components/Store/account-page'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const AccountPage = ({session}) => {

  const router = useRouter();

  useEffect(()=>{
    if( session ) {
      router.push(`/store/account/${session?.user.username}`)
    }
  }, [session])

  useEffect(() => {
    if (!session) {
      router.push(`/store/account/create-account`);
    }    
  })


  
  

  return (
    
    <AccountPageWrapper>
      
      <div>

      </div>

    </AccountPageWrapper>

  )
}

export const getServerSideProps = async(ctx) => {

  const session = await getSession(ctx);

  console.log(session);
  

  return {
    props:{
      session
    }
  }
}

export default AccountPage