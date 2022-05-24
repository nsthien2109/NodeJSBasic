NODEJS - ExpressJS

DOwload code thì 
chạy npm i
+ npm run start

CONFIG 
.gitignore => viết các thư mục không cần up lên github

+ ExpressJS

+ Nếu code Web Server Side : 
  - View Enginer - dùng EJS

+ Body-parser : chuyển đổi dữ liệu sang json

+ Nodemon : hot reload

+ Babel : chạy trên nhiều ver node => import , require ...
  - npm install @babel/core @babel/node @babel/preset-env
  - Tạo file .babelrc => config babel => thêm code bên dưới vào file này
    {
        "presets": [
          "@babel/preset-env"
        ]
    }
  - Sửa script trong package.json => 
    "scripts": {
        "start": "nodemon --exec babel-node index.js"
    }
  - Chạy lại 

+ dotevn : sử dụng để sử dụng file .env
  - import 'dotenv/config'; 





STATIC FILE
 + Tạo thử mục public vào src (public sẽ chứa các folder như css/javascript/images,...v..v)
 + Thêm app.use(express.static('./src/public/')); vào view engine config;






ROUTER - sử dụng mô hình MVC
 + Model(Services)
 + Controller
 + View





 HTTP REQUEST - DATABASE SQL
  + mysql2 : tải mysql2 có vẻ hiệu năng hơn mysql
  + Muốn in data ra file EJS thì dùng <% %> 

  + Body parser để nhận dữ liệu từ form

UPLOAD SINGLE FILE
 + Dùng multer hoặc formidable (ở bài này dùng multer) npm i multer --save
 + Chi tiết tại <https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/>
 + Cài app-root-path

MIDDLEWARE
 Các trường hợp thường xảy ra
 - Logging middleware
 - Authentication check middleware
 - Middleware to parse json data from request
 - return 404 pages
 + Morgan package => log ra middleware
 - Middleware 404 Not found : 
    write in file index.js => app.use((req,res) =>{
      return res.render('404.ejs');
    })

  + Cấu trúc middleware router
  router.METHOD('/name-router', middlewareFunction, next(like HomeController.getXXX));

NHÌN VÀO CODE ĐÃ CODE => OK