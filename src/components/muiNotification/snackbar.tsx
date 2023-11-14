import { useState, useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

interface connexionMessage {
    message: string
    fire: boolean
}


function FireOfflineNotifications() {

    const [open, setOpen] = useState<connexionMessage>({
        message: '',
        fire: false
    })

    const { message, fire } = open

    useEffect(() => {
        const handleOnline = () => {
            setOpen({
                message: 'Connection extablished!',
                fire: true
            })

        }
        const handleOffline = () => {
            setOpen({
                message: 'Connection failed!',
                fire: true
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
            action={
                <>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            }
        />
    )

}

export default FireOfflineNotifications

