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

// Layout コンポーネント
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
  const info = { site: data.site.siteMetadata, image: data.microcmsPicture }
  // リターン
  return (
    <>
      <SEO info={info} misc={misc} pageContext={pageContext} />
      <Menubar />
      <Container maxWidth={'xl'}>
        <header className={styles.header} id={'Header'} key={'Header'}>
          <Link key={'Header'} className={styles.title} to='/'>
            <h1>{info.site.title}</h1>
            <h2>{info.site.subtitle}</h2>
          </Link>
          <p className={styles.description}>{info.site.description}</p>
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
            &copy; {info.site.title}
          </Link>
        </footer>
      </Container>
      <Box className={styles.float}>
        <Fab className={styles.fab} href={'#Header'}>
          <Icon path={mdiNavigation} size={1} title={'先頭へ'} />
        </Fab>
      </Box>
    </>
  )
}

export default Layout
