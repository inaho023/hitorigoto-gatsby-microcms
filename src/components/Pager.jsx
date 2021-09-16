// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'

// 自作モジュール
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
    <Box className={styles.wrapper}>
      <Pagination className={styles.MuiPagination} page={pageContext.humanPageNumber} count={pageContext.numberOfPages} size={'large'} variant={'outlined'} shape={'rounded'} showFirstButton showLastButton renderItem={item => <PaginationItem className={styles.MuiPaginationItem} component={Link} to={path[item.page - 1]} {...item} />} />
    </Box>
  )
}

export default Pager
