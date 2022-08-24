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
import { sizeShareButton } from '../libs/Constant'

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
  const url = `${data.site.siteMetadata.siteUrl}/post/${blog.blogId}`
  const title = '「' + blog.title.replace('＠', ' ＠ ').replace('@', ' @ ') + '」'
  // リターン
  return (
    <Box className={styles.share}>
      <TwitterShareButton url={url} title={title} hashtags={[data.site.siteMetadata.title]}>
        <TwitterIcon size={sizeShareButton} round />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={sizeShareButton} round />
      </FacebookShareButton>
      <TumblrShareButton url={url} title={title}>
        <TumblrIcon size={sizeShareButton} round />
      </TumblrShareButton>
      <LineShareButton url={url} title={title}>
        <LineIcon size={sizeShareButton} round />
      </LineShareButton>
      <PinterestShareButton url={url} description={title} media={''}>
        <PinterestIcon size={sizeShareButton} round />
      </PinterestShareButton>
      <PocketShareButton url={url} title={title}>
        <PocketIcon size={sizeShareButton} round />
      </PocketShareButton>
      <HatenaShareButton url={url} title={title}>
        <HatenaIcon size={sizeShareButton} round />
      </HatenaShareButton>
      <EmailShareButton url={url} subject={title} body={title}>
        <EmailIcon size={sizeShareButton} round />
      </EmailShareButton>
    </Box>
  )
}

export default ShareButton
