import Sequelize from 'sequelize'
const sequelize = new Sequelize("js", "postgres", "admin", {
  dialect: "postgres",
  host: "localhost"
});
export default sequelize;
