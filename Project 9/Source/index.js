const express = require("express");
const app = express();
const port = 5500;
const { engine } = require("express-handlebars");
const path = require("path");
const multer = require("multer");
const session = require("express-session");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const exphbs = require("express-handlebars");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "Resource/VIEWS"));
app.use("/img", express.static("img"));
app.use(express.static(path.join(__dirname, "PUBLIC/CSS/")));
app.use(express.static(path.join(__dirname, "PUBLIC/JS/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "HS10",
    resave: false,
    saveUninitialized: true,
  })
);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "BeYourselfEducationPlatform@gmail.com",
    pass: "qvne jevn nzme zcqu",
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: exphbs.create({
      extName: ".hbs",
      defaultLayout: false,
    }),
    viewPath: "F:/Web Course/School Project/Project 9/Source/Resource/Views",
    extName: ".hbs",
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "F:/Web Course/School Project/Project 9/img");
  },
  filename: (req, file, cb) => {
    cb(null, `image.jpg`);
  },
});
const upload = multer({ storage });
app.get("/", (req, res) => {
  res.render("index.hbs", {
    layout: "main.hbs",
    style: "home.css",
    function: "home.js",
  });
});

app.post("/uploadImg", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `F:/Web Course/School Project/Project 9/img/${req.file.filename}`;
    req.session.avatarUrl = fileUrl;

    const emailUser = req.body.email;
    if (emailUser) {
      async function main() {
        const info = await transporter.sendMail({
          from: '"BeYourself Education Platform"',
          to: emailUser,
          subject: "SendMail",
          template: "sendimg",
          attachments: [
            {
              filename: "image.jpg",
              path: "F:/Web Course/School Project/Project 9/img/image.jpg",
              cid: "image",
            },
          ],
        });
        console.log("Message sent: %s", info.messageId);
      }
      main().catch(console.error);
    }
    res.redirect("/");
  } catch (err) {
    console.error("Error in upload route:", err.message);
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
