# chạy bằng npm :

    <div>- npm init</div>
    <div>- npm install</div>
    <div>- npm install --save multer</div>
    <div>- npm express multer body-parser --save</div>
    <div>- npm nodemon</div>
    <div>- npm ./index.js</div>

# chạy nhanh bằng yarn :

    <div>- yarn install</div>
    <div>- yarn run start</div>

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
