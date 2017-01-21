import th from './theme.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { AutoPage } from 'src/Layout'
import { getScrapLogs } from 'shared/lib/api'
import Icon from 'shared/components/Icon'
import Button from 'shared/components/Button'
import { elapsedTime, timeInWords, formatShortDateTime } from 'shared/lib/utils/date'

export default class ScrapLogsTable extends Component {
  static propTypes = {

  }

  state = {
    logs: []
  }

  componentWillMount () {
    this.load()
  }

  load = () => {
    getScrapLogs().then((logs) => {
      this.setState({logs})
    })
  }

  render () {
    return (
      <AutoPage title='Scraping Logs' bigHeader card textContent>
        <div className={th.ScrapLogsTable__Actions}>
          <Button onClick={this.load}>
            Refresh
          </Button>
        </div>
        <table className={th.ScrapLogsTable}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Scraper</th>
              <th>Started time</th>
              <th>Elapsed time</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.logs.map((log) => (
              <tr key={log.id}>
                <td>{log.task_name}</td>
                <td>{log.scraper}</td>
                <td>{formatShortDateTime(log.started_at)}</td>
                <td>
                  {timeInWords(elapsedTime(log.started_at, log.finished_at), false, true)}
                </td>
                <td>{log.msg}</td>
                <td>
                  <Icon
                    icon={log.error ? 'logs-failure' : 'logs-success'}
                    className={cx(th.ScrapLogsTable__Icon, {
                      [th.ScrapLogsTable__Icon_error]: log.error
                    })}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AutoPage>
    )
  }
}
