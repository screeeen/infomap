import { FormulaWidget } from '@carto/react-widgets'
import { useCategories } from '../hooks/useCategories'
// import { FormulaWidgetUI } from '@carto/react-ui'

export const Widget = ({ dataSource, title, column }) => {
  console.log('** dataSource antes del hook', dataSource)
  const categories = useCategories(dataSource)

  console.log('** categories', categories)

  if (categories === null || categories === undefined) return <p>no no</p>

  return (
    // <FormulaWidgetUI value={categories} />
    <FormulaWidget
      id="population-widget"
      title={title}
      data={categories}
      column="income_per_capita" //{column ? column[0] : '*'}
      operation="sum"
      formatter={value =>
        new Intl.NumberFormat('en-US', {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(value)
      }
      tooltip="Total population in the selected area"
    />
  )
}
