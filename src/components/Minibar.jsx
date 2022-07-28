// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

// Material-UI
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiPageFirst, mdiChevronLeft, mdiChevronRight, mdiPageLast } from '@mdi/js'

// スタイルシート
import * as styles from '../styles/Minibar.module.scss'

// ミニバーコンポーネント
const Minibar = ({ misc, pageContext }) => {
  // pageContextがNULLかUndefinedの場合はリターン
  if (!pageContext) {
    return null
  }
  // パンくずリスト
  const disableLinks = ['/archive', '/category', '/tag']
  const hiddenCrumbs = ['/page', '/post']
  // パス設定
  let nav = {}
  if (misc.ogpInfo.type === 'website') {
    nav = {
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
  } else {
    nav = {
      first: {
        path: pageContext.first ? `/post/${pageContext.first.node.blogId}` : '/',
        title: pageContext.first ? pageContext.first.node.title : '',
        disabled: pageContext.id === pageContext?.first?.node?.blogId
      },
      prev: {
        path: pageContext.prev ? `/post/${pageContext.prev.node.blogId}` : '/',
        title: pageContext.prev ? pageContext.prev.node.title : '',
        disabled: pageContext.prev ? false : true
      },
      next: {
        path: pageContext.next ? `/post/${pageContext.next.node.blogId}` : '/',
        title: pageContext.next ? pageContext.next.node.title : '',
        disabled: pageContext.next ? false : true
      },
      last: {
        path: pageContext.last ? `/post/${pageContext.last.node.blogId}` : '/',
        title: pageContext.last ? pageContext.last.node.title : '',
        disabled: pageContext.id === pageContext?.last?.node?.blogId
      }
    }
  }
  // リターン
  return (
    <Box className={styles.minibar}>
      <Breadcrumb
        crumbs={pageContext.breadcrumb.crumbs}
        crumbLabel={misc.crumbLabel}
        disableLinks={disableLinks}
        hiddenCrumbs={hiddenCrumbs}
      />
      <Box className={styles.pager}>
        <IconButton className={styles.button} disabled={nav.first.disabled}>
          <Link key={'First'} to={nav.first.path}>
            <Icon path={mdiPageFirst} size={2} title={nav.first.title} />
          </Link>
        </IconButton>
        <IconButton className={styles.button} disabled={nav.prev.disabled}>
          <Link key={'Prev'} to={nav.prev.path}>
            <Icon path={mdiChevronLeft} size={2} title={nav.prev.title} />
          </Link>
        </IconButton>
        <IconButton className={styles.button} disabled={nav.next.disabled}>
          <Link key={'Next'} to={nav.next.path}>
            <Icon path={mdiChevronRight} size={2} title={nav.next.title} />
          </Link>
        </IconButton>
        <IconButton className={styles.button} disabled={nav.last.disabled}>
          <Link key={'Last'} to={nav.last.path}>
            <Icon path={mdiPageLast} size={2} title={nav.last.title} />
          </Link>
        </IconButton>
      </Box>
    </Box>
  )
}

export default Minibar
