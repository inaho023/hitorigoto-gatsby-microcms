// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

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
      <ul className={styles.dropdown_menu}>
        {data.allMicrocmsCategories.nodes.map(node => {
          return (
            <Link key={node.categoriesId} to={'/category/' + node.categoriesId}>
              <li className={styles.dropdown} key={node.categoriesId}>
                <input id={node.categoryesId} type='checkbox' />
                <label htmlFor={node.categoriesId}>
                  <a data-toggle='dropdown'>{node.name}</a>
                </label>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryMenu
