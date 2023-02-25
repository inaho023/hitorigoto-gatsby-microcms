// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import SEO from '../../components/SEO'
import BlogList from '../../components/BlogList'

// ページクエリー
export const pageQuery = graphql`
  query categoryIndexQuery($limit: Int!, $skip: Int!, $id: String!) {
    allMicrocmsBlog(
      limit: $limit
      skip: $skip
      sort: { fields: datetime, order: DESC }
      filter: { category: { id: { eq: $id } } }
    ) {
      edges {
        node {
          blogId
          title
          datetime(formatString: "YYYY.MM.DD")
          category {
            id
            name
          }
          image {
            imgixImage {
              gatsbyImageData(
                imgixParams: {
                  fit: "crop"
                  crop: "faces"
                  q: 20
                  w: 600
                  h: 400
                  markbase: "https://images.microcms-assets.io/assets/"
                  mark: "6bbffba8f6d74ebea8e8fb201b5ddd27/44ce136c755d4a91a9edecdebea58c45/Watermark.png"
                  markalign: "bottom,center"
                  markalpha: 40
                  markscale: 25
                }
                placeholderImgixParams: {
                  fit: "crop"
                  crop: "faces"
                  q: 20
                  w: 600
                  h: 400
                  markbase: "https://images.microcms-assets.io/assets/"
                  mark: "6bbffba8f6d74ebea8e8fb201b5ddd27/44ce136c755d4a91a9edecdebea58c45/Watermark.png"
                  markalign: "bottom,center"
                  markalpha: 40
                  markscale: 25
                }
                placeholder: BLURRED
                width: 600
                height: 400
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  }
`

// ヘッダー
export const Head = ({ location, pageContext }) => {
  return <SEO location={location} pageContext={pageContext} />
}

// ページテンプレート
const PageTemplate = ({ data, pageContext }) => {
  // リターン
  return <BlogList data={data} pageContext={pageContext} />
}

export default PageTemplate
