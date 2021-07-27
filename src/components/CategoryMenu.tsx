// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTags } from '@fortawesome/free-solid-svg-icons'

// スタイルシート
import styles from '../styles/CategoryMenu.module.scss'

export default function CategoryMenu() {
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
            <Link key={node.categoryesId} to={'/blog/category/' + node.categoryesId}>
              <li className={styles.dropdown} key={node.categoryesId}>
                <input id={node.categoryesId} type='checkbox' />
                <label htmlFor={node.categoryesId}>
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
