// React
import React, { useEffect, useState } from 'react'

// その他
import queryString from 'query-string'

// 自作コンポーネント
import PagePost from '../../components/PagePost'
import Iframely from '../../components/Iframely'

// 自作ライブラリー
import { serviceEndpoint } from '../../libs/Constant'

const PagePreview = ({ location }) => {
  // コンテンツIDおよびドラフトキーを取得
  const { contentId, draftKey } = queryString.parse(location.search)
  //
  const [data, setData] = useState(null)
  // 記事詳細取得
  useEffect(() => {
    fetch(`${serviceEndpoint.microCMSPage.url}/${contentId}?draftKey=${draftKey}`, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.GATSBY_MICROCMS_API_KEY
      }
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        return setData({ microcmsPage: res })
      })
  }, [])
  // リターン
  if (data === null) {
    return null
  }
  // ページコンテキスト生成
  const pageContext = { type: 'article', id: data.microcmsPage.id, post: data.microcmsPage }
  // リターン
  return (
    <>
      <PagePost data={data} pageContext={pageContext} />
      <Iframely />
    </>
  )
}

export default PagePreview
