// React
import React from 'react'
import { Helmet } from 'react-helmet'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// その他
import striptags from 'striptags'

// 自作ライブラリー
import { imgixWatermark } from '../libs/Util'
import { imgixImageOption, socialAccount } from '../libs/Constant'

// SEO コンポーネント
const SEO = ({ pageContext }) => {
  // pageContextが空の場合はリターン
  if (!pageContext) {
    return null
  }
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
  // ページ種別による場合分け
  let misc = {}
  switch (pageContext.type) {
    case 'article':
      // 汎用引数JSON
      misc = {
        // ポジション
        position: pageContext.post.title,
        // OGP設定
        ogpInfo: {
          type: 'article',
          url: '/post/' + pageContext.id + '/',
          title: pageContext.post.title,
          description: pageContext.post.body,
          image: pageContext.post.image && pageContext.post.image.url + imgixImageOption.ogp + imageWatermark.l
        }
      }
      break
    case 'website':
      switch (pageContext.list) {
        case 'archive':
        case 'category':
        case 'tag':
          // 汎用引数JSON
          misc = {
            // ポジション
            position: pageContext.name,
            // OGP設定
            ogpInfo: {
              type: 'website',
              url:
                pageContext.pageNumber == 0
                  ? `/${pageContext.list}/${pageContext.id}/`
                  : `/${pageContext.list}/${pageContext.id}/${pageContext.pageNumber}/`,
              title: pageContext.name,
              description: 'トップページ',
              image: ''
            }
          }
          break
        default:
          // 汎用引数JSON
          misc = {
            // ポジション
            position: 'ホーム',
            // OGP設定
            ogpInfo: {
              type: 'website',
              url: pageContext.pageNumber == 0 ? '/' : `/page/${pageContext.pageNumber}/`,
              title: '',
              description: 'トップページ',
              image: ''
            }
          }
          break
      }
      break
  }
  // メタ情報
  const metaData = {
    title: `${misc.position && misc.position + ' - '} ${site.title} ${site.subtitle}`,
    description:
      misc.ogpInfo.type === 'website'
        ? `${site.title} ${site.subtitle}${misc.ogpInfo.title && ' ' + misc.ogpInfo.title}${
            pageContext.pageNumber == 0 ? '' : ` ${pageContext.pageNumber}ページ`
          }`
        : misc.ogpInfo.title
  }
  // OGP設定
  const ogpData = {
    type: misc.ogpInfo.type,
    url: site.siteUrl + misc.ogpInfo.url,
    site: site.title + ' ' + site.subtitle,
    title:
      misc.ogpInfo.type === 'website'
        ? `${site.title} ${site.subtitle}${misc.ogpInfo.title && ' ' + misc.ogpInfo.title}${
            pageContext.pageNumber == 0 ? '' : ` ${pageContext.pageNumber}ページ`
          }`
        : misc.ogpInfo.title,
    image: misc.ogpInfo.type === 'website' ? `${image.picture.url}?${image.parameter}${imageWatermark.xl}` : misc.ogpInfo.image,
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
