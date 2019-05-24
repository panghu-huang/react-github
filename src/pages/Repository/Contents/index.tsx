import * as React from 'react'
import { ApiService } from 'src/services'
import { IRepositoryContent } from 'src/types'
import { ContentType } from 'src/config'

interface IRepositoryContentsProps {
  owner: string
  name: string
  path: string
  branch: string
}

const RepositoryContents: React.FunctionComponent<IRepositoryContentsProps> = ({
  owner, name, path, branch,
}) => {
  const [contents, setContents] = React.useState<IRepositoryContent[]>([])
  const fetchContents = async () => {
    try {
      const service = new ApiService<IRepositoryContent[]>('repos')
      const data = branch ? { ref: branch } : undefined
      const contents = await service.get({
        path: `${owner}/${name}/contents/${path}`,
        data,
      })
      setContents(contents.sort((prev, next) => {
        if (prev.type === next.type) {
          return prev.name.includes('.') ? 0 : 1
        }
        return prev.name === ContentType.Dir ? 2 : 1
      }))
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    fetchContents()
  }, [path, branch])
  return (
    <div>
      {contents.map(content => {
        return (
          <div key={content.name} style={{ backgroundColor: content.type === ContentType.Dir ? 'gray' : 'white' }}>
            {content.name}
          </div>
        )
      })}
    </div>
  )
}

export default RepositoryContents