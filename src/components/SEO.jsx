// React
import React from 'react'
import { Helmet } from 'react-helmet'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// その他
import striptags from 'striptags'

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
  const site = data.site.siteMetadata
  const image = data.microcmsPicture
  // ウォーターマーク取得
  const imageWatermark = imgixWatermark()
  // メタ情報
  const metaData = {
    title: `${misc.position && misc.position + ' - '} {site.title} ${site.subtitle}`,
    description: misc.ogpInfo.type === 'website' ? `${site.title} ${site.subtitle}${misc.ogpInfo.title && ' ' + misc.ogpInfo.title}${pageContext.pageNumber == 0 ? '' : ` ${pageContext.pageNumber}ページ`}` : misc.ogpInfo.title
  }
  // OGP設定
  const ogpData = {
    type: misc.ogpInfo.type,
    url: site.siteUrl + misc.ogpInfo.url,
    site: site.title + ' ' + site.subtitle,
    title: misc.ogpInfo.type === 'website' ? `${site.title} ${site.subtitle}${misc.ogpInfo.title && ' ' + misc.ogpInfo.title}${pageContext.pageNumber == 0 ? '' : ` ${pageContext.pageNumber}ページ`}` : misc.ogpInfo.title,
    image: misc.ogpInfo.type === 'website' ? `${image.picture.url}?${image.parameter}${imageWatermark.xl}` : misc.ogpInfo.image + imageWatermark.xl,
    description: striptags(misc.ogpInfo.description)
  }
  // リターン
  return (
    <Helmet htmlAttributes={{ lang: site.lang, prefix: 'og: http://ogp.me/ns#' }}>
      <title>{metaData.title}</title>
      <meta name='description' content={metaData.description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {misc.ogpInfo && <meta property='og:type' content={ogpData.type} />}
      {misc.ogpInfo && <meta property='og:url' content={ogpData.url} />}
      {misc.ogpInfo && <meta property='og:site_neme' content={ogpData.site} />}
      {misc.ogpInfo && <meta property='og:title' content={ogpData.title} />}
      {misc.ogpInfo && <meta property='og:description' content={ogpData.description} />}
      {misc.ogpInfo && <meta property='og:image' content={ogpData.image} />}
      {misc.ogpInfo && <meta property='og:image:alt' content={ogpData.title} />}
      {misc.ogpInfo && <meta name='twitter:card' content='summary_large_image' />}
      {misc.ogpInfo && <meta name='twitter:site' content={socialAccount.twitter.account} />}
      {misc.ogpInfo && <meta name='twitter:creator' content={socialAccount.twitter.account} />}
    </Helmet>
  )
}

export default SEO
