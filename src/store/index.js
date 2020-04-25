import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //活跃会话
    contact: [
      // {
      //   strid: "98688141287751681",
      //   avatar: "https://bucket20200319.oss-cn-shenzhen.aliyuncs.com/test/27af37d0af8c71112bb1f4a9680f2425.jpg",
      //   nickname: "卢本伟",
      //   message: [
      //     {
      //       selfsend: true,
      //       body: "吃鸡么",
      //       time: "2020-4-19 5:20:50"
      //     },
      //     {
      //       selfsend: false,
      //       body: "来呀，我有挂",
      //       time: "2020-4-19 20:50:20"
      //     }
      //   ]
      // },
    ],

    //联系人
    relation: []
  },
  getters: {
    getContact(state) {
      return strid => {

        for (let item of state.contact)
          if (item.strid == strid)
            return item

        return null
      }
    },
    getRelation(state) {
      return strid => {
        for (let item of state.relation)
          if (item.strid == strid)
            return item

        return null
      }
    },

    pushMessageAndUpdateOrder(state) {
      return (message, target) => {
        target.message.push(message);

        if (state.contact.length < 2)
          return

        for (let index in state.contact)
          if (state.contact[index].strid == target.strid) {
            let contact = state.contact[index]
            state.contact.splice(index, 1)
            state.contact.splice(0, 0, contact)

            break
          }
      }
    },
    updateContactIndex(state) {

      return strid => {

        if (state.contact.length < 2)
          return


        for (let index in state.contact)
          if (state.contact[index].strid == strid) {
            let firstcontact = state.contact[index]
            state.contact.splice(index, 1)
            state.contact.splice(0, 0, firstcontact)

            break
          }

      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
