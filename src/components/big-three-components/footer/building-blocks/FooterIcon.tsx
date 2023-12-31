import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const FooterIcon = ({path, icon}) => {
  return (
    <div>

      <Link href={path} target='_blank' >

        <Button>

          {icon}

        </Button>

      </Link>

    </div>
  )
}

export default FooterIcon