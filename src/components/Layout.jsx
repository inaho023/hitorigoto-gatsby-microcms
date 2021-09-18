// React
import React from 'react'
import { Helmet } from 'react-helmet'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiNavigation } from '@mdi/js'

// 自作コンポーネント
import Menubar from './Menubar'
import ArchiveMenu from './ArchiveMenu'
import CategoryMenu from './CategoryMenu'
import TagCloud from './TagCloud'

// スタイルシート
import * as styles from '../styles/Layout.module.scss'

// Layout コンポーネント
const Layout = ({ sitePosition, children }) => {
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
  // リターン
  return (
    <>
      <Helmet htmlAttributes={{ lang: data.site.siteMetadata.lang }}>
        <title>{(sitePosition && sitePosition + ' - ') + data.site.siteMetadata.title + ' ' + data.site.siteMetadata.subtitle}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={data.site.siteMetadata.description} />
      </Helmet>
      <a id={'Header'} />
      <Menubar />
      <Container className={styles.container} maxWidth={'xl'}>
        <header className={styles.header}>
          <Link key={'Header'} className={styles.title} to='/'>
            <a>
              <h1>{data.site.siteMetadata.title}</h1>
              <h2>{data.site.siteMetadata.subtitle}</h2>
            </a>
          </Link>
          <p className={styles.description}>{data.site.siteMetadata.description}</p>
        </header>
        <article>
          <Box className={styles.main}>{children}</Box>
        </article>
        <section id={'Bottom'} className={styles.bottom}>
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
            <a>&copy; {data.site.siteMetadata.title}</a>
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
