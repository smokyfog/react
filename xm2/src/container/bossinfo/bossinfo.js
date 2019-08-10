import React from 'react'
import { NavBar, TextareaItem, InputItem } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-select/avatar-select'

class BossInfo extends React.Component{
  constructor(pros) {
    super(pros)
    this.state = {
      title: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    return (
      <div>
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <AvatarSelector></AvatarSelector>  
        <InputItem onChange={(v) => this.onChange('title',v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v) => this.onChange('company',v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v) => this.onChange('money',v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          rows={3}
          autoHeight
          title='职位要求'
          onChange={(v) => this.onChange('desc',v)}>
        </TextareaItem>
      </div>
    )
  }
}
export default BossInfo