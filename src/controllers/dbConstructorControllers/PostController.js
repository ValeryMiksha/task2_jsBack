import DBRequestService from "../../service/DBRequestService.js";

const PostController = {
  async makeResultTable(req, res) {
    const info = req.body;
    if (info == undefined || info.length == 0) res.sendStatus(400);
    else {
      const resultData = await DBRequestService.getResultDBConstructorInfo(info)
      res.json(resultData)
    }
  }
}
export default PostController;
