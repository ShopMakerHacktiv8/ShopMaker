import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import PWAPrompt from 'react-ios-pwa-prompt'

const InstallPage = () => {
  const [deferredPrompt, setD] = useState(null)

  const installApp = () => {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('user accepted the install prompt')
      } else {
        console.log('user dismissed the install prompt')
      }
    })
  }

  useEffect(() => {
    function handler(e) {
      e.preventDefault()
      setD(e)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  return (
    <Container className='vh-100 d-flex justify-content-center align-items-center'>
      <Button variant='success' onClick={installApp}>
        Download for Android
      </Button>
      <PWAPrompt />
    </Container>
  )
}

export default InstallPage
