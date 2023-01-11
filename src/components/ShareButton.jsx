// React
import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'

// その他モジュール
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  PinterestShareButton,
  PocketShareButton,
  TumblrShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  HatenaIcon,
  LineIcon,
  PinterestIcon,
  PocketIcon,
  TumblrIcon,
  TwitterIcon
} from 'next-share'

// 自作ライブラリー
import { shareButton } from '../libs/Constant'

// スタイルシート
import * as styles from '../styles/ShareButton.module.scss'

// シェアボタンコンポーネント
const ShareButton = ({ blog }) => {
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
  //
  const url = `${data.site.siteMetadata.siteUrl}/post/${blog.blogId}/`
  const title = '「' + blog.title.replace('＠', ' ＠ ').replace('@', ' @ ') + '」'
  // リターン
  return (
    <Box className={styles.share}>
      <TwitterShareButton url={url} title={title} hashtags={[data.site.siteMetadata.title]}>
        <TwitterIcon className={styles.button} size={shareButton.size} round iconFillColor={shareButton.color} />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon className={styles.button} size={shareButton.size} round iconFillColor={shareButton.color} />
      </FacebookShareButton>
      <TumblrShareButton url={url} title={title}>
        <TumblrIcon className={styles.button} size={shareButton.size} round iconFillColor={shareButton.color} />
      </TumblrShareButton>
      <LineShareButton url={url} title={title}>
        <LineIcon className={styles.button} size={shareButton.size} round iconFillColor={shareButton.color} />
      </LineShareButton>
      <PinterestShareButton url={url} description={title} media={''}>
        <PinterestIcon className={styles.button} size={shareButton.size} round iconFillColor={shareButton.color} />
      </PinterestShareButton>
      <PocketShareButton url={url} title={title}>
        <PocketIcon className={styles.button} size={shareButton.size} round iconFillColor={shareButton.color} />
      </PocketShareButton>
      <HatenaShareButton url={url} title={title}>
        <HatenaIcon className={styles.button} size={shareButton.size} round iconFillColor={shareButton.color} />
      </HatenaShareButton>
      <EmailShareButton url={url} subject={title} body={title}>
        <EmailIcon className={styles.button} size={shareButton.size} round iconFillColor={shareButton.color} />
      </EmailShareButton>
    </Box>
  )
}

export default ShareButton
