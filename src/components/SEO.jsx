// React
import React from 'react'
import { Helmet } from 'react-helmet'

// SEO コンポーネント
const SEO = ({ misc, pageContext }) => {
  // OGP設定
  const ogpUrl = misc.ogp && pageContext.info.site.siteurl + misc.ogp.url
  const ogpSiteName = misc.ogp && pageContext.info.site.title + ' ' + pageContext.info.site.subtitle
  const ogpTitle = misc.ogp && misc.ogp.type === 'website' ? pageContext.info.site.title + ' ' + pageContext.info.site.subtitle + (misc.ogp.title && ' ' + misc.ogp.title) + (pageContext.pageNumber == 0 ? '' : ' ' + pageContext.pageNumber + 'ページ') : misc.ogp.title
  const ogpImage = misc.ogp && misc.ogp.type === 'website' ? pageContext.info.image.picture.url + '?' + pageContext.info.image.parameter : misc.ogp.image
  // リターン
  return (
    <Helmet htmlAttributes={{ lang: pageContext.info.site.lang, prefix: 'og: http://ogp.me/ns#' }}>
      <title>{(misc.position && misc.position + ' - ') + pageContext.info.site.title + ' ' + pageContext.info.site.subtitle}</title>
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
      {misc.ogp && <meta name='twitter:site' content='@inaho_lx' />}
      {misc.ogp && <meta name='twitter:creator' content='@inaho_lx' />}
    </Helmet>
  )
}

export default SEO
