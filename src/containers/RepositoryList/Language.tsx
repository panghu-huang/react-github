import * as React from 'react'
import { languageColors } from 'src/config'
import classes from './RepositoryList.module.scss'

interface ILanguageProps {
  language: string
}

const Language: React.FunctionComponent<ILanguageProps> = ({
  language,
}) => {
  if (!language) {
    return null
  }
  const color = languageColors[language] || 'yellow'
  return (
    <span className={classes.language}>
      <span 
        className={classes.languageColor} 
        style={{ backgroundColor: color }} 
      />
      {language}
    </span>
  )
}

export default Language