// React
import React from 'react'
import { Img } from 'react-image'

// Material-UI
import Grid from '@material-ui/core/Grid'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiChevronUp, mdiCamera } from '@mdi/js'

// その他モジュール
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

// スタイルシート
import * as styles from '../styles/Gallery.module.scss'

// 定数
import { THUMB_IMG_OPT_GALLERY, THUMB_IMG_OPT_BLUR } from './Constant'

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
          <AccordionSummary className={styles.summary} expandIcon={<Icon path={mdiChevronUp} size={2} />}>
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
                      // 画像生成
                      const img = []
                      img[0] = image.image.url + THUMB_IMG_OPT_GALLERY + THUMB_IMG_OPT_BLUR
                      img[1] = image.image.url + THUMB_IMG_OPT_GALLERY
                      const imgLoad = () => <img src={img[0]} alt={title} />
                      return (
                        <Grid item key={image.image.url} xs={6} sm={3}>
                          <a key={image.image.url} href={image.image.url}>
                            <Img className={styles.img} src={img[1]} alt={title} loader={<imgLoad />} />
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
