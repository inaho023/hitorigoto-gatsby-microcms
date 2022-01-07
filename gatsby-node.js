// モジュールの読み込み
const moment = require('moment')
const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')
// 定数
const SITE_LIST_PER_PAGE = 12 // 1ページあたりの記事数
//
exports.createPages = async ({ graphql, actions }) => {
  // 定数定義
  const { createPage } = actions
  // 変数定義
  let result
  let context
  let list
  let pathList
  // 記事リスト
  list = 'all'
  result = await graphql(`
    query {
      allMicrocmsBlog(limit: 1024, sort: { fields: datetime, order: DESC }) {
        edges {
          node {
            blogId
          }
        }
      }
    }
  `)
  // ページネーション
  paginate({
    createPage, // The Gatsby `createPage` function
    items: result.data.allMicrocmsBlog.edges, // An array of objects
    itemsPerPage: SITE_LIST_PER_PAGE, // How many items you want per page
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? '/' : '/page'), // Creates pages like `/blog`, `/blog/2`, etc
    component: path.resolve('src/templates/index.jsx'), // Just like `createPage()`
    context: { list: list }
  })
  // アーカイブリスト
  list = 'archive'
  context = []
  pathList = []
  const blogArchive = []
  result = await graphql(`
    query {
      allMicrocmsBlog(limit: 1024, sort: { fields: datetime, order: DESC }) {
        edges {
          node {
            datetime(formatString: "YYYYMM")
          }
        }
      }
    }
  `)
  result.data.allMicrocmsBlog.edges.forEach((edge, index) => {
    const id = edge.node.datetime
    const name = moment(edge.node.datetime, 'YYYYMM').format('YYYY年M月')
    const from = new Date(Number(moment(edge.node.datetime, 'YYYYMM').format('YYYY')), Number(moment(edge.node.datetime, 'YYYYMM').format('MM')) - 1, 1)
    const to = new Date(Number(moment(edge.node.datetime, 'YYYYMM').format('MM')) === 12 ? Number(moment(edge.node.datetime, 'YYYYMM').format('YYYY')) + 1 : Number(moment(edge.node.datetime, 'YYYYMM').format('YYYY')), Number(moment(edge.node.datetime, 'YYYYMM').format('MM')) === 12 ? 0 : Number(moment(edge.node.datetime, 'YYYYMM').format('MM')), 1)
    context[index] = { list: list, id: id, name: name, from: from.toISOString(), to: to.toISOString() }
    pathList[index] = '/' + list + '/' + id
    // 記事リスト（アーカイブ）
    blogArchive[index] = graphql(`
      query archiveListQuery($from: Date = "${from.toISOString()}", $to: Date = "${to.toISOString()}") {
        allMicrocmsBlog(limit: 1024, sort: { fields: datetime, order: DESC }, filter: { datetime: { gte: $from, lt: $to } }) {
          edges {
            node {
              blogId
            }
          }
        }
      }
    `)
  })
  // クエリーを実行
  result = await Promise.all(blogArchive)
  // ID毎にページを生成
  result.map((result, index) => {
    paginate({
      createPage, // The Gatsby `createPage` function
      items: result.data.allMicrocmsBlog.edges, // An array of objects
      itemsPerPage: SITE_LIST_PER_PAGE, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/archive/{month.id}.jsx'), // Just like `createPage()`
      context: context[index]
    })
  })
  // カテゴリーリスト
  list = 'category'
  context = []
  pathList = []
  const blogCategory = []
  result = await graphql(`
    query categoryQuery {
      allMicrocmsCategories(limit: 1024) {
        nodes {
          categoriesId
          name
        }
      }
    }
  `)
  result.data.allMicrocmsCategories.nodes.forEach((node, index) => {
    const id = node.categoriesId
    const name = node.name
    context[index] = { list: list, id: id, name: name }
    pathList[index] = '/' + list + '/' + id
    // 記事リスト（カテゴリー）
    blogCategory[index] = graphql(`
      query categoryListQuery($id: String = "${id}") {
        allMicrocmsBlog(limit: 1024, sort: { fields: datetime, order: DESC }, filter: { category: { id: { eq: $id } } }) {
          edges {
            node {
              blogId
            }
          }
        }
      }
    `)
  })
  // クエリーを実行
  result = await Promise.all(blogCategory)
  // ID毎にページを生成
  result.map((result, index) => {
    paginate({
      createPage, // The Gatsby `createPage` function
      items: result.data.allMicrocmsBlog.edges, // An array of objects
      itemsPerPage: SITE_LIST_PER_PAGE, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/category/{category.id}.jsx'), // Just like `createPage()`
      context: context[index]
    })
  })
  // タグリスト
  list = 'tag'
  context = []
  pathList = []
  const blogTag = []
  result = await graphql(`
    query tagQuery {
      allMicrocmsTags(limit: 1024) {
        nodes {
          tagsId
          name
        }
      }
    }
  `)
  result.data.allMicrocmsTags.nodes.forEach((node, index) => {
    const list = 'tag'
    const id = node.tagsId
    const name = node.name
    context[index] = { list: list, id: id, name: name }
    pathList[index] = '/' + list + '/' + id
    blogTag[index] = graphql(`
      query tagListQuery($id: String = "${id}") {
        allMicrocmsBlog(limit: 1024, sort: { fields: datetime, order: DESC }, filter: { tags: { elemMatch: { id: { eq: $id } } } }) {
          edges {
            node {
              blogId
            }
          }
        }
      }
    `)
  })
  // クエリーを実行
  result = await Promise.all(blogTag)
  // ID毎にページを生成
  result.map((result, index) => {
    paginate({
      createPage, // The Gatsby `createPage` function
      items: result.data.allMicrocmsBlog.edges, // An array of objects
      itemsPerPage: SITE_LIST_PER_PAGE, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/tag/{tag.id}.jsx'), // Just like `createPage()`
      context: context[index]
    })
  })
  // 記事詳細
  result = await graphql(`
    query postQuery {
      allMicrocmsBlog(limit: 1024, sort: { fields: datetime, order: DESC }) {
        edges {
          node {
            blogId
            title
            image {
              url
              width
              height
            }
          }
        }
      }
    }
  `)
  result.data.allMicrocmsBlog.edges.forEach(edge => {
    const id = edge.node.blogId
    const post = result.data.allMicrocmsBlog.edges
    const current = post.findIndex(post => post.node.blogId === id)
    const prev = current === 0 ? null : post[current - 1]
    const next = current === post.length - 1 ? null : post[current + 1]
    actions.createPage({
      path: '/post/' + id,
      component: path.resolve('src/templates/post/{blog.id}.jsx'),
      context: { id: id, next: next, prev: prev }
    })
  })
  // ページリスト
  result = await graphql(`
    query pageQuery {
      allMicrocmsPage(limit: 1024) {
        nodes {
          pageId
        }
      }
    }
  `)
  result.data.allMicrocmsPage.nodes.forEach(node => {
    const id = node.pageId
    actions.createPage({
      path: '/' + id,
      component: path.resolve('src/templates/{page.id}.jsx'),
      context: { id: id }
    })
  })
}
