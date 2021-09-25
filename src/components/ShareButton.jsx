// React
import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'

// その他モジュール
import { EmailShareButton, FacebookShareButton, HatenaShareButton, LineShareButton, PinterestShareButton, PocketShareButton, TumblrShareButton, TwitterShareButton, EmailIcon, FacebookIcon, HatenaIcon, LineIcon, PinterestIcon, PocketIcon, TumblrIcon, TwitterIcon } from 'react-share'

// スタイルシート
import * as styles from '../styles/ShareButton.module.scss'

// 定数
import { SHARE_BUTTON_SIZE } from './Constant'

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
  const url = data.site.siteMetadata.siteUrl + '/post/' + blog.blogId
  const title = '「' + blog.title.replace('＠', ' ＠ ').replace('@', ' @ ') + '」'
  // リターン
  return (
    <Box className={styles.share}>
      <Box className={styles.button}>
        <TwitterShareButton url={url} title={title} hashtags={[data.site.siteMetadata.title]}>
          <TwitterIcon size={SHARE_BUTTON_SIZE} round />
        </TwitterShareButton>
      </Box>
      <Box className={styles.button}>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={SHARE_BUTTON_SIZE} round />
        </FacebookShareButton>
      </Box>
      <Box className={styles.button}>
        <TumblrShareButton url={url} title={title}>
          <TumblrIcon size={SHARE_BUTTON_SIZE} round />
        </TumblrShareButton>
      </Box>
      <Box className={styles.button}>
        <LineShareButton url={url} title={title}>
          <LineIcon size={SHARE_BUTTON_SIZE} round />
        </LineShareButton>
      </Box>
      <Box className={styles.button}>
        <PinterestShareButton url={url} description={title} media={''}>
          <PinterestIcon size={SHARE_BUTTON_SIZE} round />
        </PinterestShareButton>
      </Box>
      <Box className={styles.button}>
        <PocketShareButton url={url} title={title}>
          <PocketIcon size={SHARE_BUTTON_SIZE} round />
        </PocketShareButton>
      </Box>
      <Box className={styles.button}>
        <HatenaShareButton url={url} title={title}>
          <HatenaIcon size={SHARE_BUTTON_SIZE} round />
        </HatenaShareButton>
      </Box>
      <Box className={styles.button}>
        <EmailShareButton url={url} subject={title} body={title}>
          <EmailIcon size={SHARE_BUTTON_SIZE} round />
        </EmailShareButton>
      </Box>
    </Box>
  )
}

export default ShareButton
