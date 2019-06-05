import * as React from 'react'
import { ApiService } from 'src/services'
import { List, Avatar } from 'src/components'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IUser } from 'src/types'
import classes from './Organization.module.scss'


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
      const members = await service.get({
        path: `${name}/members`,
        data: {
          page: ++page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      setMembers(members)
      if (members.length < DEFAULT_PAGE_SIZE) {
        setHasLoadAll(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const renderMember = (member: IUser) => (
    <div key={member.id} className={classes.member}>
      <Avatar user={member}/>
      <span>
        <a href={`/users/${member.login}`}>{member.login}</a>
      </span>
    </div>
  )
  React.useEffect(() => {
    page = 0
    fetchMembers()
  }, [])
  return (
    <List
      list={members}
      loading={loading}
      hasLoadAll={hasLoadAll}
      loadMore={fetchMembers}
      renderItem={renderMember}
    />
  )
}

export default OrgMembers