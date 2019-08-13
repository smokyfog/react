
export function getRedirectPath({type, avatar}) {
  // 根据用户信息 返回跳转的地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo
  let url = ( type === 'boss') ? '/boss': '/genius'
  if (!avatar) {   //若无头像，则完善用户信息
      url += 'info'
  }
  return url
}

export function getChatId(userId, targetId) {
  return [ userId, targetId ].sort().join('_')
}