export default {
    saveUserName(context, username) {
        context.commit('saveUserName', username)
    },
    saveCartCount(context, cartcount) {
        context.commit('saveCartCount', cartcount)
    }
}