var { Component, PropTypes } = React

class DataTableBatch extends Component {
  render() {
    console.log('Render <DataTableBatch/>')
    
    var rows = []
    var games = this.props.games
    for(let i = 0; i < games.length; ++i) {
      rows.push(
        <tr key={i}>
          <td>{games[i].id}</td>
          <td>{games[i].name}</td>
        </tr>
      )
    }

    return (
      <tbody>
        {rows}
      </tbody>
    )
  }
}

DataTableBatch.propTypes = {
  games: PropTypes.array.isRequired
}

export default DataTableBatch
