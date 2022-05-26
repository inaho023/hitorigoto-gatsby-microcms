// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作コンポーネント
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
// 記事詳細
const PageTemplate = ({ data, pageContext }) => {
  // リターン
  return <BlogPost data={data} pageContext={pageContext} />
}

export default PageTemplate
