import express from "express"
import fileUpload from "express-fileupload";
import  cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import UserRoute from "./routes/UserRoute.js";
import TaskRoute from "./routes/TaskRoute.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ProductRoute);
app.use(UserRoute);
app.use(TaskRoute);


app.listen(5000, () => console.log("Server Up and Running..."));