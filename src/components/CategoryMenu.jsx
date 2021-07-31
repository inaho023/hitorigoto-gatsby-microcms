// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTags } from '@fortawesome/free-solid-svg-icons'

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
  // Font Awesome Icon
  library.add(faTags)
  //
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={['fas', 'tags']} />
        </div>
        <h3>カテゴリー</h3>
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
