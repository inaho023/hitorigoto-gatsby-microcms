// React
import React, { useEffect, useState } from 'react'

// その他
import queryString from 'query-string'

// コンポーネント
import PagePost from '../../components/PagePost'

const PagePreview = ({ location }) => {
  const { contentId, draftKey } = queryString.parse(location.search)
  const [data, setData] = useState(null)

  // 記事詳細取得
  useEffect(() => {
    fetch(`https://inaho.microcms.io/api/page/${contentId}?draftKey=${draftKey}`, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY
      }
    })
      .then(res => res.json())
      .then(res => setData({ microcmsPage: res }))
  }, [])
  // リターン
  if (data === null) {
    return null
  }
  return <PagePost data={data} />
}

export default PagePreview
