// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// 自作モジュール
import * as styles from '../styles/Pager.module.scss'

// ページャー
const Pager = ({ pageContext }) => {
  // 現在のページ
  const nowPage = pageContext.pageNumber
  // 最後のページ
  const maxPage = pageContext.numberOfPages - 1
  // パス設定
  const path = []
  for (let index = 0; index <= maxPage; index++) {
    if (index == 0) {
      if (pageContext.list == 'all') {
        path[index] = '/'
      } else {
        path[index] = '/' + pageContext.list + '/' + pageContext.id
      }
    } else {
      if (pageContext.list == 'all') {
        path[index] = '/page/' + (index + 1).toString()
      } else {
        path[index] = '/' + pageContext.list + '/' + pageContext.id + '/' + (index + 1).toString()
      }
    }
  }
  // リターン
  return (
    <div className={styles.pager_wrapper}>
      <div className={styles.pager}>
        {pageContext.pageNumber !== 0 && (
          <>
            <Link key={'Pager-Top'} to={path[0]}>
              <div className={styles.page} key={'Pager-Top'}>
                {'|<'}
              </div>
            </Link>
            <Link key={'Pager-Prev'} to={path[pageContext.pageNumber - 1]}>
              <div className={styles.page} key={'Pager-Prev'}>
                {'<<'}
              </div>
            </Link>
          </>
        )}
        {path.map((path, index) => {
          return index === nowPage ? (
            <div className={styles.current} key={'Pager-' + index.toString()}>
              {(index + 1).toString()}
            </div>
          ) : (
            <Link key={'Pager-' + index.toString()} to={path}>
              <div className={styles.page}>{(index + 1).toString()}</div>
            </Link>
          )
        })}
        {nowPage !== maxPage && (
          <>
            <Link key={'Pager-Next'} to={path[pageContext.pageNumber + 1]}>
              <div className={styles.page} key={'Pager-Next'}>
                {'>>'}
              </div>
            </Link>
            <Link key={'Pager-End'} to={path[pageContext.numberOfPages - 1]}>
              <div className={styles.page} key={'Pager-End'}>
                {'>|'}
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Pager
