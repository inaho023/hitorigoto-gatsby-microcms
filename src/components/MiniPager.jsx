// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import IconButton from '@mui/material/IconButton'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiPageFirst, mdiChevronLeft, mdiChevronRight, mdiPageLast } from '@mdi/js'

//
const MiniPager = ({ pageContext }) => {
  // パス設定
  const pathFirst = pageContext.list == 'all' ? '/' : `/${pageContext.list}/${pageContext.id}/`
  const pathLast = pageContext.list == 'all' ? `/page/${pageContext.numberOfPages.toString()}/` : `/${pageContext.list}/${pageContext.id}/${pageContext.numberOfPages.toString()}/`
  // リターン
  return (
    <>
      <IconButton disabled={pageContext.humanPageNumber === 1}>
        <Link href={pathFirst}>
          <Icon path={mdiPageFirst} size={1.5} title={'最初のページへ'} />
        </Link>
      </IconButton>
      <IconButton disabled={pageContext.humanPageNumber === 1}>
        <Link href={pageContext.previousPagePath}>
          <Icon path={mdiChevronLeft} size={1.5} title={'前のページへ'} />
        </Link>
      </IconButton>
      <IconButton disabled={pageContext.humanPageNumber === pageContext.numberOfPages}>
        <Link href={pageContext.nextPagePath}>
          <Icon path={mdiChevronRight} size={1.5} title={'次のページへ'} />
        </Link>
      </IconButton>
      <IconButton disabled={pageContext.humanPageNumber === pageContext.numberOfPages}>
        <Link href={pathLast}>
          <Icon path={mdiPageLast} size={1.5} title={'最後のページへ'} />
        </Link>
      </IconButton>
    </>
  )
}

export default MiniPager
