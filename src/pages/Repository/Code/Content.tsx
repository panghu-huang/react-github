import * as React from 'react'
import { MarkdownPreview } from 'src/components'
import { IRepositoryContent } from 'src/types'

interface IRepositoryContentProps {
  content: IRepositoryContent
}

const RepositoryContent: React.FunctionComponent<IRepositoryContentProps> = ({
  content,
}) => {
  const lowerCaseName = content.name.toLowerCase()
  if (/\.(png|jpg|jpeg)$/.test(lowerCaseName)) {
    return (
      <img src={content.download_url}/>
    )
  }
  const str = content.content.split('\n').map(item => atob(item)).join('')
  const markdown = lowerCaseName.endsWith('.md')
    ? str
    : '```\n' + str + '\n```'
  return (
    <MarkdownPreview markdown={markdown}/>
  )
}

export default RepositoryContent