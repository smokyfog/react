import React from 'react'
import { Redirect } from 'react-router-dom' 
import { NavBar, TextareaItem, InputItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-select/avatar-select'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  { update }
)

class BossInfo extends React.Component{
  constructor(pros) {
    super(pros)
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        { this.props.redirectTo && path !== redirect?
          <Redirect to={ this.props.redirectTo }></Redirect> :
          null 
        }
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={(imgname) => {
            this.setState({
              avatar: imgname
            })
          }}
        ></AvatarSelector>  
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
        <Button 
          type='primary'
          onClick={() => {
            this.props.update(this.state)
          }}  
        >保存</Button>
      </div>
    )
  }
}
export default BossInfo