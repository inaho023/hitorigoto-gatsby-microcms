// React
import React from 'react'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import * as styles from '../styles/404.module.scss'

// 404ページ
const E404 = ({ pageContext }) => {
  // OGP設定
  const ogp = {
    type: 'article',
    title: '404'
  }
  // ページ情報設定
  const misc = { position: '404', ogp: ogp }
  // リターン
  return (
    <Layout data={misc} pageContext={pageContext}>
      <div className={styles.post}>
        <h2>404 | ページがありません</h2>
      </div>
    </Layout>
  )
}

export default E404
