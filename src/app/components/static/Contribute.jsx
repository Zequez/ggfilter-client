import th from './theme'
import React from 'react'
import Page from 'src/app/components/Tabs/Page'

import config from 'src/app/config'
const WALLET_QR = require('images/bitcoins_address.png')
const WALLET = config.bitcoinDonationWallet

export default (other) => (
  <Page Title='Contribute' bigHeader card textContent {...other} className={th.contribute}>
    <img className={th.qr} src={WALLET_QR}/>
    <h3>Bitcoins</h3>
    <p>
      You can always donate bitcoins to the cause: <a href={'bitcoin:' + WALLET}>{WALLET}</a>
      <br/>
      I promise to spend it on server fees, my coffee addiction, and helping me get through college.
    </p>
    <h3>Offer me a job!</h3>
    <p>
      I also happen to be a web developer! Go figure!
      <br/>
      I'm always looking for freelance jobs, or non-full-time remote jobs!
      <br/>
      Anyway, shameless plug here, <a href='http://zequez.com'>zequez.com</a> is my blog/portfolio that
      I mostly use as portfolio rather than blog. You can find contact
      information and other stuff there.
    </p>
    <h3>Patreon</h3>
    <p>
      Should I create a Patreon for the project?
    </p>
  </Page>
)

// export default Page({card: true}, () => (
//   <h2>Contribute</h2>
// ), () => (
//   <img className='bitcoins-wallet-qr' src={WALLET_QR}/>
//   <h3>Bitcoins</h3>
//   <p>
//     You can always donate bitcoins to the cause: <a href={'bitcoin:' + WALLET}>{WALLET}</a>
//     <br/>
//     I promise to spend it on server fees, my coffee addiction, and helping me get through college.
//   </p>
//   <h3>Offer me a job!</h3>
//   <p>
//     I also happen to be a web developer! Go figure!
//     <br/>
//     I'm always looking for freelance jobs, or non-full-time remote jobs!
//     <br/>
//     Anyway, shameless plug here, <a href='http://zequez.com'>zequez.com</a> is my blog/portfolio that
//     I mostly use as portfolio rather than blog. You can find contact
//     information and other stuff there.
//   </p>
//   <h3>Patreon</h3>
//   <p>
//     Should I create a Patreon for the project?
//   </p>
// ))
//
// export default ({onClickMenu}) => (
//   <div className='contribute'>
//     <AppBar onClickMenu={onClickMenu}>
//       <h2>Contribute</h2>
//     </AppBar>
//     <AppBody card>
//       <img className='bitcoins-wallet-qr' src={WALLET_QR}/>
//       <h3>Bitcoins</h3>
//       <p>
//         You can always donate bitcoins to the cause: <a href={'bitcoin:' + WALLET}>{WALLET}</a>
//         <br/>
//         I promise to spend it on server fees, my coffee addiction, and helping me get through college.
//       </p>
//       <h3>Offer me a job!</h3>
//       <p>
//         I also happen to be a web developer! Go figure!
//         <br/>
//         I'm always looking for freelance jobs, or non-full-time remote jobs!
//         <br/>
//         Anyway, shameless plug here, <a href='http://zequez.com'>zequez.com</a> is my blog/portfolio that
//         I mostly use as portfolio rather than blog. You can find contact
//         information and other stuff there.
//       </p>
//       <h3>Patreon</h3>
//       <p>
//         Should I create a Patreon for the project?
//       </p>
//     </AppBody>
//   </div>
// )
