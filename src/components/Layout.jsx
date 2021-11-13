// React
import React from 'react'
import { Helmet } from 'react-helmet'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material//Box'
import Fab from '@mui/material/Fab'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiNavigation } from '@mdi/js'

// 自作コンポーネント
import Menubar from './Menubar'
import ArchiveMenu from './ArchiveMenu'
import CategoryMenu from './CategoryMenu'
import TagCloud from './TagCloud'

// 定数
import { BLOG_LOGO_URL, BLOG_LOGO_OGP } from './Constant'

// スタイルシート
import * as styles from '../styles/Layout.module.scss'

// テーマ

// Layout コンポーネント
const Layout = ({ sitePosition, ogp, pageContext, children }) => {
  // クエリー実行
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          title
          subtitle
          description
          lang
        }
      }
    }
  `)
  // OGP設定
  const ogpUrl = ogp && data.site.siteMetadata.siteurl + ogp.url
  const ogpSiteName = ogp && data.site.siteMetadata.title + ' ' + data.site.siteMetadata.subtitle
  const ogpTitle = ogp && ogp.type === 'website' ? 'インデックス' + (ogp.title && ' ' + ogp.title) + (pageContext.pageNumber == 0 ? '' : ' ' + pageContext.pageNumber + 'ページ') : ogp.title
  const ogpImage = ogp && ogp.type === 'website' ? BLOG_LOGO_URL + BLOG_LOGO_OGP : ogp.image
  // リターン
  return (
    <>
      <Helmet htmlAttributes={{ lang: data.site.siteMetadata.lang, prefix: 'og: http://ogp.me/ns#' }}>
        <title>{(sitePosition && sitePosition + ' - ') + data.site.siteMetadata.title + ' ' + data.site.siteMetadata.subtitle}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {ogp && <meta property='og:type' content={ogp.type} />}
        {ogp && <meta property='og:url' content={ogpUrl} />}
        {ogp && <meta property='og:site_neme' content={ogpSiteName} />}
        {ogp && <meta property='og:title' content={ogpTitle} />}
        {ogp && <meta property='og:image' content={ogpImage} />}
        {ogp && <meta property='og:image:width' content='1200' />}
        {ogp && <meta property='og:image:height' content='630' />}
        {ogp && <meta property='og:image:alt' content={ogpTitle} />}
        {ogp && <meta name='twitter:card' content='Summary' />}
        {ogp && <meta name='twitter:site' content='@inaho_lx' />}
      </Helmet>
      <Menubar id={'Header'} />
      <Container maxWidth={'xl'}>
        <header className={styles.header}>
          <Link key={'Header'} className={styles.title} to='/'>
            <h1>{data.site.siteMetadata.title}</h1>
            <h2>{data.site.siteMetadata.subtitle}</h2>
          </Link>
          <p className={styles.description}>{data.site.siteMetadata.description}</p>
        </header>
        <article>{children}</article>
        <section id={'Bottom'}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <ArchiveMenu />
            </Grid>
            <Grid item xs={12} md={3}>
              <CategoryMenu />
            </Grid>
            <Grid item xs={12} md={6}>
              <TagCloud />
            </Grid>
          </Grid>
        </section>
        <footer className={styles.footer}>
          <Link key={'Footer'} to='/'>
            &copy; {data.site.siteMetadata.title}
          </Link>
        </footer>
      </Container>
      <Box className={styles.float}>
        <Fab href={'#Header'}>
          <Icon path={mdiNavigation} size={1} title={'先頭へ'} />
        </Fab>
      </Box>
    </>
  )
}

export default Layout
