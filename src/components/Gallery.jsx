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
import { imgixImageOption, imgixCopyright } from './Constant'

// ギャラリーコンポーネント
const Gallery = ({ galleries }) => {
  // コピーライトテキスト生成
  const b64Text = Base64.encodeURI(imgixCopyright.text)
  const copyrightTextFull = imgixCopyright.option.full + '&txt64=' + b64Text
  const copyrightTextSmall = imgixCopyright.option.s + '&txt64=' + b64Text
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
                      const src = images.image.url + imgixImageOption.gallery.m + copyrightTextSmall
                      let srcSet = ''
                      srcSet = images.image.url + imgixImageOption.gallery.xs + copyrightTextSmall + ' 280w'
                      srcSet = srcSet + ',' + images.image.url + imgixImageOption.gallery.s + copyrightTextSmall + ' 330w'
                      srcSet = srcSet + ',' + images.image.url + imgixImageOption.gallery.m + copyrightTextSmall + ' 380w'
                      srcSet = srcSet + ',' + images.image.url + imgixImageOption.gallery.l + copyrightTextSmall + ' 430w'
                      srcSet = srcSet + ',' + images.image.url + imgixImageOption.gallery.xl + copyrightTextSmall + ' 480w'
                      const sizes = '(max-width:900px) 50vw, 25vw'
                      // リターン
                      return (
                        <Grid item key={images.image.url} xs={6} sm={3}>
                          <a key={images.image.url} href={images.image.url + '?' + copyrightTextFull}>
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
