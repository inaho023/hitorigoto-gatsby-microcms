// コンポーネント
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiAccount, mdiTwitter, mdiInstagram, mdiBroadcast } from '@mdi/js'

// 自作ライブラリー
import { socialAccount } from '../libs/Constant'

// スタイルシート
import * as styles from '../styles/Menubar.module.scss'

// メニューバーコンポーネント
const Menubar = () => {
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
    <AppBar className={styles.appbar} position={'sticky'}>
      <Toolbar className={styles.toolbar}>
        <Box className={styles.title}>
          <Link key={'Home'} to={'/'}>
            <p>
              {data.site.siteMetadata.title}
              <br />
              {data.site.siteMetadata.subtitle}
            </p>
          </Link>
        </Box>
        <Box className={styles.grow} />
        <Box className={styles.icon}>
          <Link key={'Profile'} to={'/profile/'}>
            <IconButton className={styles.button} color={'inherit'}>
              <Icon path={mdiAccount} size={1} title={'プロフィール'} />
            </IconButton>
          </Link>
          <a key={'Twitter'} href={socialAccount.twitter.url} target={'_blank'} rel={'noreferrer'}>
            <IconButton className={styles.button} color={'inherit'}>
              <Icon path={mdiTwitter} size={1} title={'Twitter'} />
            </IconButton>
          </a>
          <a key={'Instagram'} href={socialAccount.instagram.url} target={'_blank'} rel={'noreferrer'}>
            <IconButton className={styles.button} color={'inherit'}>
              <Icon path={mdiInstagram} size={1} title={'Instagram'} />
            </IconButton>
          </a>
          <a key={'TwitCasting'} href={socialAccount.twitcasting.url} target={'_blank'} rel={'noreferrer'}>
            <IconButton className={styles.button} color={'inherit'}>
              <Icon path={mdiBroadcast} size={1} title={'ツイキャス'} />
            </IconButton>
          </a>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Menubar
