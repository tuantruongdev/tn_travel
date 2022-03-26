Front-End cho website du lịch

1, Scripts làm việc
HTML: Chạy ở đường dẫn App/pug/
pug -w ./login.pug -o ../../ -P
pug -w ./signup.pug -o ../../ -P
pug -w ./index.pug -o ../../ -P
pug -w ./forgot_password.pug -o ../../ -P
pug -w ./list_tour.pug -o ../../ -P

CSS: Chạy ở đường dẫn App/sass/
sass ./home.scss ../../assets/styles/home.css --watch
sass ./login.scss ../../assets/styles/login.css --watch
sass ./signup.scss ../../assets/styles/signup.css --watch
sass ./forgot_password.scss ../../assets/styles/forgot_password.css --watch
sass ./list_tour.scss ../../assets/styles/list_tour.css --watch
