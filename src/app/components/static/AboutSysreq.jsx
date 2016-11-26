import React from 'react'

export default () => (
  <div className='about-sysreq content-box'>
    <h2>About the System Requirements Index</h2>
    <p>
      The System Requirements Index is a *very* coarse number.
    </p>
    <p>
      To calculate it we use a database of video cards benchmarks, and we
      do word analysis of the official system requirements of each game that
      are published on Steam.
    </p>
    <ol>
      <li>
        <span>Obtain the database of benchmarks from </span>
        <a href='http://www.videocardbenchmark.net/'>VideoCardBenchmarks.net</a>
        <span> (GGFilter is not affiliated in any way with them)</span>
      </li>
      <li>
        Read the system requirements text from Steam
        (neither is GGFilter affiliated with Steam)
      </li>
      <li>
        Use a complex set of rules to turn the text into a set of standarized tokens
      </li>
      <li>
        Additionally assign the year of the release of the game as
        a token, as this is also an indicator of the game system
        requirements
      </li>
      <li>
        Cross the graphic cards tokens with the benchmarks
        database and assign the benchmark result to the token
      </li>
      <li>
        The value of tokens that couldn't be identified
        as video cards are calculated by inference: we take all the video card tokens
        that accompany these unknown tokens and we average them and assign them.
        For example, this makes the directx7 rate much lower than the directx11 token, since
        these are mentioned along older and newer graphic cards respectively. This allows the system
        to rate a game that mentions directx7 as having lower system requirements than a game that
        mentions directx11, even if the games don't have information about recommended graphic cards. Or mentions
        of 32mb video memory rate lower than mentions of 2gb.
      </li>
      <li>
        <span>We use </span><a href='https://en.wikipedia.org/wiki/Linear_regression'>linear regression</a>
        <span> of certain kind of tokens, like recommended screen resolutions, that couldn't
        be inferred from other tokens. This allows, for example, for a resolution of 800x600 to rate
        even lower than a resolution of 1024x768, or 1920x1080.</span>
      </li>
      <li>
        After this, the vast majority of tokens have a value. We average the value of the tokens associated with
        each game, and assign this value to the game.
      </li>
      <li>
        Finally, we calculate the percentile of the values for each game. And we call this the Sysreq Index. This
        makes the index relative to the existing games, this means that as newer games with higher requirements
        appear, the other games will slowly reduce its Sysreq Index number.
      </li>
    </ol>
  </div>
)
