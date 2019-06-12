import * as React from 'react'
import { Dialog, Input, Button } from 'zent'
import { actions } from 'src/store'
import { SAVED_LOGIN_KEY } from 'src/config'
import classes from './Header.module.scss'

export interface ILoginNameDialogProps {
  visible: boolean
  onClose: () => void
}

const LoginNameDialog: React.FunctionComponent<ILoginNameDialogProps> = ({
  visible, onClose,
}) => {
  const [value, setValue] = React.useState('')
  const handleChange = (evt: React.ChangeEvent) => {
    setValue((evt.target as HTMLInputElement).value)
  }
  const changeLoginName = () => {
    if (value) {
      localStorage.setItem(SAVED_LOGIN_KEY, value)
      actions.store.setStore({ login: value })
      window.location.reload()
    } else {
      onClose()
    }
  }
  const handleInputKeydown = (evt: React.KeyboardEvent) => {
    if (evt.keyCode === 13) {
      changeLoginName()
    }
  }
  return (
    <Dialog
      title='改变登录名'
      visible={visible}
      onClose={onClose}>
      <Input
        autoFocus={true}
        value={value}
        onChange={handleChange}
        onKeyDown={handleInputKeydown}
      />
      <Button
        className={classes.btnChangeLoginName}
        onClick={changeLoginName}>
        确定
      </Button>
    </Dialog>
  )
}

export default LoginNameDialog

