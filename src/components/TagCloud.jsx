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
    <Box className={styles.wrapper}>
      <Box className={styles.title}>
        <Icon className={styles.icon} path={mdiTag} size={1.5} />
        <p>タグ</p>
      </Box>
      <Card className={styles.tagcloud}>
        {data.allMicrocmsTags.nodes.map(node => {
          return (
            <Link key={node.tagsId} to={'/tag/' + node.tagsId + '/'}>
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
