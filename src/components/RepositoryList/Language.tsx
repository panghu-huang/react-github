import * as React from 'react'
import { Text } from 'src/theme'
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
    <Text className={classes.language}>
      <span 
        className={classes.languageColor} 
        style={{ backgroundColor: color }} 
      />
      {language}
    </Text>
  )
}

export default Language