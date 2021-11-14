// React
import React, { useEffect, useState } from 'react'

// その他
import queryString from 'query-string'

// コンポーネント
import BlogPost from '../../components/BlogPost'

const PagePreview = ({ location }) => {
  // コンテンツIDおよびドラフトキーを取得
  const { contentId, draftKey } = queryString.parse(location.search)
  //
  const [data, setData] = useState(null)
  // 記事詳細取得
  useEffect(() => {
    fetch(`https://inaho.microcms.io/api/v1/blog/${contentId}?draftKey=${draftKey}`, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY
      }
    })
      .then(res => res.json())
      .then(res => setData({ microcmsBlog: res }))
  }, [])
  // リターン
  if (data === null) {
    return null
  }
  return <BlogPost data={data} />
}

export default PagePreview
