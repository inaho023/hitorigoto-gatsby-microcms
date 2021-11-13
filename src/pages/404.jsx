// React
import React from 'react'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import * as styles from '../styles/404.module.scss'

// 404ページ
const E404 = ({ pageContext }) => {
  // ポジション
  const sitePosition = '404'
  // OGP設定
  const ogp = {
    type: 'article',
    title: sitePosition
  }
  return (
    <Layout sitePosition={sitePosition} ogp={ogp} pageContext={pageContext}>
      <div className={styles.post}>
        <h2>404 | ページがありません</h2>
      </div>
    </Layout>
  )
}

export default E404
