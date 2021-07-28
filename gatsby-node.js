// プラグインの読み込み
const moment = require('moment')
const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')
//
exports.createPages = async ({ graphql, actions }) => {
  // 定数定義
  const { createPage } = actions
  // 変数定義
  var result
  var context
  var list
  var pathList
  // 記事リスト
  list = 'all'
  result = await graphql(`
    query blogQuery {
      allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }) {
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
    items: result, // An array of objects
    itemsPerPage: 12, // How many items you want per page
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? '/' : '/page'), // Creates pages like `/blog`, `/blog/2`, etc
    component: path.resolve('src/templates/index.js'), // Just like `createPage()`
    context: { list: list }
  })
  // アーカイブリスト
  list = 'archive'
  context = []
  pathList = []
  const blogArchive = []
  result = await graphql(`
    query {
      allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }) {
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
    const name = moment(edge.node.datetime, 'YYYYMM').format('YYYY年MM月')
    const from = new Date(Number(edge.node.datetime.substring(0, 3)), Number(edge.node.datetime.substring(4, 5)), 1)
    const to = new Date(Number(edge.node.datetime.substring(4, 5)) + 1 === 13 ? Number(edge.node.datetime.substring(0, 3)) + 1 : Number(edge.node.datetime.substring(0, 3)), Number(edge.node.datetime.substring(4, 5)) + 1 === 13 ? 1 : Number(edge.node.datetime.substring(4, 5)) + 1, 1)
    context[index] = { list: list, id: id, name: name, from: from.toISOString(), to: to.toISOString() }
    pathList[index] = '/' + list + '/' + id
    actions.createPage({
      path: pathList[index],
      component: path.resolve('src/templates/index.tsx'),
      context: context[index]
    })
    // 記事リスト（アーカイブ）
    blogArchive[index] = graphql(`
      query archiveListQuery($from: Date = "${from.toISOString()}", $to: Date = "${to.toISOString()}") {
        allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }, filter: { datetime: { gte: $from, lt: $to } }) {
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
      itemsPerPage: 12, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/index.tsx'), // Just like `createPage()`
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
      allMicrocmsCategories(limit: 1000) {
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
    actions.createPage({
      path: pathList[index],
      component: path.resolve('src/templates/index.tsx'),
      context: context[index]
    })
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
      itemsPerPage: 12, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/index.tsx'), // Just like `createPage()`
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
      allMicrocmsTags(limit: 1000) {
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
    actions.createPage({
      path: pathList[index],
      component: path.resolve('src/templates/index.tsx'),
      context: context[index]
    })
    blogTag[index] = graphql(`
      query tagListQuery($id: [String] = "${id}") {
        allMicrocmsBlog(filter: { tags: { elemMatch: { id: { in: $id } } } }) {
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
      itemsPerPage: 12, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/index.tsx'), // Just like `createPage()`
      context: context[index]
    })
  })
  // 記事詳細
  result = await graphql(`
    query postQuery {
      allMicrocmsBlog(limit: 1000) {
        nodes {
          blogId
        }
      }
    }
  `)
  result.data.allMicrocmsBlog.nodes.forEach(node => {
    const id = node.blogId
    actions.createPage({
      path: '/post/' + id,
      component: path.resolve('src/templates/post/{blog.id}.tsx'),
      context: { id: id }
    })
  })
  // ページリスト
  result = await graphql(`
    query pageQuery {
      allMicrocmsPage(limit: 1000) {
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
      component: path.resolve('src/templates/{page.id}.tsx'),
      context: { id: id }
    })
  })
}
