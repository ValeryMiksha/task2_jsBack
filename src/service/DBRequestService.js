import '../models/dbConstructorModels/relations/relations.js'
import db from './../config/Database.js'
db.sync()

const DBRequestService = {
  getTables() {
    const tables = db.modelManager.models.map(elem => elem.name);
    return tables;
  },
  getColumns(tableName) {
    const model = db.modelManager.models.find(e => {
      return e.name === tableName
    })
    return Object.keys(model.tableAttributes)
  },


  async getResultDBConstructorInfo(requestInfo) {
    //getFirstModel
    const mainModel = db.modelManager.models.find(e => {
      return e.name === requestInfo[0].table
    })
    const mainAttributes = {
      attributes: requestInfo[0].columns,
      raw: true,
      model: mainModel,
      include: []
    }
    //del firstInfo
    requestInfo = requestInfo.slice(1)

    let array = [mainAttributes];
    let tempArray = []

    while(array.length != 0 && requestInfo.length != 0) {
      array.map(elem => {
        //Getting all keys
        let associations = Object.values(elem.model.associations).map(e => e.target.name)
        //Filter of requested tables
        requestInfo = requestInfo.filter( info => {
          if(associations.includes(info.table)) {
            let model = db.modelManager.models.find(e => e.name === info.table);
            let attribute = {
              model: model,
              attributes: info.columns,
              include: []
            }
            let tempAssociations = Object.values(model.associations).map(e => e.target.name)
            if (requestInfo.some(e => tempAssociations.includes(e.table))) tempArray.push(attribute)
            elem.include.push(attribute)
            return false;
          }
          else return true;
        })
      })
      array = tempArray;
      tempArray = []
    }
    const result = await mainModel.findAll(mainAttributes)
    return result;
  }

}
export default DBRequestService;
