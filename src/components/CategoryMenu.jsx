// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiShape } from '@mdi/js'

// スタイルシート
import * as styles from '../styles/CategoryMenu.module.scss'

// カテゴリーメニューコンポーネント
const CategoryMenu = () => {
  // クエリー実行
  const data = useStaticQuery(graphql`
    {
      allMicrocmsCategory(limit: 10000) {
        nodes {
          categoryId
          name
        }
      }
    }
  `)
  // リターン
  return (
    <article className={styles.wrapper}>
      <Box className={styles.title}>
        <Icon className={styles.icon} path={mdiShape} size={1.5} />
        <h1>カテゴリー</h1>
      </Box>
      <ButtonGroup orientation={'vertical'} fullWidth>
        {data.allMicrocmsCategory.nodes.map(node => {
          return (
            <Link key={node.categoryId} to={`/category/${node.categoryId}/`}>
              <Button className={styles.button} size={'large'} variant={'contained'} fullWidth>
                {node.name}
              </Button>
            </Link>
          )
        })}
      </ButtonGroup>
    </article>
  )
}

export default CategoryMenu
