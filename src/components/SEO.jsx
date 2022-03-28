// React
import React from 'react'
import { Helmet } from 'react-helmet'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// 自作コンポーネント
import { imgixWatermark } from './Util'

// 定数
import { socialAccount } from './Constant'

// SEO コンポーネント
const SEO = ({ misc, pageContext }) => {
  // クエリー実行
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          title
          subtitle
          description
          lang
        }
      }
      microcmsPicture(pictureId: { eq: "ogp-no-picture" }) {
        pictureId
        title
        picture {
          url
          width
          height
        }
        parameter
      }
    }
  `)
  // ウォーターマークURL取得
  const imageWatermark = imgixWatermark()
  // OGP設定
  const ogpUrl = misc.ogp && data.site.siteMetadata.siteUrl + misc.ogp.url
  const ogpSiteName = misc.ogp && data.site.siteMetadata.title + ' ' + data.site.siteMetadata.subtitle
  const ogpTitle =
    misc.ogp && misc.ogp.type === 'website' ? `${data.site.siteMetadata.title} ${data.site.siteMetadata.subtitle}${misc.ogp.title && ' ' + misc.ogp.title}${pageContext.pageNumber == 0 ? '' : ` ${pageContext.pageNumber}ページ`}` : misc.ogp.title
  const ogpImage = misc.ogp && misc.ogp.type === 'website' ? `${data.microcmsPicture.picture.url}?${data.microcmsPicture.parameter}${imageWatermark.xl}` : misc.ogp.image + imageWatermark.xl
  // リターン
  return (
    <Helmet htmlAttributes={{ lang: data.site.siteMetadata.lang, prefix: 'og: http://ogp.me/ns#' }}>
      <title>{`${(misc.position && misc.position + ' - ') + data.site.siteMetadata.title} ${data.site.siteMetadata.subtitle}`}</title>
      <meta name='description' content={ogpTitle} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {misc.ogp && <meta property='og:type' content={misc.ogp.type} />}
      {misc.ogp && <meta property='og:url' content={ogpUrl} />}
      {misc.ogp && <meta property='og:site_neme' content={ogpSiteName} />}
      {misc.ogp && <meta property='og:title' content={ogpTitle} />}
      {misc.ogp && <meta property='og:description' content={misc.ogp.description} />}
      {misc.ogp && <meta property='og:image' content={ogpImage} />}
      {misc.ogp && <meta property='og:image:alt' content={ogpTitle} />}
      {misc.ogp && <meta name='twitter:card' content='summary_large_image' />}
      {misc.ogp && <meta name='twitter:site' content={socialAccount.twitter.account} />}
      {misc.ogp && <meta name='twitter:creator' content={socialAccount.twitter.account} />}
    </Helmet>
  )
}

export default SEO
