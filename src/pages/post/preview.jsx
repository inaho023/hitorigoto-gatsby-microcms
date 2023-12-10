// React
import React, { useEffect, useState } from 'react'

// その他
import queryString from 'query-string'

// 自作コンポーネント
import BlogPost from '../../components/BlogPost'
import Iframely from '../../components/Iframely'

// 自作ライブラリー
import { serviceEndpoint } from '../../libs/Constant'

const PagePreview = ({ location }) => {
  // コンテンツIDおよびドラフトキーを取得
  const { contentId, draftKey } = queryString.parse(location.search)
  // ステート
  const [data, setData] = useState(null)
  // 記事詳細取得
  useEffect(() => {
    fetch(`${serviceEndpoint.microCMSBlog.url}/${contentId}?draftKey=${draftKey}`, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.GATSBY_MICROCMS_API_KEY
      }
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        return setData({ microcmsBlog: res })
      })
  }, [])
  // リターン
  if (!data) {
    return null
  }
  // ページコンテキスト生成
  const pageContext = { type: 'article', id: data.microcmsBlog.id, post: data.microcmsBlog }
  // リターン
  return (
    <>
      <Iframely />
      <BlogPost data={data} pageContext={pageContext} />
    </>
  )
}

export default PagePreview
