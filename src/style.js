// This is a central hub of styles that accomplishes 2 things:
// - It exposes utility styles
// - It forces certain styles to be imported before others

export { default as flex } from 'shared/style/utils/equalflex'

import 'react-toolbox/lib/chip/theme'
import 'react-toolbox/lib/input/theme'

import 'src/shared/style/global/index'
