import * as React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { ThemeContext } from 'src/theme'

const Header: React.FunctionComponent = () => {
  const { changeTheme } = React.useContext(ThemeContext)
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand>Github</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
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