// React
import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// その他
import striptags from 'striptags'

// 自作ライブラリー
import { imgixWatermark } from '../libs/Util'
import { imgixImageOption, socialAccount } from '../libs/Constant'

// SEO コンポーネント
const SEO = ({ location, pageContext }) => {
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
      allMicrocmsPicture(filter: { pictureId: { in: ["404", "ogp-no-picture"] } }) {
        edges {
          node {
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
      }
    }
  `)
  // サイト情報
  const site = data.site.siteMetadata
  // 画像情報
  const images = data.allMicrocmsPicture.edges
  let img404 = {}
  let imgOGP = {}
  images.forEach(image => {
    switch (image.node.pictureId) {
      case '404':
        img404 = image.node
        break
      case 'ogp-no-picture':
        imgOGP = image.node
        break
    }
  })
  // ウォーターマーク取得
  const imageWatermark = imgixWatermark()
  // ページ種別による場合分け
  let pageInfo = {}
  switch (pageContext.type) {
    case 'article':
      // ページ情報
      pageInfo = {
        type: pageContext.type,
        url: location.pathname,
        site: site.title + ' ' + site.subtitle,
        position: pageContext.post.title,
        title: `${pageContext.post.title} - ${site.title} ${site.subtitle}`,
        description: striptags(pageContext.post.body),
        image: pageContext.post.image && pageContext.post.image.url + imgixImageOption.ogp + imageWatermark.l
      }
      break
    case 'website':
      // ページ情報
      pageInfo = {
        type: pageContext.type,
        url: site.siteUrl + location.pathname,
        site: site.title + ' ' + site.subtitle,
        position: pageContext.name,
        title: `${site.title} ${site.subtitle}${pageContext.name ? ` ${pageContext.name}` : ''}${
          pageContext.pageNumber !== 0 ? ` ${pageContext.pageNumber}ページ` : ''
        }`,
        description: 'インデックスページ',
        image: `${imgOGP.picture.url}?${imgOGP.parameter}${imageWatermark.xl}`
      }
      break
    default:
      pageInfo = {
        type: 'article',
        url: location.pathname,
        site: site.title + ' ' + site.subtitle,
        position: '404',
        title: `404 - ${site.title} ${site.subtitle}`,
        description: 'ページがないよ。',
        image: `${img404.picture.url}?${img404.parameter}${imageWatermark.xl}`
      }
      break
  }
  // リターン
  return (
    <>
      <title>{pageInfo.title}</title>
      <meta name='description' content={pageInfo.description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:type' content={pageInfo.type} />
      <meta property='og:url' content={pageInfo.url} />
      <meta property='og:site_neme' content={pageInfo.site} />
      <meta property='og:title' content={pageInfo.title} />
      <meta property='og:description' content={pageInfo.description} />
      <meta property='og:image' content={pageInfo.image} />
      <meta property='og:image:alt' content={pageInfo.title} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={socialAccount.twitter.account} />
      <meta name='twitter:creator' content={socialAccount.twitter.account} />
    </>
  )
}

export default SEO
