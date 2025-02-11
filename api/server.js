const multer = require("multer")
const fileModel = require("./models/fileModel")
const express = require("express")
const cors = require("cors")
require("./config/connection")
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static("public"))
// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" ||file.mimetype==="image/jpg"|| file.mimetype==="image/png" || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type, only JPEG, PNG, and PDF is allowed!"),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array("files", 100)

app.get("/", async(req, res) => {
    try {
        const files = await fileModel.find()
        res.json({message:"successfully retrive the files",files})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



app.post("/upload", upload, async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." })
  }
  const files = req.files.map((file) => {
    return { filename: file.filename }
  })
try{
  const savedFiles = await fileModel.insertMany(files)
  res.json({
    message: "Files uploaded and saved to database successfully!",
    files: savedFiles,
  })
}catch(error){
  res.status(500).json({message:error.message})
}
})

app.delete("/delete/:id", async (req, res) => {
try {
    const {id}=req.params
    const savedFiles = await fileModel.findByIdAndDelete(id)
    res.json({message:"File deleted successfully",file:savedFiles})

} catch (error) {
    res.json({message:error.message})
}
})




app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
