import th from './theme'
import React from 'react'

import config from 'src/app/config'
const WALLET_QR = require('images/bitcoins_address.png')
const WALLET = config.bitcoinDonationWallet

import { AutoPage } from 'src/Layout'

export default () => (
  <AutoPage title='Donations' bigHeader card textContent className={th.contribute}>
    <img className={th.qr} src={WALLET_QR}/>
    <p>
      Keeping the server online costs about $25 per month, and I don't have a job right now.
      So, you know, anything helps. Also, <a href='http://zequez.com/about-me/'>get in touch with me if you have a job offer</a>!
    </p>
    <h3>Bitcoins</h3>
    <p>
      You can always donate bitcoins to the cause: <a href={'bitcoin:' + WALLET}>{WALLET}</a>
      <br/>
      <em>I promise to spend it on server fees, my coffee addiction, and helping me get through college!</em>
    </p>
  </AutoPage>
)
