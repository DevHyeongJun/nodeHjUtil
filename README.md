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

## 실행 스크립트
> __날짜 별 파일 정리__
> - ``` npm run watchDir ```
> - 지정 폴더에 있는 파일 또는 폴더를 옴길 폴더에 날짜 별로 분류하며, 실시간으로 이동시킴.
> 
>   ( c:/test => c:/test2/2022-05-20/* )
>   
> - 경로는 ./config.js 내 file = {} 정의
> - watch 추가는 work/watchDirWork.js 정의
