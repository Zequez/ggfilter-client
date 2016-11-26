export default process.env.NODE_ENV === 'production' ? {
  apiHost: '',
  origin: 'http://ggfilter.com',
  bitcoinDonationWallet: '3DJXPqcrZD84wwHMGtJGYYkH21hETuxXWa'
} : {
  apiHost: 'http://localhost:3000',
  origin: 'http://localhost:8001',
  bitcoinDonationWallet: '3DJXPqcrZD84wwHMGtJGYYkH21hETuxXWa'
}
