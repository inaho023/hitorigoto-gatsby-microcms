// React
import React from 'react'

// Material-UI
import Grid from '@material-ui/core/Grid'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiChevronDown, mdiCamera } from '@mdi/js'

// その他モジュール
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

// スタイルシート
import * as styles from '../styles/Gallery.module.scss'

// 定数
import { THUMB_IMG_OPT_DESKTOP_GALLERY, THUMB_IMG_OPT_MOBILE_GALLERY } from './Constant'

// ギャラリーコンポーネント
const Gallery = ({ galleries }) => {
  // リターン
  return galleries.map(galleries => {
    return galleries.gallery.map((gallery, index) => {
      // ギャラリータイトル設定
      const galleryTitle = gallery.display_name ? gallery.display_name : gallery.name
      // リターン
      return (
        <Accordion key={'Gallery' + (index + 1).toString()} className={styles.gallery} defaultExpanded>
          <AccordionSummary className={styles.summary} expandIcon={<Icon path={mdiChevronDown} size={2} />}>
            <Icon path={mdiCamera} size={2} title={galleryTitle} />
            <span className={styles.text}>{galleryTitle}</span>
          </AccordionSummary>
          <AccordionDetails>
            <SimpleReactLightbox>
              <SRLWrapper>
                <Grid container className={styles.details} spacing={0}>
                  {
                    // 画像を配置
                    gallery.images.map((image, index) => {
                      // キャプション生成
                      const title = gallery.name + '　' + (gallery.display_name == null ? '' : gallery.display_name + '　') + (index + 1).toString() + '枚目'
                      // リターン
                      return (
                        <Grid item key={image.image.url} xs={6} sm={3}>
                          <a key={image.image.url} href={image.image.url}>
                            <img className={styles.img} src={image.image.url + THUMB_IMG_OPT_MOBILE_GALLERY} srcSet={image.image.url + THUMB_IMG_OPT_MOBILE_GALLERY + ' 960w,' + image.image.url + THUMB_IMG_OPT_DESKTOP_GALLERY} alt={title} loading={'lazy'} />
                          </a>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </SRLWrapper>
            </SimpleReactLightbox>
          </AccordionDetails>
        </Accordion>
      )
    })
  })
}

export default Gallery
