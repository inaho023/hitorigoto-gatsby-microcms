// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

// Material-UI
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiNavigation } from '@mdi/js'

// 自作コンポーネント
import SEO from './SEO'
import Menubar from './Menubar'
import MiniPager from './MiniPager'
import ArchiveMenu from './ArchiveMenu'
import CategoryMenu from './CategoryMenu'
import TagCloud from './TagCloud'

// スタイルシート
import * as styles from '../styles/Layout.module.scss'

// Layout コンポーネント
const Layout = ({ misc, pageContext, crumbLabel, children }) => {
  // サイト情報
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
    }
  `)
  // パンくずリスト
  const {
    breadcrumb: { crumbs }
  } = pageContext
  // パンくずリスト
  const disableLinks = ['/archive', '/category', '/tag']
  const hiddenCrumbs = ['/page', '/post']
  // リターン
  return (
    <>
      <SEO misc={misc} pageContext={pageContext} />
      <Menubar />
      <Container maxWidth={'xl'}>
        <header className={styles.header} id={'Header'} key={'Header'}>
          <Link key={'Header'} className={styles.title} to={'/'}>
            <h1>{data.site.siteMetadata.title}</h1>
            <h2>{data.site.siteMetadata.subtitle}</h2>
          </Link>
          <p className={styles.description}>{data.site.siteMetadata.description}</p>
        </header>
        <Box className={styles.minibar}>
          <Breadcrumb crumbs={crumbs} crumbLabel={crumbLabel} crumbSeparator={' / '} disableLinks={disableLinks} hiddenCrumbs={hiddenCrumbs} />
          <Box className={styles.grow} />
          {misc.ogp.type === 'website' && <MiniPager className={styles.pager} pageContext={pageContext} />}
        </Box>
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
          <Link key={'Footer'} to={'/'}>
            &copy; {data.site.siteMetadata.title}
          </Link>
        </footer>
      </Container>
      <Box className={styles.float}>
        <Fab className={styles.fab} href={'#Header'}>
          <Icon path={mdiNavigation} size={1} title={'ページの先頭へ'} />
        </Fab>
      </Box>
    </>
  )
}

export default Layout
