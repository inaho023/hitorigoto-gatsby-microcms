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
} from 'react-share'

// スタイルシート
import * as styles from '../styles/ShareButton.module.scss'

// 定数
import { sizeShareButton } from './Constant'

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
  const url = `${data.site.siteMetadata.siteUrl}/post/${blog.blogId}`
  const title = '「' + blog.title.replace('＠', ' ＠ ').replace('@', ' @ ') + '」'
  // リターン
  return (
    <Box className={styles.share}>
      <Box className={styles.button}>
        <TwitterShareButton url={url} title={title} hashtags={[data.site.siteMetadata.title]}>
          <TwitterIcon size={sizeShareButton} round />
        </TwitterShareButton>
      </Box>
      <Box className={styles.button}>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={sizeShareButton} round />
        </FacebookShareButton>
      </Box>
      <Box className={styles.button}>
        <TumblrShareButton url={url} title={title}>
          <TumblrIcon size={sizeShareButton} round />
        </TumblrShareButton>
      </Box>
      <Box className={styles.button}>
        <LineShareButton url={url} title={title}>
          <LineIcon size={sizeShareButton} round />
        </LineShareButton>
      </Box>
      <Box className={styles.button}>
        <PinterestShareButton url={url} description={title} media={''}>
          <PinterestIcon size={sizeShareButton} round />
        </PinterestShareButton>
      </Box>
      <Box className={styles.button}>
        <PocketShareButton url={url} title={title}>
          <PocketIcon size={sizeShareButton} round />
        </PocketShareButton>
      </Box>
      <Box className={styles.button}>
        <HatenaShareButton url={url} title={title}>
          <HatenaIcon size={sizeShareButton} round />
        </HatenaShareButton>
      </Box>
      <Box className={styles.button}>
        <EmailShareButton url={url} subject={title} body={title}>
          <EmailIcon size={sizeShareButton} round />
        </EmailShareButton>
      </Box>
    </Box>
  )
}

export default ShareButton
