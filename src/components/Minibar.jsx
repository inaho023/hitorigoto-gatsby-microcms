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

// ミニバー
const Minibar = ({ misc, pageContext }) => {
  // パンくずリスト
  const disableLinks = ['/archive', '/category', '/tag']
  const hiddenCrumbs = ['/page', '/post']
  // パス設定
  let navFirst = {}
  let navPrev = {}
  let navNext = {}
  let navLast = {}
  if (misc.ogp.type === 'website') {
    navFirst = {
      path: pageContext.list == 'all' ? '/' : `/${pageContext.list}/${pageContext.id}/`,
      title: '最初のページへ',
      disabled: pageContext.humanPageNumber === 1
    }
    navPrev = {
      path: pageContext.previousPagePath,
      title: '前のページへ',
      disabled: pageContext.humanPageNumber === 1
    }
    navNext = {
      path: pageContext.nextPagePath,
      title: '次のページへ',
      disabled: pageContext.humanPageNumber === pageContext.numberOfPages
    }
    navLast = {
      path: pageContext.list == 'all' ? `/page/${pageContext.numberOfPages.toString()}/` : `/${pageContext.list}/${pageContext.id}/${pageContext.numberOfPages.toString()}/`,
      title: '最後のページへ',
      disabled: pageContext.humanPageNumber === pageContext.numberOfPages
    }
  } else {
    navFirst = {
      path: pageContext.first && `/post/${pageContext.first.node.blogId}`,
      title: pageContext.first && pageContext.first.node.title,
      disabled: pageContext.post.node.blogId === pageContext.first.node.blogId
    }
    navPrev = {
      path: pageContext.prev && `/post/${pageContext.prev.node.blogId}`,
      title: pageContext.prev && pageContext.prev.node.title,
      disabled: pageContext.prev ? false : true
    }
    navNext = {
      path: pageContext.next && `/post/${pageContext.next.node.blogId}`,
      title: pageContext.next && pageContext.next.node.title,
      disabled: pageContext.next ? false : true
    }
    navLast = {
      path: pageContext.last && `/post/${pageContext.last.node.blogId}`,
      title: pageContext.last && pageContext.last.node.title,
      disabled: pageContext.post.node.blogId === pageContext.last.node.blogId
    }
  }
  // リターン
  return (
    <Box className={styles.minibar}>
      <Breadcrumb crumbs={pageContext.breadcrumb.crumbs} crumbLabel={misc.crumbLabel} crumbSeparator={' / '} disableLinks={disableLinks} hiddenCrumbs={hiddenCrumbs} />
      <Box className={styles.pager}>
        <IconButton className={styles.button} disabled={navFirst.disabled}>
          <Link to={navFirst.path}>
            <Icon path={mdiPageFirst} size={1} title={navFirst.title} />
          </Link>
        </IconButton>
        <IconButton className={styles.button} disabled={navPrev.disabled}>
          <Link to={navPrev.path}>
            <Icon path={mdiChevronLeft} size={1} title={navPrev.title} />
          </Link>
        </IconButton>
        <IconButton className={styles.button} disabled={navNext.disabled}>
          <Link to={navNext.path}>
            <Icon path={mdiChevronRight} size={1} title={navNext.title} />
          </Link>
        </IconButton>
        <IconButton className={styles.button} disabled={navLast.disabled}>
          <Link to={navLast.path}>
            <Icon path={mdiPageLast} size={1} title={navLast.title} />
          </Link>
        </IconButton>
      </Box>
    </Box>
  )
}

export default Minibar
