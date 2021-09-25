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

// スタイルシート
import * as styles from '../styles/Menubar.module.scss'

// 定数
import { URL_MY_TWITTER, URL_MY_INSTAGRAM, URL_MY_TWITCASTING } from './Constant'

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
    <Box className={styles.wrapper}>
      <AppBar className={styles.AppBar} position={'sticky'}>
        <Toolbar>
          <Link key={'Home'} to={'/'}>
            <p>{data.site.siteMetadata.title + ' ' + data.site.siteMetadata.subtitle}</p>
          </Link>
          <Box className={styles.grow} />
          <Box className={styles.icon}>
            <IconButton color={'inherit'}>
              <Link key={'Profile'} to={'/profile'}>
                <Icon path={mdiAccount} size={1} title={'プロフィール'} />
              </Link>
            </IconButton>
            <IconButton color={'inherit'}>
              <a key={'Twitter'} href={URL_MY_TWITTER} target={'_blank'} rel={'noreferrer'}>
                <Icon path={mdiTwitter} size={1} title={'Twitter'} />
              </a>
            </IconButton>
            <IconButton color={'inherit'}>
              <a key={'Instagram'} href={URL_MY_INSTAGRAM} target={'_blank'} rel={'noreferrer'}>
                <Icon path={mdiInstagram} size={1} title={'Instagram'} />
              </a>
            </IconButton>
            <IconButton color={'inherit'}>
              <a key={'TwitCasting'} href={URL_MY_TWITCASTING} target={'_blank'} rel={'noreferrer'}>
                <Icon path={mdiBroadcast} size={1} title={'ツイキャス'} />
              </a>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Menubar
