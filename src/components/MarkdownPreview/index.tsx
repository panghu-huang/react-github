import * as React from 'react';
// @ts-ignore
import markd from 'markit';
// @ts-ignore
import * as hljs from 'highlight.js/lib/highlight';
// @ts-ignore
import * as javascript from 'highlight.js/lib/languages/javascript';
// @ts-ignore
import * as css from 'highlight.js/lib/languages/css';
import './style.scss';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);

interface IMarkdownPreviewProps {
  markdown: string;
  className?: string;
  transform?: boolean;
};

markd.setOptions({
  // highlight: (code: string, lang: string) => {
  //   if (lang && hljs.getLanguage(lang)) {
  //     try {
  //       return hljs.highlight(lang, code).value;
  //     } catch (__) {
  //       // do nothing
  //     }
  //   }
  //   return code;
  // }
  highlight: (code: string) => {
    return hljs.highlightAuto(code).value
  }
});

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
};

export default React.memo(MarkdownPreview);