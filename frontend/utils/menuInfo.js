import {
  faLayerGroup,
  faPlus,
  faEnvelope,
  faHouse,
  faCommentDots,
  faWallet,
  faYenSign,
  faChartLine,
  faCartPlus,
  faMoneyCheck,
  faBoxOpen,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"

export const DashboardMenuCategory = [
  {
    key: 'main',
    value: 'Main',
  },
  {
    key: 'assets',
    value: '資産管理',
  },
  {
    key: 'account',
    value: 'アカウント管理',
  },
  {
    key: 'others',
    value: '',
  },
]

export const DashboardMenu = [
  // ----------------- Main ----------------- 
  {
    key: 'dashboard',
    value: 'Dashboard',
    icon: faLayerGroup,
    category: 'main',
    path: '',
    order: 1,
    role: ['admin', 'seller', 'buyer'],
  },
  {
    key: 'create-listing',
    value: 'サービス登録',
    icon: faPlus,
    category: 'main',
    path: 'create-listing',
    order: 2,
    role: ['seller'],
  },
  {
    key: 'message',
    value: 'メッセージ',
    icon: faEnvelope,
    category: 'main',
    path: 'message',
    order: 3,
    role: ['admin', 'seller', 'buyer'],
  },
  // ------------------ Assets ---------------------
  {
    key: 'properties',
    value: '私のサービス',
    icon: faHouse,
    category: 'assets',
    path: 'properties',
    order: 1,
    role: ['seller'],
  },
  {
    key: 'review',
    value: 'レビュー',
    icon: faCommentDots,
    category: 'assets',
    path: 'review',
    order: 2,
    role: ['seller', 'buyer'],
    children: [
      {
        key: 'my-review',
        value: '私のレビュー',
        icon: '',
        path: 'my-review',
        order: 1,
      },
      {
        key: 'visitor-review',
        value: '訪問者のレビュー',
        icon: '',
        path: 'visitor-review',
        order: 2,
      },
    ]
  },
  {
    key: 'payment-management',
    value: '支払い管理',
    icon: faWallet,
    category: 'assets',
    path: '',
    order: 3,
    role: ['seller', 'buyer'],
    children: [
      {
        key: 'transaction-history',
        value: '取引履歴',
        icon: faChartLine,
        path: 'transaction-history',
        order: 1,
      },
      {
        key: 'price-request',
        value: '振込申請',
        icon: faYenSign,
        path: 'price-request',
        order: 2,
      },
      {
        key: 'point-back',
        value: 'ポイントパック',
        icon: faMoneyCheck,
        path: 'point-back',
        order: 3,
      },
    ]
  },
  {
    key: 'subscription',
    value: 'サブスクリプション',
    icon: faCartPlus,
    category: 'assets',
    path: 'subscription',
    order: 4,
    role: ['seller', 'buyer'],
  },
  // ---------------- Account ------------------------
  {
    key: 'package',
    value: '予約一覧',
    icon: faBoxOpen,
    category: 'account',
    path: 'package',
    order: 1,
    role: ['seller', 'buyer'],
  },
  {
    key: 'profile',
    value: 'プロフィール',
    icon: faUser,
    category: 'account',
    path: 'profile',
    order: 2,
    role: ['seller', 'buyer'],
  },
  // ---------------- Others ------------------------

]

export const accessPages = {
  admin: [
    '/dashboard', 
    '/dashboard/message',
  ],
  seller: [
    '/dashboard', 
    '/dashboard/create-listing', 
    '/dashboard/message', 
    '/dashboard/properties', 
    '/dashboard/my-review',
    '/dashboard/visitor-review',
    '/dashboard/transaction-history',
    '/dashboard/price-request',
    '/dashboard/point-back',
    '/dashboard/subscription',
    '/dashboard/package',
    '/dashboard/profile'
  ],
  buyer: [
    '/dashboard',
    '/dashboard/message',
    '/dashboard/my-review',
    '/dashboard/visitor-review',
    '/dashboard/transaction-history',
    '/dashboard/price-request',
    '/dashboard/point-back',
    '/dashboard/subscription',
    '/dashboard/package',
    '/dashboard/profile'
  ]
}