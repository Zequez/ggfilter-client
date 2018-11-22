import React from 'react'
import th from './theme'
import { AutoPage } from 'src/Layout'

import config from 'src/app/config'
const WALLET_QR = require('images/bitcoins_address.png')
const WALLET = config.bitcoinDonationWallet

export default () => (
  <AutoPage title='Feedback' bigHeader card textContent className={th.feedback}>
    <p><em>Hey, I hope you find <a href='/'>GGFilter</a> useful!</em></p>
    <h3>Getting in Touch</h3>
    <p>
      <em>Spotted a bug? Something that could be improved? A new feature idea? Just want to tell me something nice?</em>
    </p>
    <p>
      You're in luck! <a href='http://zequez.com/about-me/'>I'm a person!</a> Follow that
      link to my website where you'll find ways to contact me!
      <br/>
      I'm most likely to see your message if you send me an email! Thanks!
    </p>
    <h3>Donations</h3>
    <img className={th.qr} src={WALLET_QR}/>
    <p>
      If you want to leave a tip or donate to help pay server fees, you can send bitcoins
      to this address: <a href={'bitcoin:' + WALLET}>{WALLET}</a>
    </p>
    <p>
      <em>
        All the money will be spent on coffee beans. Thanks!
      </em>
    </p>
  </AutoPage>
)
