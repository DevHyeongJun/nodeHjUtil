# nodeJS 라이브러리
> 1. window 파일 정리 ( mac도 될수도? )
 
## 환경 설정
>  1. node를 설치해주셔야 합니다.
>  2. 끝

## 구동 방법
> 코드 경로에 필요한 모듈을 설치합니다.   
> 
> ```npm install```   
> 
> 파일을 실행합니다.   
> 
> ```npm run fileWork```   
> 
> __*모든 설정 config는 ./config.js에서 정의합니다.__

## 실행
### 날짜 별 파일 정리
> - 지정 폴더에 있는 파일 또는 폴더를 옴길 폴더에 날짜 별로 분류하며, 실시간으로 이동시킴.
>   ( c:/test => c:/test2/2022-05-20/* )
> ``` npm run watchDir ```
> - 경로는 ./config.js 내 file = {} 에서 정의
> - watch 추가는 work/watchDirWork.js 에서 실행
