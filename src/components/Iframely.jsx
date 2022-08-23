// React
import React, { useEffect } from 'react'

// Iframelyコンポーネント
const Iframely = () => {
  // Iframelyロード
  useEffect(() => {
    if (window.iframely) {
      window.iframely.load()
    }
  }, [])
  // リターン
  return <script async src='https://cdn.iframe.ly/embed.js' />
}

export default Iframely
