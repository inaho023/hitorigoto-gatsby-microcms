// * React
import * as React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiTag } from '@mdi/js'

// スタイルシート
import * as styles from '../styles/TagCloud.module.scss'

const TagCloud = () => {
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
  // リターン
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Icon className={styles.icon} path={mdiTag} size={1.5} />
        <p>タグ</p>
      </div>
      <div className={styles.tagcloud}>
        {data.allMicrocmsTags.nodes.map(node => {
          return (
            <Link key={node.tagsId} to={'/tag/' + node.tagsId}>
              {node.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TagCloud
