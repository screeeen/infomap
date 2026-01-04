import styled from '@emotion/styled'

export const Preview = styled.div<{ color: string }>`
  margin-top: 8px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: ${({ color }: { color: string }) => `rgba(${color}, 1)`};
`

export const EditorContainer = styled('div')({
  height: '92vh',
  overflow: 'auto',
  paddingBottom: '2rem',
})
