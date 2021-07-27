// React
import * as React from 'react'

// 自作モジュール
import Layout from '../../components/Layout'
import BlogList from '../../components/BlogList'
import Pager from '../../components/Pager'

// 定数
import { SITE_TITLE, SITE_SUB_TITLE } from '../../components/Constant'

// カテゴリー記事リスト
export default function page() {
  const sitePosition = 'ホーム'
  const siteDescription = SITE_TITLE + (SITE_SUB_TITLE && ' ' + SITE_SUB_TITLE) // サイト概要
  return (
    <Layout sitePosition={sitePosition} siteDate={date} siteCategories={categories} siteTags={tags} siteDescription={siteDescription}>
      <BlogList title='' blog={blog.contents} />
      <Pager pathBase={'/blog/page/'} pathName={'/blog/page/[page]'} offset={blog.offset} total={blog.totalCount} />
    </Layout>
  )
}
