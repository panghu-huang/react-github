import * as React from 'react'
import { Dialog, ColorPicker, Select, Button, Notify } from 'zent'
import { THEME_COLORS } from 'src/config'
import classes from './Header.module.scss'

interface IThemeDialogProps {
  visible: boolean
  onClose: () => void
}

interface IThemeDialogState {
  current: string
  color: string
}

class ThemeDialog extends React.PureComponent<IThemeDialogProps, IThemeDialogState> {

  constructor(props: IThemeDialogProps) {
    super(props)
    const [primary] = THEME_COLORS
    this.state = {
      current: primary.value,
      color: this.getColor(primary.value),
    }
  }

  public render() {
    const { visible, onClose } = this.props
    const { current, color } = this.state
    return (
      <Dialog
        title='编辑主题色'
        visible={visible}
        onClose={onClose}>
        <div className={classes.themeDialog}>
          <Select
            data={THEME_COLORS}
            value={current}
            onChange={this.handleSelectedChange}
          />
          <ColorPicker
            color={color}
            onChange={this.handleColorChange}
          />
        </div>
        <div className={classes.divider}/>
        <Button className={classes.resetColors} onClick={this.resetColors}>
          重置颜色
        </Button>
      </Dialog>
    )
  }

  public componentDidUpdate(prevProps: IThemeDialogProps) {
    const { visible } = this.props
    if (!prevProps.visible && visible) {
      this.setState({
        color: this.getColor(this.state.current),
      })
    }
  }

  private handleColorChange = (color: string) => {
    const { current } = this.state
    this.setState({ color })
    document.body.style.setProperty(current, color)
    localStorage.setItem(current, color)
  }

  private handleSelectedChange = (evt: any) => {
    const current = evt.target.value
    const color = this.getColor(current)
    this.setState({ current, color })
  }

  private resetColors = () => {
    THEME_COLORS.forEach(({ value }) => {
      localStorage.removeItem(value)
      document.body.style.removeProperty(value)
    })
    this.setState({
      color: this.getColor(this.state.current),
    })
    Notify.success('颜色重置成功')
  }

  private getColor(key: string) {
    return document.body.style.getPropertyValue(key)
     || window.getComputedStyle(document.documentElement).getPropertyValue(key)
  }

}

export default ThemeDialog