// React
import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'

// その他モジュール
import { Disqus } from 'gatsby-plugin-disqus'

// スタイルシート
import * as styles from '../styles/Comment.module.scss'

// コメントコンポーネント
const Comment = ({ blog }) => {
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
    }
  `)
  // URL組み立て
  const url = `${data.site.siteMetadata.siteUrl}/post/${blog.blogId}/`
  // リターン
  return (
    <Box className={styles.comment}>
      <Disqus config={{ url: url, identifier: blog.blogId, title: blog.title }} />
    </Box>
  )
}

export default Comment
