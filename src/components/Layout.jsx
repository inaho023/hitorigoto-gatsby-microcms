// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

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
import ArchiveMenu from './ArchiveMenu'
import CategoryMenu from './CategoryMenu'
import TagCloud from './TagCloud'

// スタイルシート
import * as styles from '../styles/Layout.module.scss'

// レイアウトコンポーネント
const Layout = ({ misc, pageContext, children }) => {
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
  // リターン
  return (
    <>
      <SEO misc={misc} pageContext={pageContext ? pageContext : null} />
      <a id={'Header'} />
      <Menubar />
      <Container maxWidth={'xl'}>
        <header className={styles.header} key={'Header'}>
          <Link key={'Header'} className={styles.title} to={'/'}>
            <h1>{data.site.siteMetadata.title}</h1>
            <h2>{data.site.siteMetadata.subtitle}</h2>
          </Link>
          <p className={styles.description}>{data.site.siteMetadata.description}</p>
        </header>
        <article className={styles.main}>{children}</article>
        <section id={'Bottom'}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <ArchiveMenu />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CategoryMenu />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
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
