// React
import React from 'react'

// Gatsby
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'

// Material-UI
import Grid from '@mui/material/Grid'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiChevronDown, mdiCamera } from '@mdi/js'

// その他モジュール
import LightGallery from 'lightgallery/react'
import lgZoom from 'lightgallery/plugins/zoom'
import lgThumbnail from 'lightgallery/plugins/thumbnail'

// 自作ライブラリー
import { imgixWatermark } from '../libs/Util'

// スタイルシート
import * as styles from '../styles/PhotoGallery.module.scss'
import 'lightgallery/scss/lightgallery.scss'
import 'lightgallery/scss/lg-zoom.scss'
import 'lightgallery/scss/lg-thumbnail.scss'

// ギャラリーコンポーネント
const PhotoGallery = ({ galleries }) => {
  // ウォーターマークURL取得
  const imageWatermark = imgixWatermark()
  // リターン
  return galleries.map(galleries => {
    return galleries.gallery.map(gallery => {
      // クラス名生成
      const className = 'lg-' + gallery.id
      // ギャラリータイトル設定（フル）
      const galleryTitleFull = gallery.name + (gallery.display_name && ' ' + gallery.display_name)
      // ギャラリータイトル設定（サブ）
      const galleryTitleSub = gallery.display_name ? gallery.display_name : gallery.name
      // リターン
      return (
        <Accordion key={'Gallery-' + gallery.id} className={styles.gallery} defaultExpanded>
          <AccordionSummary className={styles.summary} expandIcon={<Icon path={mdiChevronDown} size={1} />}>
            <Icon path={mdiCamera} size={1} title={'ギャラリー'} />
            <span className={styles.text}>
              <h3>{galleryTitleSub}</h3>
            </span>
          </AccordionSummary>
          <AccordionDetails className={styles.detail}>
            <LightGallery
              licenseKey={process.env.LIGHTGALLERY_KEY}
              exThumbImage={'data-external-thumb-image'}
              plugins={[lgZoom, lgThumbnail]}
              mode={'lg-slide'}
              elementClassNames={styles.thumbnails}
              selector={'.' + className}
              mousewheel
              strings={{
                closeGallery: '閉じる',
                toggleMaximize: '最大化',
                previousSlide: '前へ',
                nextSlide: '次へ',
                download: 'ダウンロード',
                playVideo: '再生'
              }}
              ZoomPluginStrings={{
                zoomIn: 'ズームイン',
                zoomOut: 'ズームアウト',
                viewActualSize: '元のサイズ'
              }}
            >
              <Grid container spacing={0}>
                {
                  // 画像を配置
                  gallery.images.map((images, index) => {
                    // ギャラリー用データー生成
                    const title = `${galleryTitleFull} ${(index + 1).toString()}枚目`
                    const dataSrc = `${images.image.url}?${imageWatermark.full}`
                    const dataSize = `${images.image.width.toString()}-${images.image.height.toString()}`
                    const dataThumb = getSrc(images.image.imgixImage)
                    // リターン
                    return (
                      <Grid
                        key={images.image.url}
                        className={className + ' ' + styles.thumbnail}
                        data-src={dataSrc}
                        data-lg-size={dataSize}
                        data-external-thumb-image={dataThumb}
                        title={title}
                        size={{
                          xs: 6,
                          md: 3
                        }}>
                        <GatsbyImage image={getImage(images.image.imgixImage)} alt={title} />
                      </Grid>
                    );
                  })
                }
              </Grid>
            </LightGallery>
          </AccordionDetails>
        </Accordion>
      );
    });
  });
}

export default PhotoGallery
