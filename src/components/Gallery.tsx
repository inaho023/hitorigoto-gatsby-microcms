// React
import * as React from 'react'

// Gatsby
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

// その他モジュール
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

// スタイルシート
import styles from '../styles/Gallery.module.scss'

// 定数
import { THUMB_IMG_OPT_GALLERY } from './Constant'

const Gallery = props => {
  // Font Awesome Icon
  library.add(faCamera)
  //
  return props.map(galleries => {
    return galleries.gallery.map((gallery, index) => {
      // ギャラリータイトル設定
      const galleryTitle = gallery.display_name ? gallery.display_name : gallery.name
      //
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
                  {gallery.images.map((images, index) => {
                    const image = getImage(images.image.url)
                    const title = gallery.name + '　' + (gallery.display_name == null ? '' : gallery.display_name + '　') + (index + 1).toString() + '枚目'
                    return (
                      <a key={images.image.url} href={images.image.url}>
                        <GatsbyImage className={styles.image_box} key={images.image.url} image={image} alt={title} />
                      </a>
                    )
                  })}
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
