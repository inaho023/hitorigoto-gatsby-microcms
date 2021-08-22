// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiShape } from '@mdi/js'

// スタイルシート
import * as styles from '../styles/CategoryMenu.module.scss'

const CategoryMenu = () => {
  // クエリー実行
  const data = useStaticQuery(graphql`
    {
      allMicrocmsCategories(limit: 1024) {
        nodes {
          categoriesId
          name
        }
      }
    }
  `)
  // リターン
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>
          <Icon className={styles.icon} path={mdiShape} size={1.5} />
          カテゴリー
        </p>
      </div>
      <ButtonGroup orientation={'vertical'} fullWidth>
        {data.allMicrocmsCategories.nodes.map(node => {
          return (
            <Link key={node.categoriesId} to={'/category/' + node.categoriesId}>
              <Button className={styles.button} size={'large'} variant={'contained'} fullWidth>
                {node.name}
              </Button>
            </Link>
          )
        })}
      </ButtonGroup>
    </div>
  )
}

export default CategoryMenu
