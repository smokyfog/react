import React from 'react'
import { Grid, List }  from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
  // 数据内容检测
  static propTypes = { 
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(pros) {
    super(pros)
    this.state = {}
  }
  render() {
    const AvatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
    .split(',')
    .map(v=>({
      icon:require(`../img/${v}.png`),
      text:v
    }))
    const girdHeader = this.state.icon?
      (<div>
        <span>已选选择头像</span>
        <img style={{width:20,marginLeft:8}} src={this.state.icon} alt='' />
      </div>):
      '请选择头像'
    return (
      <div>
        <List renderHeader={() => girdHeader}>
          <Grid 
            data={AvatarList} 
            activeStyle={false}
            columnNum={5}
            onClick={ele=>{
              this.setState(ele)
              this.props.selectAvatar(ele.text)
            }}
          />
        </List>
      </div>
    )
  }
}
export default AvatarSelector