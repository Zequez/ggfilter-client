import React from 'react'
import Page from 'src/app/components/Tabs/Page'

export default (other) => (
  <Page Title='Feedback' bigHeader card textContent {...other}>
    <p>Hey, I hope you like the web app.</p>
    <p>
      You can send me feedback directly by <a href='https://www.reddit.com/message/compose/?to=Zequez'>
        PM on Reddit to /u/Zequez
      </a>
    </p>
  </Page>
)
