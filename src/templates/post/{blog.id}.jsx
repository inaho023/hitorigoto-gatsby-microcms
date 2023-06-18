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
        imgixImage {
          gatsbyImageData(
            imgixParams: {
              fit: "crop"
              crop: "faces"
              q: 40
              w: 960
              h: 720
              markbase: "https://images.microcms-assets.io/assets/"
              mark: "6bbffba8f6d74ebea8e8fb201b5ddd27/44ce136c755d4a91a9edecdebea58c45/Watermark.png"
              markalign: "bottom,center"
              markalpha: 40
              markscale: 25
            }
            placeholderImgixParams: { fit: "crop", crop: "faces", q: 40, w: 960, h: 720 }
            placeholder: BLURRED
            width: 960
            height: 720
            srcSetMaxWidth: 960
            srcSetMinWidth: 480
            layout: CONSTRAINED
          )
        }
      }
      body
      codeClass {
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
              imgixImage {
                gatsbyImageData(
                  imgixParams: {
                    fit: "crop"
                    crop: "faces, center"
                    q: 15
                    w: 480
                    h: 480
                    markbase: "https://images.microcms-assets.io/assets/"
                    mark: "6bbffba8f6d74ebea8e8fb201b5ddd27/44ce136c755d4a91a9edecdebea58c45/Watermark.png"
                    markalign: "bottom,center"
                    markalpha: 40
                    markscale: 25
                  }
                  placeholderImgixParams: { fit: "crop", crop: "faces, center", q: 15, w: 480, h: 480 }
                  placeholder: BLURRED
                  width: 480
                  height: 480
                  srcSetMaxWidth: 480
                  srcSetMinWidth: 240
                  layout: CONSTRAINED
                )
              }
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
