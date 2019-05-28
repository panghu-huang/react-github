import * as React from 'react'
// @ts-ignore
import markd from 'markit'
// @ts-ignore
import * as hljs from 'highlight.js'
import './style.scss'

interface IMarkdownPreviewProps {
  markdown: string
  className?: string
  transform?: boolean
}

markd.setOptions({
  highlight: (code: string) => {
    return hljs.highlightAuto(code).value
  }
})

const MarkdownPreview = ({ markdown, transform, className }: IMarkdownPreviewProps) => {
  return (
    <div 
      className={`markdown-preview ${className}`}
      dangerouslySetInnerHTML={{
        __html: transform === false ? markdown : markd(markdown),
      }}
    />
  )
}

MarkdownPreview.defaultProps = {
  className: '',
}

export default React.memo(MarkdownPreview)