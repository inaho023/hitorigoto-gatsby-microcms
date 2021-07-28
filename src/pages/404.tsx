// React
import * as React from 'react'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import styles from '../styles/E404.module.scss'

// 404ページ
const E404 = () => {
  const sitePosition = '404'
  return (
    <Layout sitePosition={sitePosition}>
      <div className={styles.post}>
        <h2>404 | ページがありません</h2>
      </div>
    </Layout>
  )
}

export default E404
