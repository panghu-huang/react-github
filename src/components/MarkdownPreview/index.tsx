import * as React from 'react'
import classNames from 'classnames'
import { isFalse } from 'src/utils'
import 'highlight.js/styles/github.css'
import './style.scss'

interface IMarkdownPreviewProps {
  markdown: string
  className?: string
  transform?: boolean
}

const defaultMarkit = (markdown: string) => markdown

const MarkdownPreview: React.FC<IMarkdownPreviewProps> = props => {
  const markit = React.useRef(defaultMarkit)
  const forceUpdate = React.useState(undefined)[1]
  console.log(markit)
  React.useEffect(() => {
    if (!isFalse(props.transform)) {
      const loadModules = async () => {
        const hljs = (await import(/* webpackChunkName: "hl" */'highlight.js')).default
        // @ts-ignore
        const markd = (await import(/* webpackChunkName: "markit" */'markit')).default
        markd.setOptions({
          highlight: (code: string) => {
            return hljs.highlightAuto(code).value
          }
        })
        markit.current = markd
        forceUpdate(undefined)
      }
      loadModules()
    }
  }, [props.transform])
  return (
    <div
      className={classNames('markdown-preview', props.className)}
      dangerouslySetInnerHTML={{
        __html: isFalse(props.transform)
          ? props.markdown :
          markit.current(props.markdown),
      }}
    />
  )
}

MarkdownPreview.defaultProps = {
  className: '',
}

export default React.memo(MarkdownPreview)
