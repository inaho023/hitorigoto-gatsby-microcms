// * React
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

const TagCloud = () => {
  // クエリー実行
  const data = useStaticQuery(graphql`
    {
      allMicrocmsTag(limit: 1024, sort: { fields: name, order: ASC }) {
        nodes {
          tagId
          name
        }
      }
    }
  `)
  // リターン
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.title}>
        <Icon className={styles.icon} path={mdiTag} size={1.5} />
        <p>タグ</p>
      </Box>
      <Card className={styles.tagcloud}>
        {data.allMicrocmsTag.nodes.map(node => {
          return (
            <Link key={node.tagId} to={`/tag/${node.tagId}/`}>
              <Button className={styles.button} size={'medium'} variant={'contained'}>
                {node.name}
              </Button>
            </Link>
          )
        })}
      </Card>
    </Box>
  )
}

export default TagCloud
