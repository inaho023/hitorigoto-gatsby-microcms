// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// Iframely
import Iframely from '../../components/Iframely'

// 自作コンポーネント
import SEO from '../../components/SEO'
import BlogPost from '../../components/BlogPost'

// クエリー
export const pageQuery = graphql`
  query blogDetailQuery($id: String!) {
    microcmsBlog(blogId: { eq: $id }) {
      blogId
      title
      datetime(formatString: "YYYYMMDD")
      category {
        id
        name
      }
      tags {
        id
        name
      }
      image {
        url
        width
        height
      }
      body
      codeClass {
        class
        user
      }
      galleries {
        gallery {
          id
          name
          display_name
          images {
            image {
              url
              width
              height
            }
          }
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
  return <BlogPost data={data} pageContext={pageContext} />
}

export default PageTemplate
