// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiArchive } from '@mdi/js'

// その他モジュール
import moment from 'moment'

// スタイルシート
import * as styles from '../styles/ArchiveMenu.module.scss'

const ArchiveMenu = () => {
  // 配列初期化
  const arrayYear = []
  const arrayMonth = []
  // クエリー実行
  const data = useStaticQuery(graphql`
    {
      allMicrocmsBlog(limit: 1024, sort: { fields: datetime, order: DESC }) {
        nodes {
          datetime(formatString: "YYYYMM")
        }
      }
    }
  `)
  // 年月を配列化
  data.allMicrocmsBlog.nodes.map((node, index) => {
    arrayYear[index] = moment(node.datetime, 'YYYYMM').format('YYYY')
    arrayMonth[index] = moment(node.datetime, 'YYYYMM').format('YYYYMM')
  })
  // 年および年月の配列をユニーク化
  const siteYear = Array.from(new Set(arrayYear))
  const siteMonth = Array.from(new Set(arrayMonth))
  // 月別アーカイブ
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>
          <Icon className={styles.icon} path={mdiArchive} size={1.5} />
          アーカイブ
        </p>
      </div>
      <ul key={'YearMonth'}>
        {siteYear.map(siteYear => {
          return (
            <li className={styles.dropdown} key={siteYear}>
              <input id={siteYear} type='checkbox' />
              <label htmlFor={siteYear}>
                <a data-toggle='dropdown'>{moment(siteYear, 'YYYY').format('YYYY年')}</a>
              </label>
              <ul className={styles.dropdown_menu} key={siteYear}>
                {siteMonth.map(siteMonth => {
                  return (
                    moment(siteMonth, 'YYYYMM').format('YYYY') === siteYear && (
                      <Link key={siteMonth} to={'/archive/' + siteMonth}>
                        <li key={siteMonth}>
                          <a>{moment(siteMonth, 'YYYYMM').format('MM月')}</a>
                        </li>
                      </Link>
                    )
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ArchiveMenu
