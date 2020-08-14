import { Message } from 'element-ui'


let showMessage = (type, message) => {
    Message({
        type,
        message,
        duration: 1000
    })
}
export default showMessage