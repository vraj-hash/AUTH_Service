const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/server-config");
const apiRoutes = require("./routes/index");
// const UserService = require("./services/user-service");

const db = require('./models/index');





const app = express();

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  app.use("/api", apiRoutes);


  app.listen(PORT,async () => {
    console.log(`Server started at PORT: ${PORT}`);
     
 

    // if(process.env.DB_SYNC){
    //    db.sequelize.sync({alter:true});
    // }


    // const service = new UserService();
    // const newToken = service.createToken({email:' vraj@admin.com ', id:'1'});
    // console.log("new token is",newToken);
    
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiB2cmFqQGFkbWluLmNvbSAiCJpZCI6IjEiLCJpYXQiOjE3NTgzMjI1NzgsImV4cCI6MTc1ODMyNjE3OH0.OPnJl_SRG28YI0IgLQL9aht2G3ceB82bhDGjHGXmE8U';
    //  const response = service.verifyToken(token);
    //  console.log(response);

  });


  
};

prepareAndStartServer();
