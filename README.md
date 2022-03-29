실행방법
1. npm run start
2. 서버config 설정
 (개발/상용)
 2-1 /src/Config/Server.js에서 api주소 변경
 2-2 /src/ContextApi/Context.js에서 fn_dev/fn_product 함수 실행

배포방법
1. npm run build
2. build 디렉토리가 생성되면 그 안에 파일들을 전부 업로드 