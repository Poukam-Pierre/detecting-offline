import { useState, useEffect, ReactElement } from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';

interface connexionMessage {
    message: string
    fire: boolean
    img?: ReactElement
}


function FireOfflineNotifications() {

    const [open, setOpen] = useState<connexionMessage>({
        message: '',
        fire: false
    })

    const { message, fire, img } = open

    useEffect(() => {
        const handleOnline = () => {
            setOpen({
                message: 'Connection extablished!',
                fire: true,
                img: <SignalWifiStatusbar4BarIcon style={{ color: 'white' }} />
            })

        }
        const handleOffline = () => {
            setOpen({
                message: 'Connection failed!',
                fire: true,
                img: <SignalWifiConnectedNoInternet4Icon style={{ color: 'white' }} />
            })

        }
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.addEventListener('online', handleOnline)
            window.addEventListener('offline', handleOffline)
        }
    }, [])


    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen({ ...open, fire: false });
    };

    return (
        <Snackbar
            open={fire}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            action={
                <>
                    <IconButton
                    >
                        {img}
                    </IconButton>
                </>
            }
        />
    )

}

export default FireOfflineNotifications

