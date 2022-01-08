// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

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
import SEO from './SEO'

// スタイルシート
import * as styles from '../styles/Layout.module.scss'

// Layout コンポーネント
const Layout = ({ misc, pageContext, children }) => {
  // リターン
  return (
    <>
      {' '}
      <SEO misc={misc} pageContext={pageContext} />
      <Menubar />
      <Container maxWidth={'xl'}>
        <a id={'Header'} href={'/'} />
        <header className={styles.header}>
          <Link key={'Header'} className={styles.title} to='/'>
            <h1>{pageContext.info.site.title}</h1>
            <h2>{pageContext.info.site.subtitle}</h2>
          </Link>
          <p className={styles.description}>{pageContext.info.site.description}</p>
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
            &copy; {pageContext.info.site.title}
          </Link>
        </footer>
        <Box className={styles.float}>
          <Fab href={'#Header'}>
            <Icon path={mdiNavigation} size={1} title={'先頭へ'} />
          </Fab>
        </Box>
      </Container>
    </>
  )
}

export default Layout
