const state = {
  oriRow: {},
  filRow: {},
  colKeys: {},
  activeSheet: {
    index: 0,
    name: ''
  },
  sheetNameList: []
}

const getters = {
  getSheetNameList: (state, getters, rootState) => state.sheetNameList,
  getActiveSheet: (state, getters, rootState) => state.activeSheet,
  getActiveSheetName: (state, getters, rootState) => state.activeSheet.name,
  getCurOriRowCount: (state, getters, rootState) => {
    const activeSheetName = getters.getActiveSheetName
    return state.oriRow[activeSheetName] || 0
  },
  getCurFilRowCount: (state, getters, rootState) => {
    const activeSheetName = getters.getActiveSheetName
    return state.filRow[activeSheetName] || 0
  },
  getCurColCount: (state, getters, rootState) => {
    const activeSheetName = getters.getActiveSheetName
    const curColKeys = state.colKeys[activeSheetName]
    return (curColKeys && curColKeys.length) || 0
  },
  getCurColKeys: (state, getters, rootState) => {
    const activeSheetName = getters.getActiveSheetName
    return state.colKeys[activeSheetName]
  }
}
const mutations = {
  SET_EXCEL_BASE_INFO (state, excelBaseInfoObj) {
    Object.keys(excelBaseInfoObj).forEach((key, index) => {
      if (key !== 'filterTagList') { state[key] = excelBaseInfoObj[key] }
    })
  },
  SET_ACTIVE_SHEET (state, index) {
    state.activeSheet = {
      index,
      name: state.sheetNameList[index]
    }
  },
  SET_FILTERED_DATA (state, filRow) {
    if (typeof filRow === 'undefined' || filRow === null) {
      state.filRow = state.oriRow
    } else {
      state.filRow = filRow
    }
  }
}
const actions = {
  setActiveSheet ({ state, commit, rootState }, index) {
    commit('SET_ACTIVE_SHEET', index)
  },
  setFilteredData ({ state, commit, rootState }, filRow) {
    commit('SET_FILTERED_DATA', filRow)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
