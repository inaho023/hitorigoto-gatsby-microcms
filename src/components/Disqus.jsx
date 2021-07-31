// React
import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// その他モジュール
import { DiscussionEmbed } from 'disqus-react'

// スタイルシート
import * as styles from '../styles/Disqus.module.scss'

const Disqus = props => {
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
    <div className={styles.disqus}>
      <DiscussionEmbed shortname='jam-inaho-space-disqus' config={{ url: url, identifier: props.blog.blogId, title: props.blog.title, language: data.site.siteMetadata.lang }} />
    </div>
  )
}

export default Disqus
