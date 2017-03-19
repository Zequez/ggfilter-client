import th from './theme'
import React from 'react'

import config from 'src/app/config'
const WALLET_QR = require('images/bitcoins_address.png')
const WALLET = config.bitcoinDonationWallet

import { AutoPage } from 'src/Layout'

export default () => (
  <AutoPage title='Donations' bigHeader card textContent className={th.contribute}>
    <img className={th.qr} src={WALLET_QR}/>
    <h3>Bitcoins</h3>
    <p>
      You can donate bitcoins to this address: <a href={'bitcoin:' + WALLET}>{WALLET}</a>
      <br/>
      <em>
        The money is going to go to server fees and reducing
        my job workload so I can keep improving this project!
      </em>
    </p>
    <h3>Sharing</h3>
    <p>
      The best donation it helping the app grow! Share!
    </p>
  </AutoPage>
)
