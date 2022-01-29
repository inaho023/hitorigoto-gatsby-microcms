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
import { Base64 } from 'js-base64'

// スタイルシート
import * as styles from '../styles/Gallery.module.scss'

// 定数
import { IMGIX_IMG_OPT_GALLERY_L, IMGIX_IMG_OPT_GALLERY_M, IMGIX_IMG_OPT_GALLERY_S, IMGIX_COPYRIGHT_OPT_F, IMGIX_COPYRIGHT_OPT_S, IMGIX_COPYRIGHT_TEXT } from './Constant'

// ギャラリーコンポーネント
const Gallery = ({ galleries }) => {
  // コピーライトテキスト生成
  const b64Text = Base64.encodeURI(IMGIX_COPYRIGHT_TEXT)
  const copyrightTextFull = IMGIX_COPYRIGHT_OPT_F + '&txt64=' + b64Text
  const copyrightTextSmall = IMGIX_COPYRIGHT_OPT_S + '&txt64=' + b64Text
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
                    gallery.images.map((image, index) => {
                      // キャプション生成
                      const title = gallery.name + '　' + (gallery.display_name == null ? '' : gallery.display_name + '　') + (index + 1).toString() + '枚目'
                      // 画像URL生成
                      const src = image.image.url + IMGIX_IMG_OPT_GALLERY_M + copyrightTextSmall
                      let srcSet = ''
                      srcSet = image.image.url + IMGIX_IMG_OPT_GALLERY_S + IMGIX_COPYRIGHT_OPT_S + copyrightTextSmall + ' 280w'
                      srcSet = srcSet + ',' + image.image.url + IMGIX_IMG_OPT_GALLERY_M + IMGIX_COPYRIGHT_OPT_S + copyrightTextSmall + ' 380w'
                      srcSet = srcSet + ',' + image.image.url + IMGIX_IMG_OPT_GALLERY_L + IMGIX_COPYRIGHT_OPT_S + copyrightTextSmall + ' 480w'
                      const sizes = '(max-width:900px) 50vw, 25vw'

                      // リターン
                      return (
                        <Grid item key={image.image.url} xs={6} sm={3}>
                          <a key={image.image.url} href={image.image.url + '?' + copyrightTextFull}>
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
