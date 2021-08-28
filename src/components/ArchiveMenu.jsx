// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiArchive, mdiChevronDown } from '@mdi/js'

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
        <Icon className={styles.icon} path={mdiArchive} size={1.5} />
        <p>アーカイブ</p>
      </div>
      <div className={styles.menu}>
        {siteYear.map(siteYear => {
          return (
            <Accordion key={siteYear} className={styles.accordion}>
              <AccordionSummary expandIcon={<Icon path={mdiChevronDown} size={1} />}>{moment(siteYear, 'YYYY').format('YYYY年')}</AccordionSummary>
              <AccordionDetails className={styles.detail}>
                <ButtonGroup orientation={'vertical'} fullWidth>
                  {siteMonth.map(siteMonth => {
                    return (
                      moment(siteMonth, 'YYYYMM').format('YYYY') === siteYear && (
                        <Link key={siteMonth} to={'/archive/' + siteMonth}>
                          <Button key={siteMonth} className={styles.button} size={'large'} variant={'contained'} fullWidth>
                            <a>{moment(siteMonth, 'YYYYMM').format('M月')}</a>
                          </Button>
                        </Link>
                      )
                    )
                  })}
                </ButtonGroup>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}

export default ArchiveMenu
