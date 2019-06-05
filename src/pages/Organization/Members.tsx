import * as React from 'react'
import { Notify } from 'zent'
import { ApiService } from 'src/services'
import { UserList } from 'src/containers'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IUser } from 'src/types'

interface IOrgMembersProps {
  name: string
}

let page = 0

const OrgMembers: React.FunctionComponent<IOrgMembersProps> = ({name}) => {
  const [loading, setLoading] = React.useState(false)
  const [members, setMembers] = React.useState<IUser[]>([])
  const [hasLoadAll, setHasLoadAll] = React.useState(false)
  const fetchMembers = async () => {
    try {
      setLoading(true)
      const service = new ApiService<IUser[]>('orgs')
      const list = await service.get({
        path: `${name}/members`,
        data: {
          page: ++page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      setMembers(members.concat(list))
      if (list.length < DEFAULT_PAGE_SIZE) {
        setHasLoadAll(true)
      }
    } catch (error) {
      Notify.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    page = 0
    fetchMembers()
  }, [])
  return (
    <UserList
      users={members}
      loading={loading}
      hasLoadAll={hasLoadAll}
      loadMore={fetchMembers}
    />
  )
}

export default OrgMembers