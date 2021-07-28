// React
import * as React from 'react'

// Gatsby
import { navigate } from 'gatsby'
import { paginate, createPage } from 'gatsby-awesome-pagination'

// 定数
import { SITE_PER_PAGE } from './Constant'

// ページャー
const Pager = props => {
  const { numberOfPages, humanPageNumber } = props.pageContext
  const prefix = '/' + props.pageContext.list === 'all' ? (numberOfPages === 0 ? '/' : 'page') : props.pageContext.list + '/' + props.pageContext.id
  const handleChange = (event, value) => {
    value === 1 ? navigate(prefix) : navigate(prefix + '/' + value)
  }
  return paginate({
    createpage: createPage,
    component: path.resolve('./src/templates/index.js'),
    items: props.data.allMicrocmsBlog.edges,
    itemsPerPage: SITE_PER_PAGE,
    itemsPerFirstPage: SITE_PER_PAGE,
    pathPrefix: prefix
  })
}

export default Pager
