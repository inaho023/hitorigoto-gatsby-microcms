// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import IconButton from '@mui/material/IconButton'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiPageFirst, mdiChevronLeft, mdiChevronRight, mdiPageLast } from '@mdi/js'

// スタイルシート
import * as styles from '../styles/MiniPager.module.scss'

//
const MiniPager = ({ pageContext }) => {
  // パス設定
  const pathFirst = pageContext.list == 'all' ? '/' : `/${pageContext.list}/${pageContext.id}/`
  const pathLast = pageContext.list == 'all' ? `/page/${pageContext.numberOfPages.toString()}/` : `/${pageContext.list}/${pageContext.id}/${pageContext.numberOfPages.toString()}/`
  // リターン
  return (
    <>
      <IconButton className={styles.button} disabled={pageContext.humanPageNumber === 1}>
        <Link href={pathFirst}>
          <Icon className={styles.icon} path={mdiPageFirst} size={1} title={'最初のページへ'} />
        </Link>
      </IconButton>
      <IconButton className={styles.button} disabled={pageContext.humanPageNumber === 1}>
        <Link href={pageContext.previousPagePath}>
          <Icon className={styles.icon} path={mdiChevronLeft} size={1} title={'前のページへ'} />
        </Link>
      </IconButton>
      <IconButton className={styles.button} disabled={pageContext.humanPageNumber === pageContext.numberOfPages}>
        <Link href={pageContext.nextPagePath}>
          <Icon className={styles.icon} path={mdiChevronRight} size={1} title={'次のページへ'} />
        </Link>
      </IconButton>
      <IconButton className={styles.button} disabled={pageContext.humanPageNumber === pageContext.numberOfPages}>
        <Link href={pathLast}>
          <Icon className={styles.icon} path={mdiPageLast} size={1} title={'最後のページへ'} />
        </Link>
      </IconButton>
    </>
  )
}

export default MiniPager
