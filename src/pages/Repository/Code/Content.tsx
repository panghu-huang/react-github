import * as React from 'react'
import { MarkdownPreview } from 'src/components'
import { IRepositoryContent } from 'src/types'

interface IRepositoryContentProps {
  content: IRepositoryContent
}

const RepositoryContent: React.FunctionComponent<IRepositoryContentProps> = ({
  content,
}) => {
  const str = content.content.split('\n').map(item => atob(item)).join('')
  const markdown = content.name.toLowerCase().endsWith('.md')
    ? str 
    : '```\n' + str + '\n```'
  return (
    <MarkdownPreview markdown={markdown}/>
  )
}

export default RepositoryContent