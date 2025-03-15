const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/user")


dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:'*',
		credentials:true,
	})
)


const connect = () => {
    mongoose.connect("mongodb+srv://skillify:or9v6Als3Y4AIb5F@cluster0.rhmsi.mongodb.net/", {
        // useNewUrlParser: true,
        // useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};
connect();


app.use("/api/v1/auth", userRoutes);





app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})