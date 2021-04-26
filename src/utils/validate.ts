/**
 * 判断是否是外链
 * @param {string} path
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
