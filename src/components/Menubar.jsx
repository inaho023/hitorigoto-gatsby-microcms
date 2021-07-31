// コンポーネント
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// FontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUserCircle, faPeopleArrows, faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

// スタイルシート
import * as styles from '../styles/Menubar.module.scss'

// 定数
import { URL_MY_TWITTER, URL_MY_INSTAGRAM, URL_MY_TWITCASTING } from './Constant'

const Menubar = () => {
  // Font Awesome Icon
  library.add(faHome)
  library.add(faUserCircle)
  library.add(faPeopleArrows)
  library.add(faTwitter)
  library.add(faInstagram)
  library.add(faMicrophoneAlt)
  // リターン
  return (
    <div className={styles.menubar}>
      <nav>
        <ul className={styles.primary}>
          <Link key={'Home'} to='/'>
            <li key={'Home'}>
              <a>
                <FontAwesomeIcon icon={['fas', 'home']} fixedWidth />
                {'ホーム'}
              </a>
            </li>
          </Link>
          <Link key={'Profile'} to='/profile'>
            <li key={'Profile'}>
              <a>
                <FontAwesomeIcon icon={['fas', 'user-circle']} fixedWidth />
                {'プロフィール'}
              </a>
            </li>
          </Link>
          <li key={'Social'}>
            <a href={'#'}>
              <FontAwesomeIcon icon={['fas', 'people-arrows']} fixedWidth />
              {'ソーシャル'}
            </a>
            <ul className={styles.sub}>
              <div>
                <li key={'Twitter'}>
                  <a href={URL_MY_TWITTER} target={'_blank'} rel={'noreferrer'}>
                    <FontAwesomeIcon icon={['fab', 'twitter']} fixedWidth />
                    {'Twitter'}
                  </a>
                </li>
                <li key={'Instagram'}>
                  <a href={URL_MY_INSTAGRAM} target={'_blank'} rel={'noreferrer'}>
                    <FontAwesomeIcon icon={['fab', 'instagram']} fixedWidth />
                    {'Instagram'}
                  </a>
                </li>
                <li key={'TwitCasting'}>
                  <a href={URL_MY_TWITCASTING} target={'_blank'} rel={'noreferrer'}>
                    <FontAwesomeIcon icon={['fas', 'microphone-alt']} fixedWidth />
                    {'TwitCasting'}
                  </a>
                </li>
              </div>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Menubar
