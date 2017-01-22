import th from './theme.sass'
import React, { Component } from 'react'
import axios from 'axios'
import Button from 'shared/components/Button'
import Input from 'shared/components/Input'
import { AutoPage } from 'src/Layout'

const GRAPH_ENDPOINT = 'https://graph.oculus.com/graphqlbatch?forced_locale=en_US'

function prettify (data) {
  return JSON.stringify(data, null, '  ')
}

function payloadDecoder (payload) {
  let result = {}
  payload.split('&').forEach((v) => {
    let vv = v.split('=')
    result[vv[0]] = decodeURIComponent(vv[1])
  })
  return result
}

function toQueryString (object) {
  let qs = []
  for (let key in object) {
    qs.push(`${key}=${encodeURIComponent(object[key])}`)
  }
  return qs.join('&')
}

function generatePayload (accessToken, query) {
  return toQueryString({
    access_token: accessToken,
    batch_name: 'Queries',
    method: 'GET',
    queries: JSON.stringify({
      q1: {
        priority: 0,
        q: query
      }
    }),
    response_format: 'json',
    scheduler: 'phased'
  })
}

// Quick and dirty to make the query barely legible
function prettifyQuery (query) {
  return query
    .replace(/\{/g, '$&\n')
    .replace(/\},?/g, '$&\n')
    .replace('QueryFragment', '\n\n$&')
    .replace(',', ', ')
}

export default class OculusSandbox extends Component {
  state = {
    result: [],
    query: '',
    accessToken: '',
    runningQuery: false
  }

  decodePayload = () => {
    let { query } = this.state
    let result = payloadDecoder(query)

    let queries = JSON.parse(result.queries)

    for (let key in queries) {
      query = prettifyQuery(queries[key].q)
    }

    this.setState({
      accessToken: result.access_token,
      query: query
    })
  }

  changeAccessToken = (accessToken) => {
    this.setState({accessToken})
  }

  changeQuery = (val) => {
    this.setState({query: val.target.value})
  }

  runQuery = () => {
    this.setState({runningQuery: true})
    let { query, accessToken } = this.state
    axios.post(GRAPH_ENDPOINT, generatePayload(accessToken, query))
      .then((response) => {
        let result
        if (typeof response.data === 'object') {
          result = [response.data]
        } else {
          result =
            response.data.split('\n').map((val) => JSON.parse(val))
        }
        this.setState({result: result, runningQuery: false})
      })
      .catch((error) => {
        this.setState({runningQuery: false, result: ['Network error']})
        throw error
      })
  }

  render () {
    let { result, query, accessToken, runningQuery } = this.state

    return (
      <AutoPage title='Oculus Graph API Sandbox' card textContent>
        <div className={th.OculusSandbox}>
          <p>
            To obtain an <strong>access token</strong> for the Oculus Graph API:
          </p>
          <ol>
            <li>
              <strong>Don't do it unless you trust this website, as the access token gives you full control of the Oculus account.</strong> The
              token is sent directly to the Oculus servers from here, and it's not stored anywhere.
            </li>
            <li>Login on the <a href='https://www.oculus.com/'>Oculus Website</a></li>
            <li>Right click the page and select "View Page Source" (on Chrome)</li>
            <li>Search with Ctrl+F for "accessToken"</li>
            <li>Copy the long string of characters next to "accessToken"</li>
            <li>Paste it in the box below</li>
          </ol>

          <Input
            onChange={this.changeAccessToken}
            value={accessToken}
            className={th.OculusSandbox__AccessToken}
            label='Access Token'/>
          <textarea
            value={query}
            onChange={this.changeQuery}
            className={th.OculusSandbox__query}>
          </textarea>
          <div className={th.OculusSandbox__actions}>
            <Button onClick={this.runQuery} disabled={runningQuery}>
              Run Query
            </Button>
            <Button onClick={this.decodePayload} raised={false}>
              Decode Payload
            </Button>
          </div>
          <p>
            The "decode payload" button is to extract the
            graph query and access token from a payload
            sent to the server (likely from an official client)
          </p>
          <code>
            {result.map((v) => prettify(v)).join('\n\n')}
          </code>
        </div>
      </AutoPage>
    )
  }
}
