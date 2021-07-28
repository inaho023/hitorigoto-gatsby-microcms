// React
import React from 'react'

// React Share
import { EmailShareButton, FacebookShareButton, HatenaShareButton, LineShareButton, PinterestShareButton, PocketShareButton, TumblrShareButton, TwitterShareButton, EmailIcon, FacebookIcon, HatenaIcon, LineIcon, PinterestIcon, PocketIcon, TumblrIcon, TwitterIcon } from 'react-share'

// スタイルシート
import styles from '../styles/ShareButton.module.scss'

// 定数
import { SITE_TITLE, SITE_URL, SHARE_BUTTON_SIZE } from './Constant'

const ShareButton = props => {
  const url = SITE_URL + '/post/' + props.data.microcmsBlog.blogId
  const title = props.data.microcmsBlog.title.replace('＠', ' ＠ ').replace('@', ' @ ')
  return (
    <div className={styles.share}>
      <div className={styles.button}>
        <TwitterShareButton url={url} title={title} hashtags={[SITE_TITLE]}>
          <TwitterIcon size={SHARE_BUTTON_SIZE} round />
        </TwitterShareButton>
      </div>
      <div className={styles.button}>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={SHARE_BUTTON_SIZE} round />
        </FacebookShareButton>
      </div>
      <div className={styles.button}>
        <TumblrShareButton url={url} title={title}>
          <TumblrIcon size={SHARE_BUTTON_SIZE} round />
        </TumblrShareButton>
      </div>
      <div className={styles.button}>
        <LineShareButton url={url} title={title}>
          <LineIcon size={SHARE_BUTTON_SIZE} round />
        </LineShareButton>
      </div>
      <div className={styles.button}>
        <PinterestShareButton url={url} description={title} media={''}>
          <PinterestIcon size={SHARE_BUTTON_SIZE} round />
        </PinterestShareButton>
      </div>
      <div className={styles.button}>
        <PocketShareButton url={url} title={title}>
          <PocketIcon size={SHARE_BUTTON_SIZE} round />
        </PocketShareButton>
      </div>
      <div className={styles.button}>
        <HatenaShareButton url={url} title={title}>
          <HatenaIcon size={SHARE_BUTTON_SIZE} round />
        </HatenaShareButton>
      </div>
      <div className={styles.button}>
        <EmailShareButton url={url} subject={title} body={title}>
          <EmailIcon size={SHARE_BUTTON_SIZE} round />
        </EmailShareButton>
      </div>
    </div>
  )
}

export default ShareButton
