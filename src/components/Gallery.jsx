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

// スタイルシート
import * as styles from '../styles/Gallery.module.scss'

// 定数
import { imgixImageOption, imgixCopyright } from './Constant'

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
            <Icon path={mdiCamera} size={2} title={'ギャラリー'} />
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
                      const title = gallery.name + '　' + (gallery.display_name == null ? '' : gallery.display_name + '　') + (index + 1).toString() + '枚目'
                      // 画像URL生成
                      const src = images.image.url + imgixImageOption.gallery.m + imgixCopyright.m
                      const srcSet = `${images.image.url}${imgixImageOption.gallery.xs}${imgixCopyright.xs} 280w,
                                      ${images.image.url}${imgixImageOption.gallery.s}${imgixCopyright.xs} 330w,
                                      ${images.image.url}${imgixImageOption.gallery.m}${imgixCopyright.xs} 380w,
                                      ${images.image.url}${imgixImageOption.gallery.l}${imgixCopyright.xs} 430w,
                                      ${images.image.url}${imgixImageOption.gallery.xl}${imgixCopyright.xs} 480w`
                      const sizes = '(max-width:900px) 50vw, 25vw'
                      // リターン
                      return (
                        <Grid item key={images.image.url} xs={6} sm={3}>
                          <a key={images.image.url} href={images.image.url + '?' + imgixCopyright.full}>
                            <img className={styles.img} src={src} srcSet={srcSet} sizes={sizes} alt={title} loading={'lazy'} />
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
