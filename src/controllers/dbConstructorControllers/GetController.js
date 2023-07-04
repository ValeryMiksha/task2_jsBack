import DBRequestService from "../../service/DBRequestService.js";

const GetController = {
  getTableNames(req, res) {
    const tableNames = DBRequestService.getTables()
    res.json(tableNames)
  },
  getColumns(req, res) {
    const tableName = req.params.tableName;
    const columns = DBRequestService.getColumns(tableName)
    res.json(columns)
  }
}
export default GetController
