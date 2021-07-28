// React
import React from 'react'

// その他モジュール
import { DiscussionEmbed } from 'disqus-react'

// スタイルシート
import styles from '../styles/Disqus.module.scss'

const Disqus = props => {
  return (
    <div className={styles.disqus}>
      <DiscussionEmbed shortname='jam-inaho-space-disqus' config={{ url: SITE_BLOG_URL + blog.id, identifier: blog.id, title: blog.title, language: 'ja' }} />
    </div>
  )
}

export default Disqus
