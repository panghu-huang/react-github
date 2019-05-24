import * as React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { ThemeContext } from 'src/theme'
import { actions } from 'src/store'

const Header: React.FunctionComponent = () => {
  const [activeKey, setActiveKey] = React.useState(
    window.location.pathname
  )
  const { changeTheme } = React.useContext(ThemeContext)
  const handleSelect = (eventKey: string) => {
    setActiveKey(eventKey)
    actions.history.push(eventKey)
  }
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='/'>Github</Navbar.Brand>
      <Navbar.Collapse>
        <Nav 
          activeKey={activeKey}
          onSelect={handleSelect}>
          <Nav.Link eventKey='/activities'>Activities</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Form inline={true}>
        <FormControl />
        <Button onClick={changeTheme}>Change Theme</Button>
      </Form>
    </Navbar>
  )
}

export default Header