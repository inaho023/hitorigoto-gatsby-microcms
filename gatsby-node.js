// モジュールの読み込み
const path = require('path')
const dayjs = require('dayjs')
const { paginate } = require('gatsby-awesome-pagination')
// 定数
const siteListPerPage = 12 // 1ページあたりの記事数
//
exports.onCreateWebpackConfig = helper => {
  const { stage, actions, getConfig } = helper
  if (stage === 'develop') {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(plugin => plugin.constructor.name === 'MiniCssExtractPlugin')
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}
//
exports.createPages = async ({ graphql, actions }) => {
  // 定数定義
  const { createPage } = actions
  // 変数定義
  let result
  let context
  let list
  let type
  let pathList
  // 記事リスト
  type = 'website'
  list = 'all'
  result = await graphql(`
    query {
      allMicrocmsBlog(limit: 10000, sort: { datetime: DESC }) {
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
    itemsPerPage: siteListPerPage, // How many items you want per page
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? '/' : '/page'), // Creates pages like `/blog`, `/blog/2`, etc
    component: path.resolve('src/templates/index.jsx'), // Just like `createPage()`
    context: { type: type, list: list }
  })
  // アーカイブリスト
  list = 'archive'
  context = []
  pathList = []
  const blogArchive = []
  result = await graphql(`
    query {
      allMicrocmsBlog(limit: 10000, sort: { datetime: DESC }) {
        edges {
          node {
            datetime(formatString: "YYYYMM")
          }
        }
      }
    }
  `)
  result.data.allMicrocmsBlog.edges.forEach((edge, index) => {
    const type = 'website'
    const id = edge.node.datetime
    const name = dayjs(edge.node.datetime, 'YYYYMM').format('YYYY年M月')
    const from = dayjs(id, 'YYYYMM').startOf('month').format()
    const to = dayjs(id, 'YYYYMM').startOf('month').add(1, 'month').format()
    context[index] = { type: type, list: list, id: id, name: name, from: from, to: to }
    pathList[index] = '/' + list + '/' + id
    // 記事リスト（アーカイブ）
    blogArchive[index] = graphql(`
      query archiveListQuery($from: Date = "${from}", $to: Date = "${to}") {
        allMicrocmsBlog(limit: 10000, sort: { datetime: DESC }, filter: { datetime: { gte: $from, lt: $to } }) {
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
      itemsPerPage: siteListPerPage, // How many items you want per page
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
      allMicrocmsCategory(limit: 10000) {
        nodes {
          categoryId
          name
        }
      }
    }
  `)
  result.data.allMicrocmsCategory.nodes.forEach((node, index) => {
    const type = 'website'
    const id = node.categoryId
    const name = node.name
    context[index] = { type: type, list: list, id: id, name: name }
    pathList[index] = '/' + list + '/' + id
    // 記事リスト（カテゴリー）
    blogCategory[index] = graphql(`
      query categoryListQuery($id: String = "${id}") {
        allMicrocmsBlog(limit: 10000, sort: { datetime: DESC }, filter: { category: { id: { eq: $id } } }) {
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
      itemsPerPage: siteListPerPage, // How many items you want per page
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
      allMicrocmsTag(limit: 10000) {
        nodes {
          tagId
          name
        }
      }
    }
  `)
  result.data.allMicrocmsTag.nodes.forEach((node, index) => {
    const type = 'website'
    const list = 'tag'
    const id = node.tagId
    const name = node.name
    context[index] = { type: type, list: list, id: id, name: name }
    pathList[index] = '/' + list + '/' + id
    blogTag[index] = graphql(`
      query tagListQuery($id: String = "${id}") {
        allMicrocmsBlog(limit: 10000, sort: { datetime: DESC }, filter: { tags: { elemMatch: { id: { eq: $id } } } }) {
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
      itemsPerPage: siteListPerPage, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/tag/{tag.id}.jsx'), // Just like `createPage()`
      context: context[index]
    })
  })
  // 記事詳細
  result = await graphql(`
    query postQuery {
      allMicrocmsBlog(limit: 10000, sort: { datetime: DESC }) {
        edges {
          node {
            blogId
            title
            image {
              url
              width
              height
              imgixImage {
                gatsbyImageData(
                  imgixParams: { fit: "crop", crop: "faces", q: 20, w: 96, h: 96 }
                  placeholderImgixParams: { fit: "crop", crop: "faces", q: 20, w: 96, h: 96 }
                  placeholder: BLURRED
                  width: 96
                  height: 96
                  layout: CONSTRAINED
                )
              }
            }
            body
          }
        }
      }
    }
  `)
  const blog = result.data.allMicrocmsBlog.edges
  const first = blog[0]
  const last = blog[blog.length - 1]
  result.data.allMicrocmsBlog.edges.forEach(edge => {
    const type = 'article'
    const id = edge.node.blogId
    const current = blog.findIndex(blog => blog.node.blogId === id)
    const post = blog[current].node
    const prev = current === 0 ? null : blog[current - 1]
    const next = current === blog.length - 1 ? null : blog[current + 1]
    actions.createPage({
      path: '/post/' + id,
      component: path.resolve('src/templates/post/{blog.id}.jsx'),
      context: { type: type, id: id, post: post, prev: prev, next: next, first: first, last: last }
    })
  })
  // ページリスト
  result = await graphql(`
    query pageQuery {
      allMicrocmsPage(limit: 10000) {
        nodes {
          pageId
          title
          image {
            url
            width
            height
          }
          body
        }
      }
    }
  `)
  result.data.allMicrocmsPage.nodes.forEach(node => {
    const type = 'article'
    const id = node.pageId
    const post = node
    actions.createPage({
      path: '/' + id,
      component: path.resolve('src/templates/{page.id}.jsx'),
      context: { type: type, id: id, post: post }
    })
  })
}
