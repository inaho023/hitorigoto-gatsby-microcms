// React
import React from 'react'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiArchive, mdiChevronDown } from '@mdi/js'

// その他モジュール
import dayjs from 'dayjs'

// スタイルシート
import * as styles from '../styles/ArchiveMenu.module.scss'

// アーカイブメニューコンポーネント
const ArchiveMenu = () => {
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
  // 配列初期化
  const arrayYear = []
  const arrayMonth = []
  // 年月を配列化
  data.allMicrocmsBlog.nodes.map((node, index) => {
    arrayYear[index] = dayjs(node.datetime, 'YYYYMM').format('YYYY')
    arrayMonth[index] = dayjs(node.datetime, 'YYYYMM').format('YYYYMM')
  })
  // 年および年月の配列をユニーク化
  const siteYear = Array.from(new Set(arrayYear))
  const siteMonth = Array.from(new Set(arrayMonth))
  // 月別アーカイブ
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.title}>
        <Icon className={styles.icon} path={mdiArchive} size={1.5} />
        <p>アーカイブ</p>
      </Box>
      <Box className={styles.menu}>
        {siteYear.map(siteYear => {
          return (
            <Accordion key={siteYear} className={styles.accordion}>
              <AccordionSummary expandIcon={<Icon path={mdiChevronDown} size={1} />}>
                {dayjs(siteYear, 'YYYY').format('YYYY年')}
              </AccordionSummary>
              <AccordionDetails className={styles.detail}>
                <ButtonGroup orientation={'vertical'} fullWidth>
                  {siteMonth.map(siteMonth => {
                    return (
                      dayjs(siteMonth, 'YYYYMM').format('YYYY') === siteYear && (
                        <Link key={siteMonth} to={`/archive/${siteMonth}/`}>
                          <Button key={siteMonth} className={styles.button} size={'large'} variant={'contained'} fullWidth>
                            {dayjs(siteMonth, 'YYYYMM').format('M月')}
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
      </Box>
    </Box>
  )
}

export default ArchiveMenu
