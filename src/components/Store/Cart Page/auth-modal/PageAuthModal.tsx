import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import LoginModal from './building-blocks/LoginModal';
import SignupModal from './building-blocks/SignupModal';
import { User } from 'src/utility/types/Session';
import { grey } from '@mui/material/colors';
import CheckoutComponent from '../CheckoutComponent';
import { LineItem } from '@common/types/cart';
import { GetRewarded } from './building-blocks/GetRewarded';

const style = {
    // position: 'absolute' as 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: grey[900],
    // boxShadow: 24,
    // p: 4,
};

const PageAuthModal = ({ session, cartItems, open, setOpen, }: { session: any, cartItems: LineItem[], open: boolean, setOpen: any, }) => {


    const [openCheckout, setOpenCheckout] = useState(false);
    const [checkingOut, setCheckingOut] = useState<boolean>(false)
    const [login, setLogin] = useState<boolean>(true);
    const [signup, setSignup] = useState<boolean>(false);
    const [guestCheckout, setGuestCheckout] = useState<boolean>(false);
    const [memberCheckout, setMemberCheckout] = useState<boolean>(false);
    const [startAuthorize, setStartAuthorize] = useState<boolean>(false);
    const [loggingIn, setLoggingIn] = useState<boolean>(true)
    const [signingUp, setSigningUp] = useState<boolean>(false)
    const [getRewarded, setGetRewarded] = useState<boolean>(true);

    const handleClose = () => { 
        if(getRewarded && session?.user === undefined) {
            setOpen(!open);
            return
        } else if (startAuthorize && session?.user === undefined) {
            if(loggingIn) {

            } else if (signingUp) {
                setLoggingIn(!loggingIn)
                setSigningUp(!signingUp)
            }
            setGetRewarded(!getRewarded);
            setStartAuthorize(!startAuthorize);
            setOpen(!open);
            return
        } 
        
    };

    const handleLogin = () => {}


    return (
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
            {
                getRewarded && session?.user === undefined  ?
                    <GetRewarded startAuthorize={startAuthorize} setStartAuthorize={setStartAuthorize} getRewarded={getRewarded} setGetRewarded={setGetRewarded} style={style} />
                :
                startAuthorize && session?.user === undefined ?
                    <>
                        {
                            loggingIn ?
                                <LoginModal 
                                startAuthorize={startAuthorize}
                                setStartAuthorize={setStartAuthorize}
                                handleClose={handleClose}
                                handleLogin={handleLogin} 
                                loggingIn={loggingIn} 
                                setLoggingIn={setLoggingIn} 
                                signingUp={signingUp} 
                                setSigningUp={setSigningUp}
                                /> 
                            :
                            signingUp ? 
                                <SignupModal 
                                startAuthorize={startAuthorize}
                                setStartAuthorize={setStartAuthorize}
                                handleClose={handleClose}
                                handleLogin={handleLogin} 
                                loggingIn={loggingIn} 
                                setLoggingIn={setLoggingIn} 
                                signingUp={signingUp} 
                                setSigningUp={setSigningUp} 
                                />
                            :
                            null                        
                        }
                    </>

                :
                ""
            }          
            </>


        </Modal>
    )
}

export default PageAuthModal