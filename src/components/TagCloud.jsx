// React
import * as React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiTag } from '@mdi/js'

// スタイルシート
import * as styles from '../styles/TagCloud.module.scss'

// タグクラウドコンポーネント
const TagCloud = () => {
  // クエリー実行
  const data = useStaticQuery(graphql`
    {
      allMicrocmsTag(limit: 10000, sort: { fields: name, order: ASC }) {
        nodes {
          tagId
          name
        }
      }
    }
  `)
  // リターン
  return (
    <article className={styles.wrapper}>
      <Box className={styles.title}>
        <Icon className={styles.icon} path={mdiTag} size={1.5} />
        <h1>タグ</h1>
      </Box>
      <Card className={styles.tagcloud}>
        {data.allMicrocmsTag.nodes.map(node => {
          return (
            <Link key={node.tagId} to={`/tag/${node.tagId}/`}>
              <Button className={styles.button} size={'small'} variant={'contained'}>
                {node.name}
              </Button>
            </Link>
          )
        })}
      </Card>
    </article>
  )
}

export default TagCloud
