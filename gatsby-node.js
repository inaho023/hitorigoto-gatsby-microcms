// プラグインの読み込み
const moment = require('moment')
const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')
//
async function createPages({ actions, graphql }) {
  const { createPage } = actions
  var result
  var context
  var list
  var pathList
  // 記事リスト
  list = 'all'
  const { blogPosts } = await graphql(`
    query {
      query($limit: Int!, $skip: Int!) {
        allMicrocmsBlog {
          nodes {
            blogId
          }
        }
      }
  `)
  paginate({
    createPage, // The Gatsby `createPage` function
    items: blogPosts, // An array of objects
    itemsPerPage: 12, // How many items you want per page
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? '/' : '/page'), // Creates pages like `/blog`, `/blog/2`, etc
    component: path.resolve('src/templates/index.js') // Just like `createPage()`
  })
  // アーカイブリスト
  list = 'archive'
  context = []
  pathList = []
  const blogArchive = []
  const { archive } = await graphql(`
    query {
      allMicrocmsBlog(limit: 1024) {
        nodes {
          datetime(formatString: "YYYYMM")
        }
      }
  `)
  archive.allMicrocmsBlog.nodes.forEach((node, index) => {
    const id = node.datetime
    const name = moment(node.datetime, 'YYYYMM').format('YYYY年MM月')
    const from = new Date(Number(node.datetime.substring(0, 3)), Number(node.datetime.substring(4, 5)), 1)
    const to = new Date(Number(node.datetime.substring(4, 5)) + 1 === 13 ? Number(node.datetime.substring(0, 3)) + 1 : Number(node.datetime.substring(0, 3)), Number(node.datetime.substring(4, 5)) + 1 === 13 ? 1 : Number(node.datetime.substring(4, 5)) + 1, 1)
    context[index] = { list: list, id: id, name: name, from: from, to: to }
    pathList[index] = '/' + list + '/' + id
    actions.createPage({
      path: pathList[index],
      component: path.resolve('src/templates/index.tsx'),
      context: context[index]
    })
    // 記事リスト（アーカイブ）
    blogArchive[index] = graphql(`
      query {
        query($limit: Int!, $skip: Int!, $from: ${from.toISOString()}, $to: ${to.toISOString()}) {
          allMicrocmsBlog(
            limit: $limit
            skip: $skip
            sort: {fields: datetime, order: DESC}
            filter: {datetime: {gte: $from, lt: $to}}
          ) {
            edges {
              node {
                blogId
              }
            }
          }
        }
      }
    `)
  })
  // クエリーを実行
  result = Promise.all(blogArchive)
  // ID毎にページを生成
  result.map((result, index) => {
    paginate({
      createPage, // The Gatsby `createPage` function
      items: result, // An array of objects
      itemsPerPage: 12, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/index.tsx') // Just like `createPage()`
    })
  })
  // カテゴリーリスト
  list = 'category'
  context = []
  pathList = []
  const blogCategory = []
  const { category } = await graphql(`
    query {
      allMicrocmsCategories(limit: 1024) {
        nodes {
          categoriesId
          name
        }
      }
    }
  `)
  category.allMicrocmsCategories.nodes.forEach((node, index) => {
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
      query($limit: Int!, $skip: Int!, $id: ${id}) {
        {
          allMicrocmsBlog(
            limit: $limit
            skip: $skip
            sort: {fields: datetime, order: DESC}
            filter: {category: {id: {eq: $id}}}
          ) {
            edges {
              node {
                blogId
              }
            }
          }
        }
      }
    `)
  })
  // クエリーを実行
  result = Promise.all(blogCategory)
  // ID毎にページを生成
  result.map((result, index) => {
    paginate({
      createPage, // The Gatsby `createPage` function
      items: result, // An array of objects
      itemsPerPage: 12, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/index.tsx') // Just like `createPage()`
    })
  })
  // タグリスト
  list = 'tag'
  context = []
  pathList = []
  const blogTag = []
  const { tag } = await graphql(`
    query {
      allMicrocmsTags(limit: 1024) {
        nodes {
          tagsId
          name
        }
      }
    }
  `)
  tag.allMicrocmsBlog.nodes.forEach((node, index) => {
    const list = 'tag'
    const id = node.tagsId
    const name = node.name
    context[index] = { list: list, id: id, name: name }
    pathList[index] = '/' + list + '/' + id
    actions.createPage({
      path: pathList[index],
      component: path.resolve('src/templates/tag/{id}.tsx'),
      context: context[index]
    })
    blogTag[index] = graphql(`
      query ($limit: Int!, $skip: Int!, $id: ${id}) {
        allMicrocmsBlog(limit: $limit, skip: $skip, sort: { fields: datetime, order: DESC }, filter: { tags: { elemMatch: { id: { in: $id } } } }) {
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
  result = Promise.all(blogCategory)
  // ID毎にページを生成
  result.map((result, index) => {
    paginate({
      createPage, // The Gatsby `createPage` function
      items: result, // An array of objects
      itemsPerPage: 12, // How many items you want per page
      pathPrefix: pathList[index], // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve('src/templates/index.tsx') // Just like `createPage()`
    })
  })
  // 記事詳細
  const { posts } = await graphql(`
    query {
      allMicrocmsBlog(limit: 1024) {
        nodes {
          blogId
        }
      }
  `)
  posts.allMicrocmsPage.nodes.forEach(node => {
    const id = node.blogId
    actions.createPage({
      path: '/post/' + id,
      component: path.resolve('src/templates/post/{id}.tsx'),
      context: { id: id }
    })
  })
  // ページリスト
  const { pages } = await graphql(`
    query {
      allMicrocmsPage(limit: 1024) {
        nodes {
          pageId
        }
      }
    }
  `)
  pages.allMicrocmsPage.nodes.forEach(node => {
    const id = node.pageId
    actions.createPage({
      path: '/' + id,
      component: path.resolve('src/templates/page.tsx'),
      context: { id: id }
    })
  })
}
