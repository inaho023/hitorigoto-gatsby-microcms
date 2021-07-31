// React
import React from 'react'

// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

// その他モジュール
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

// スタイルシート
import * as styles from '../styles/Gallery.module.scss'

// 定数
import { THUMB_IMG_OPT_GALLERY } from './Constant'

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
                      const title = gallery.name + '　' + (gallery.display_name == null ? '' : gallery.display_name + '　') + (index + 1).toString() + '枚目'
                      return (
                        <a key={image.image.url} href={image.image.url}>
                          <img src={image.image.url + THUMB_IMG_OPT_GALLERY} alt={title} />
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
