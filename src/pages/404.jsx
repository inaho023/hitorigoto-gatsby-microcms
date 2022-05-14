// React
import React from 'react'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import * as styles from '../styles/404.module.scss'

// 404ページ
const E404 = () => {
  // OGP設定
  const ogp = {
    type: 'article',
    title: '404',
    description: 'ページがありません。'
  }
  // ページ情報設定
  const misc = { position: '404', crumbLabel: '404', ogp: ogp }
  // リターン
  return (
    <Layout misc={misc}>
      <div className={styles.post}>
        <h2>404 | ページがありません</h2>
      </div>
    </Layout>
  )
}

export default E404
