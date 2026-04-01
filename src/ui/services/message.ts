import { getMessageApi } from './discrete'

export const uiMessage = {
  success(content: string) {
    getMessageApi().success(content)
  },
  error(content: string) {
    getMessageApi().error(content)
  },
  warning(content: string) {
    getMessageApi().warning(content)
  },
  info(content: string) {
    getMessageApi().info(content)
  }
}
