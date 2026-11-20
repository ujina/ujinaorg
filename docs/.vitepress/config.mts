import { defineConfig } from 'vitepress'
import { collectLinkCards } from './linkcard'
import { netlifyImages } from './netlify-image'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'ja',
  title: 'ひろしま海トレ日記',
  description: '能動的に代謝しよう',

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  // 最終更新日の表示（Git の履歴から取得）
  lastUpdated: true,

  // ブログ一覧のファイルは docs/blog の外に置き、URL は /blog/ のまま公開する
  // （docs/blog には記事だけを置き、CMS の記事一覧に一覧ページが混ざらないようにするため）
  rewrites: {
    'blog-index.md': 'blog/index.md',
  },

  // ブログ記事に共通の設定（記事ごとの frontmatter に書いた値が優先される）
  async transformPageData(pageData, { siteConfig }) {
    // 記事の中の <LinkCard url="..."> の相手ページから、サムネイル・タイトル・説明を取ってくる（linkcard.ts）
    const linkCards = await collectLinkCards(siteConfig.srcDir, pageData.filePath)
    if (linkCards) pageData.frontmatter.linkCards = linkCards

    if (pageData.relativePath.startsWith('blog/')) {
      // 一覧ページ以外（＝記事）には、note 風の見た目用の設定を付ける
      const isPost = !pageData.relativePath.endsWith('index.md')
      pageData.frontmatter = {
        next: false,
        ...(isPost
          ? {
              prev: false,
              aside: false, // 右側の目次を出さない
              pageClass: 'blog-post', // blog-note.css の見た目を当てる目印
            }
          : {}),
        ...pageData.frontmatter,
      }
    }
  },

  markdown: {
    // 記事の画像を、Netlify でビルドしたときだけ Netlify Image CDN で縮めて配る（netlify-image.ts）
    config(md) {
      netlifyImages(md)
    },
    // 記事の画像は、画面に近づいてから読み込む
    image: {
      lazyLoad: true,
    },
    container: {
      tipLabel: 'ヒント',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '情報',
      detailsLabel: '詳細',
    },
  },

  themeConfig: {
    nav: [
      { text: 'Intro', link: '/intro/' },
      { text: 'Tackle', link: '/tackle/' },
      { text: 'Spot', link: '/spot/' },
      { text: 'Blog', link: '/blog/' },
    ],

    sidebar: {
      '/intro/': [
        {
          items: [
            { text: 'Intro', link: '/intro/' },
            { text: '海トレBlog', link: '/blog/' },
          ],
        },
      ],
      '/tackle/': [
        {
          text: 'Tackle',
          items: [
            { text: '使用タックル', link: '/tackle/' },
            { text: '地下足袋スタイルでのゴロタ浜歩き', link: '/tackle/spike-tabi' },
          ],
        },
      ],
      '/spot/': [
        {
          text: 'Spot',
          items: [
            { text: 'Spot', link: '/spot/' },
          ],
        },
      ],
    },

    footer: {
      message: 'Made by OGASHOSHI',
    },

    // 画面の文言を日本語にする
    lastUpdated: { text: '最終更新日' },
    outline: { level: [2, 3], label: '目次' },
    docFooter: { prev: '前のページ', next: '次のページ' },
    returnToTopLabel: 'ページの先頭へ',
    sidebarMenuLabel: 'メニュー',
    darkModeSwitchLabel: '表示モード',
    lightModeSwitchTitle: 'ライトモードに切り替え',
    darkModeSwitchTitle: 'ダークモードに切り替え',
    notFound: {
      title: 'ページが見つかりません',
      quote: 'お探しのページは移動または削除された可能性があります。',
      linkText: 'トップページへ',
    },
  },
})
