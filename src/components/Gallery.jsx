// React
import React from 'react'

// Material-UI
import Grid from '@mui/material/Grid'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiChevronDown, mdiCamera } from '@mdi/js'

// その他モジュール
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

// 自作ライブラリー
import { imgixWatermark } from '../libs/Util'
import { imgixImageOption } from '../libs/Constant'

// スタイルシート
import * as styles from '../styles/Gallery.module.scss'

// ギャラリーコンポーネント
const Gallery = ({ galleries }) => {
  // ウォーターマークURL取得
  const imageWatermark = imgixWatermark()
  // リターン
  return galleries.map(galleries => {
    return galleries.gallery.map((gallery, index) => {
      // ギャラリータイトル設定
      const galleryTitle = gallery.display_name ? gallery.display_name : gallery.name
      // リターン
      return (
        <Accordion key={'Gallery' + (index + 1).toString()} className={styles.gallery} defaultExpanded>
          <AccordionSummary className={styles.summary} expandIcon={<Icon path={mdiChevronDown} size={1} />}>
            <Icon path={mdiCamera} size={1} title={'ギャラリー'} />
            <span className={styles.text}>{galleryTitle}</span>
          </AccordionSummary>
          <AccordionDetails>
            <SimpleReactLightbox>
              <SRLWrapper>
                <Grid container className={styles.details} spacing={0}>
                  {
                    // 画像を配置
                    gallery.images.map((images, index) => {
                      // キャプション生成
                      const title =
                        gallery.name +
                        ' ' +
                        (gallery.display_name ? gallery.display_name + ' ' : '') +
                        (index + 1).toString() +
                        '枚目'
                      // 画像URL生成
                      const src = images.image.url + imgixImageOption.gallery.m + imageWatermark.m
                      const srcSet =
                        `${images.image.url}${imgixImageOption.gallery.xs}${imageWatermark.s} 280w,` +
                        `${images.image.url}${imgixImageOption.gallery.s}${imageWatermark.s} 330w,` +
                        `${images.image.url}${imgixImageOption.gallery.m}${imageWatermark.s} 380w,` +
                        `${images.image.url}${imgixImageOption.gallery.l}${imageWatermark.s} 430w,` +
                        `${images.image.url}${imgixImageOption.gallery.xl}${imageWatermark.s} 480w`
                      const sizes = '(max-width:900px) 50vw, 25vw'
                      // リターン
                      return (
                        <Grid item key={images.image.url} xs={6} md={3}>
                          <a key={images.image.url} href={images.image.url + '?' + imageWatermark.full}>
                            <img className={styles.img} srcSet={srcSet} sizes={sizes} src={src} alt={title} loading={'lazy'} />
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
