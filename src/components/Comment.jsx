// React
import React from 'react'

// Material-UI
import Box from '@mui/material/Box'

// その他モジュール
import { Disqus } from 'gatsby-plugin-disqus'

// スタイルシート
import * as styles from '../styles/Comment.module.scss'

const Comment = ({ pageContext }) => {
  // URL組み立て
  const url = pageContext.info.site.siteUrl + '/post/' + pageContext.id
  // リターン
  return (
    <Box className={styles.comment}>
      <Disqus config={{ url: url, identifier: pageContext.id, title: pageContext.current.title }} />
    </Box>
  )
}

export default Comment
