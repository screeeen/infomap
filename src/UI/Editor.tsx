import { useState } from 'react'
import { Header } from './Header'
import { MapSelector } from './MapSelector'
import { Paper } from '@mui/material'
import { Fill } from './Fill'
import { Radius } from './Radius'
import { OutlineWidth } from './OutlineWidth'
import { OutLineColor } from './OutLineColor'
import { DetailsChecker } from './DetailsChecker'
import { EditorContainer } from './Editor.styles'

export const Editor = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Header isOpen={isOpen} setIsOpen={setIsOpen}>
      <Paper square={false}>
        {isOpen && (
          <EditorContainer>
            <MapSelector />
            <Fill />
            <Radius />
            <OutlineWidth />
            <OutLineColor />
            <DetailsChecker filter="revenue" />
            <DetailsChecker filter="income_per_capita" />
          </EditorContainer>
        )}
      </Paper>
    </Header>
  )
}
