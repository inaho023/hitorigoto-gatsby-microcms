// React
import * as React from 'react'
import Helmet from 'react-helmet'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'

// その他モジュール
import AnchorLink from 'react-anchor-link-smooth-scroll'

// 自作コンポーネント
import Menubar from './Menubar'
import ArchiveMenu from './ArchiveMenu'
import CategoryMenu from './CategoryMenu'
import TagCloud from './TagCloud'

// スタイルシート
import styles from '../styles/Layout.module.scss'

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
  // Font Awesome Icon
  library.add(faArrowAltCircleUp)
  // リターン
  return (
    <>
      <Helmet htmlAttributes={{ lang: data.site.siteMetadata.lang }}>
        <title>{(sitePosition && sitePosition + ' - ') + data.site.siteMetadata.title + data.site.siteMetadata.subtitle}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={data.site.siteMetadata.description} />
      </Helmet>
      <div className={styles.container}>
        <section id={'Header'} className={styles.header}>
          <header className={styles.title}>
            <Link key={'Header'} to='/'>
              <a>
                <h1>{data.site.siteMetadata.title}</h1>
              </a>
            </Link>
            <p className={styles.description}>{data.site.siteMetadata.description}</p>
          </header>
        </section>
        <Menubar />
        <article>
          <div className={styles.main}>{children}</div>
        </article>
        <section>
          <div className={styles.bottom_wrapper}>
            <ArchiveMenu />
            <CategoryMenu />
            <TagCloud />
          </div>
        </section>
        <footer className={styles.footer}>
          <Link key={'Footer'} to='/'>
            <a>&copy; {data.site.siteMetadata.title}</a>
          </Link>
        </footer>
      </div>
      <div className={styles.float}>
        <AnchorLink href={'#Header'}>
          <FontAwesomeIcon icon={['fas', 'arrow-alt-circle-up']} />
          先頭へ
        </AnchorLink>
      </div>
    </>
  )
}

export default Layout
