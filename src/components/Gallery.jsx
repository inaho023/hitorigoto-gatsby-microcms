// React
import React from 'react'
import { Img } from 'react-image'

// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

// その他モジュール
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

// スタイルシート
import * as styles from '../styles/Gallery.module.scss'

// 定数
import { THUMB_IMG_OPT_GALLERY, THUMB_IMG_OPT_BLUR } from './Constant'

// ギャラリーコンポーネント
const Gallery = ({ galleries }) => {
  // Font Awesome Icon
  library.add(faCamera)
  // リターン
  return galleries.map(galleries => {
    return galleries.gallery.map((gallery, index) => {
      // ギャラリータイトル設定
      const galleryTitle = gallery.display_name ? gallery.display_name : gallery.name
      // リターン
      return (
        <div className={styles.gallery} key={'Gallery' + (index + 1).toString()}>
          <details key={'Gallery' + (index + 1).toString()} open>
            <summary>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={['fas', 'camera']} />
              </span>
              <span className={styles.text}>{galleryTitle}</span>
            </summary>
            <SimpleReactLightbox>
              <SRLWrapper>
                <div className={styles.image_wrapper} key={'ImageWrapper' + (index + 1).toString()}>
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
                        <a key={image.image.url} href={image.image.url}>
                          <Img className={styles.img} src={img[1]} alt={title} loader={<imgLoad />} />
                        </a>
                      )
                    })
                  }
                </div>
              </SRLWrapper>
            </SimpleReactLightbox>
          </details>
        </div>
      )
    })
  })
}

export default Gallery
