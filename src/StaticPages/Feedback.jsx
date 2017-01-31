import React from 'react'
import { AutoPage } from 'src/Layout'

export default () => (
  <AutoPage title='Feedback' bigHeader card textContent>
    <p>Hey, I hope you like <a href='/'>GGFilter</a>.</p>
    <p>
      <em>Spotted a bug? Something that could be improved? A new feature you would like?</em>
    </p>
    <p>
      Quickest way to send me feedback would be by
      PM on Reddit to <a href='https://www.reddit.com/message/compose/?to=Zequez'>
         /u/Zequez
      </a>! And there are also <a href='http://zequez.com/about-me/'>
        other ways to get in touch with me here
      </a>. Thanks!
    </p>
  </AutoPage>
)
