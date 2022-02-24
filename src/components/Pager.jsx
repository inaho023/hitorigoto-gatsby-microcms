// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'

// スタイル
import * as styles from '../styles/Pager.module.scss'

// ページャー
const Pager = ({ pageContext }) => {
  // パス設定
  const path = []
  for (let index = 0; index < pageContext.numberOfPages; index++) {
    if (index == 0) {
      if (pageContext.list == 'all') {
        path[index] = '/'
      } else {
        path[index] = `/${pageContext.list}/${pageContext.id}/`
      }
    } else {
      if (pageContext.list == 'all') {
        path[index] = `/page/${(index + 1).toString()}/`
      } else {
        path[index] = `/${pageContext.list}/${pageContext.id}/${(index + 1).toString()}/`
      }
    }
  }
  // リターン
  return (
    <Pagination
      className={styles.pagination}
      page={pageContext.humanPageNumber}
      count={pageContext.numberOfPages}
      boundaryCount={2}
      size={'large'}
      variant={'outlined'}
      shape={'rounded'}
      showFirstButton
      showLastButton
      renderItem={item => <PaginationItem className={styles.paginationitem} component={Link} to={path[item.page - 1]} {...item} />}
    />
  )
}

export default Pager
