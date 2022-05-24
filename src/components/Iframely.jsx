// React
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

// Iframelyコンポーネント
const Iframely = () => {
  // Iframelyロード
  useEffect(() => {
    if (window.iframely) {
      window.iframely.load()
    }
  }, [])
  // リターン
  return (
    <Helmet>
      <script async src='https://cdn.iframe.ly/embed.js' />
    </Helmet>
  )
}

export default Iframely
