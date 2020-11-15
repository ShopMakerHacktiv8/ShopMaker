import React, { useEffect, useState } from 'react'
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
    <div>
      <button onClick={installApp}>Download App</button>
    </div>
  )
}

export default InstallPage
