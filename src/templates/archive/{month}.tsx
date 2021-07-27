// React
import * as React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// その他モジュール
import moment from 'moment'

// 自作コンポーネント
import Layout from '../../components/Layout'
import BlogList from '../../components/BlogList'
import Pager from '../../components/Pager'

// 定数
import { SITE_TITLE, SITE_SUB_TITLE } from '../../components/Constant'

// アーカイブ記事リスト
const month = ({ data }) => {
  const sitePosition = moment(month, 'YYYYMM').format('YYYY年MM月')
  const siteDescription = SITE_TITLE + ' ' + SITE_SUB_TITLE + ' ' + moment(month, 'YYYYMM').format('YYYY年MM月') // サイト概要
  return (
    <Layout sitePosition={sitePosition} siteDescription={siteDescription}>
      <BlogList title={sitePosition} blog={blog.contents} />
      <Pager pathBase={`/blog/archive/${month}/`} pathName={`/blog/archive/${month}/[page]`} offset={blog.offset} total={blog.totalCount} />
    </Layout>
  )
}

export default month
