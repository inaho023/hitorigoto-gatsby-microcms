// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// Material Design Icons
import Icon from '@mdi/react'
import {
  mdiHome,
  mdiCalendarToday,
  mdiShape,
  mdiTag,
  mdiPageFirst,
  mdiChevronLeft,
  mdiChevronRight,
  mdiPageLast
} from '@mdi/js'

// スタイルシート
import * as styles from '../styles/Minibar.module.scss'

// ミニバーコンポーネント
const Minibar = ({ pageContext }) => {
  // リストアイコン設定
  let listIcon
  switch (pageContext.list) {
    case 'archive':
      // アイコン
      listIcon = mdiCalendarToday
      break
    case 'category':
      // アイコン
      listIcon = mdiShape
      break
    case 'tag':
      // アイコン
      listIcon = mdiTag
      break
    default:
      // アイコン
      listIcon = mdiHome
      break
  }
  // ナビゲーションパス設定
  const nav = {
    first: {
      path: pageContext.list === 'all' ? '/' : `/${pageContext.list}/${pageContext.id}/`,
      title: '最初のページへ',
      disabled: pageContext.humanPageNumber === 1
    },
    prev: {
      path: pageContext.previousPagePath,
      title: '前のページへ',
      disabled: pageContext.humanPageNumber === 1
    },
    next: {
      path: pageContext.nextPagePath,
      title: '次のページへ',
      disabled: pageContext.humanPageNumber === pageContext.numberOfPages
    },
    last: {
      path:
        pageContext.list === 'all'
          ? `/page/${pageContext.numberOfPages.toString()}/`
          : `/${pageContext.list}/${pageContext.id}/${pageContext.numberOfPages.toString()}/`,
      title: '最後のページへ',
      disabled: pageContext.humanPageNumber === pageContext.numberOfPages
    }
  }
  // リターン
  return (
    <Box className={styles.minibar}>
      <span className={styles.list}>
        <span className={styles.wrapper}>
          <span className={styles.icon}>
            <Icon path={listIcon} size={2} />
          </span>
          <span className={styles.text}>
            <h3>{pageContext.name ? pageContext.name : 'ホーム'}</h3>
          </span>
        </span>
      </span>
      <span className={styles.pager}>
        <span className={styles.wrapper}>
          <IconButton disabled={nav.first.disabled}>
            <Link key={'First'} to={nav.first.path}>
              <Icon path={mdiPageFirst} size={2} title={nav.first.title} />
            </Link>
          </IconButton>
          <IconButton disabled={nav.prev.disabled}>
            <Link key={'Prev'} to={nav.prev.path}>
              <Icon path={mdiChevronLeft} size={2} title={nav.prev.title} />
            </Link>
          </IconButton>
          <IconButton disabled={nav.next.disabled}>
            <Link key={'Next'} to={nav.next.path}>
              <Icon path={mdiChevronRight} size={2} title={nav.next.title} />
            </Link>
          </IconButton>
          <IconButton disabled={nav.last.disabled}>
            <Link key={'Last'} to={nav.last.path}>
              <Icon path={mdiPageLast} size={2} title={nav.last.title} />
            </Link>
          </IconButton>
        </span>
      </span>
    </Box>
  )
}

export default Minibar
