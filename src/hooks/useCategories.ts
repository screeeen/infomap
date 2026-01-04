import { useEffect, useState } from 'react'

export function useCategories(dataSource) {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('** dataSource put----', dataSource)

        const result = await dataSource.widgetSource.getFormula({
          column: '*',
          operation: 'count',
          // + operationExp for custom operations
          // + base options...
        })
        console.log('** result', result)
        setCategories(result)
      } catch (err) {
        console.error('**fukck', err)
      }
    }

    fetchCategories()

    return () => {}
  }, [dataSource])

  return categories
}
