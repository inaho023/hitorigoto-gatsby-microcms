// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// Iframely
import Iframely from '../components/Iframely'

// 自作モジュール
import SEO from '../components/SEO'
import PagePost from '../components/PagePost'

// クエリー実行
export const query = graphql`
  query pageDetailQuery($id: String!) {
    microcmsPage(pageId: { eq: $id }) {
      pageId
      title
      datetime(formatString: "YYYYMMDD")
      body
      image {
        imgixImage {
          gatsbyImageData(
            imgixParams: { fit: "crop", crop: "faces", fm: "webp", q: 40, width: 960, height: 720 }
            placeholderImgixParams: { fit: "crop", crop: "faces", fm: "webp", q: 40, width: 960, height: 720 }
            placeholder: BLURRED
            width: 960
            height: 720
            layout: CONSTRAINED
          )
        }
      }
    }
  }
`
// ヘッダー
export const Head = ({ location, pageContext }) => {
  return (
    <>
      <SEO location={location} pageContext={pageContext} />
      <Iframely />
    </>
  )
}

// ページテンプレート
const PageTemplate = ({ data, pageContext }) => {
  // リターン
  return <PagePost data={data} pageContext={pageContext} />
}

export default PageTemplate
