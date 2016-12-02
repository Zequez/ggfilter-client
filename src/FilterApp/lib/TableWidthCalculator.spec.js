import TableWidthCalculator from './TableWidthCalculator'

describe('TableWidthCalculator', () => {
  let calc = null

  describe('no adjustements', () => {
    beforeEach(() =>
      calc = new TableWidthCalculator([
        {name: 'potato', width: 60},
        {name: 'galaxy', width: 40}
      ], {}, 1000)
    )

    describe('#tableWidth', () =>
      it('should be 1000', () => expect(calc.tableWidth).toBe(1000)
      )

    )

    return describe('#columnsWidth', () =>
      it('should be both proportional to the window size', () => expect(calc.columnsWidth).toEqual([600, 400])
      )

    )
  }
  )

  describe('adjusted still less than window', () => {
    beforeEach(() =>
      calc = new TableWidthCalculator([
        {name: 'potato', width: 60},
        {name: 'galaxy', width: 20},
        {name: 'simulator', width: 20}
      ], {galaxy: 100}, 1000)
    )

    describe('#tableWidth', () =>
      it('should be 1000', () => expect(calc.tableWidth).toBe(1000))
    )

    return describe('#columnsWidth', () => {
      it('should transfer the adjustement to the columns on the right equally', () =>
        expect(calc.columnsWidth).toEqual([600, 300, 100]))
    })
  })

  describe('multiple adjustements still less than window', () => {
    beforeEach(() =>
      calc = new TableWidthCalculator([
        {name: 'potato', width: 60},
        {name: 'galaxy', width: 20},
        {name: 'simulator', width: 20}
      ], {galaxy: 100, potato: -100}, 1000)
    )

    describe('#tableWidth', () => {
      it('should be 1000', () => expect(calc.tableWidth).toBe(1000))
    })

    describe('#columnsWidth', () => {
      it('should transfer the adjustement to the other columns equally', () =>
        expect(calc.columnsWidth).toEqual([500, 350, 150]))
    })
  })

  describe('table width greater than window', () => {
    beforeEach(() => {
      calc = new TableWidthCalculator([
        {name: 'potato', width: 600},
        {name: 'galaxy', width: 400}
      ], {}, 800)
    })

    describe('#tableWidth', () => {
      it('should return the minimal width, greater than window', () =>
        expect(calc.tableWidth).toBe(600 + 400))
    })

    describe('#columnsWidth', () => {
      it('should return the minimal width, greater than window', () =>
        expect(calc.columnsWidth).toEqual([600, 400]))
    })
  })

  describe('table width greater than window with adjustements', () => {
    beforeEach(() => {
      calc = new TableWidthCalculator([
        {name: 'potato', width: 600},
        {name: 'galaxy', width: 400}
      ], {galaxy: 100}, 800)
    })

    describe('#tableWidth', () => {
      it('should return the minimal width, greater than window plus the adjusts', () =>
        expect(calc.tableWidth).toBe(600 + 400 + 100))
    })

    describe('#columnsWidth', () => {
      it('should return the minimal width, greater than window plus the adjusts', () =>
        expect(calc.columnsWidth).toEqual([600, 500]))
    })
  })

  describe('table width greater than window after adjustements', () => {
    beforeEach(() => {
      calc = new TableWidthCalculator([
        {name: 'potato', width: 400},
        {name: 'galaxy', width: 400}
      ], {galaxy: 300}, 1000)
    })

    describe('#tableWidth', () => {
      it('should return minimal widths plus the adjustements', () =>
        expect(calc.tableWidth).toBe(400 + 400 + 300))
    })

    describe('#columnsWidth', () => {
      it('should return the minimal width for the non adjusted, and the adjusted width for the others', () =>
        expect(calc.columnsWidth).toEqual([400, 700]))
    })
  })
})
