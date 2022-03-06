const express = require("express");
const multer = require("multer");
const port = 2222;
const app = express();
var fs = require("fs");
app.use(express.urlencoded());
app.use(express.json());
//cấu hình lưu trữ file khi upload xong
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //files khi upload xong sẽ nằm trong thư mục "uploads" này - các bạn có thể tự định nghĩa thư mục này
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      Math.round(Math.random() * 1e9);

    let reverse_str = file.originalname.split("").reverse().join("");
    let newString = reverse_str.slice(0, reverse_str.indexOf(".") + 1);
    cb(null, filename + newString.split("").reverse().join(""));
  },
});
//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
const upload = multer({ storage: storage });

//route hiển thị form upload file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//route xử lý upload multiple file
// "middleware multer "upload.array('formFileMultiple', 3)" xử lý upload multiple file
// ví dụ sử dụng cho chứa năng upload các hình ảnh của sản phẩm, gallery ảnh,...
/* 
    Lưu ý:  - upload.array('formFileMultiple') - tên của thuộc tính name trong input 
    phải giống với 'formFileMultiple" trong hàm upload.array
            - upload.array('fieldname, maxcount): maxcount: số lượng file tối đa upload trong 1 lần
            như code phía dưới là tối đa 3 file trong 1 lần upload
*/
app.post(
  "/uploadFile",
  upload.array("formFileMultiple", 100),
  (req, res, next) => {
    //nhận dữ liệu từ form mảng thông số của các file upload
    const files = req.files;
    // Kiểm tra nếu không phải dạng file thì báo lỗi
    if (!files) {
      const error = new Error("Upload files again");
      error.httpStatusCode = 400;
      return next(error);
    }

    // files đã được lưu vào thư mục uploads
    // hiển thị thông số các ảnh ra màn hình
    res.send(files);
  }
);

// lấy file
var getFile = function (req, res, next) {
  res.sendFile(__dirname + `/uploads/${req.params.uid}`);
};
app.get("/getFile/:uid", getFile);
// delete data;
app.delete("/deleteFile", function (req, res) {
  if (req.body) {
    //  list id file cần xóa
    const listDelete = req.body;
    for (let i = 0; i < listDelete.length; i++) {
      try {
        // check xem file có tồn tại không
        if (fs.existsSync(__dirname + `/uploads/${listDelete[i]}`)) {
          // tiến hành xóa file
          fs.unlink(__dirname + `/uploads/${listDelete[i]}`, function (err) {
            if (err) throw err;
            console.error(err);
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    res.send({ delete: true });
  }
});

// port start
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
