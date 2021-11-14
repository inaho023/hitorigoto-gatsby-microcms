// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
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
        url
        width
        height
      }
    }
  }
`

const PageTemplate = ({ data, pageContext }) => {
  // リターン
  return <PagePost data={data} pageContext={pageContext} />
}

export default PageTemplate
