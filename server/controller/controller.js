const UploadModel = require("../model/schema");
const fs = require("fs");
exports.home = async (req, res) => {
  const all_images = await UploadModel.find();
  res.render("main", { images: all_images });
};

exports.uploads = (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  //convert images into based64 encoding

  let imageArray = files.map((file) => {
    let img = fs.readFileSync(file.path);

    return (encode_image = img.toString("base64"));
  });

  let result = imageArray.map((src, index) => {
    //Create object to store data in the collection
    let finalimg = {
      filename: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
    };
    let newUpload = new UploadModel(finalimg);
    return newUpload
      .save()
      .then(() => {
        return { msg: `${files[index].originalname} Uploaded Successfully..!` };
      })
      .catch((error) => {
        if (error) {
          if (error.name === "MongoError" && error.code === 11000) {
            return Promise.reject({
              error: `Duplicate ${files[index].originalname}. File Already exists! `,
            });
          }
          return Promise.reject({
            error:
              error.message ||
              `Cannot Upload ${files[index].originalname} Something Missing!`,
          });
        }
      });
  });
  Promise.all(result)
    .then((msg) => {
      // res.json(msg);
      res.redirect("/");
    })
    .catch((err) => {
      res.json(err);
    });
};
