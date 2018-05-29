
// 本地缓存
export const setUserToCache = (user) => {
  return localStorage.setItem('userCacheKey', JSON.stringify(user))
}
export const getUserFromCache = () => {
  return JSON.parse(localStorage.getItem('userCacheKey'))
}
export const removeUserInCache = () => {
  return localStorage.removeItem('userCacheKey')
}
export const getToken = () => {
  return getUserFromCache() ? getUserFromCache().token : null
}
