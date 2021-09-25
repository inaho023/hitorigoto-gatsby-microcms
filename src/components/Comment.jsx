// React
import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'

// その他モジュール
import { Disqus } from 'gatsby-plugin-disqus'

// スタイルシート
import * as styles from '../styles/Disqus.module.scss'

const Comment = props => {
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
  // URL組み立て
  const url = data.site.siteMetadata.siteUrl + '/post/' + props.blog.blogId
  // リターン
  return (
    <Box className={styles.disqus}>
      <Disqus config={{ url: url, identifier: props.blog.blogId, title: props.blog.title }} />
    </Box>
  )
}

export default Comment
