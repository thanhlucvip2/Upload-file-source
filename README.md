# chạy dự án

    - npm init
    - npm install
    - npm install --save multer
    - npm install express multer body-parser --save
    - npm install nodemon
    - nodemon ./index.js

# upload File

method="POST"
api : '/uploadFile'
enctype="multipart/form-data"
type="file"

body :
post-man post dạng form-data
{
formFileMultiple : file
}

# getFile

method="GET"
api : '/getFile/:uid'

# delete

method="DELETE"
api : '/deleteFile'
body :
mảng danh sách id cần xóa
[
"id1",
"id2"
]
