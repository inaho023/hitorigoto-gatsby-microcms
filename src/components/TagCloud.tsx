// * React
import * as React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTag } from '@fortawesome/free-solid-svg-icons'

// スタイルシート
import * as styles from '../styles/TagCloud.module.scss'

export default function TagCloud() {
  // クエリー実行
  const data = useStaticQuery(graphql`
    {
      allMicrocmsTags(limit: 1024, sort: { fields: name, order: ASC }) {
        nodes {
          tagsId
          name
        }
      }
    }
  `)
  // Font Awesome Icon
  library.add(faTag)
  //
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={['fas', 'tag']} />
        </div>
        <h3>タグ</h3>
      </div>
      <div className={styles.tagcloud}>
        {data.allMicrocmsTags.nodes.map(siteTag => {
          return (
            <Link key={siteTag.tagsId} to={'/blog/tag/' + siteTag.tagsId}>
              {siteTag.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
