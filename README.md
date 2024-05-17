# :mag: OPGG


### 1) 프로젝트 소개
>OPGG를 따라 만든 **개인프로젝트**
>
>index에서 간단한 다크모드, ~~register(login, logout)~~(현재 DB가 연동이 되어있지않아 로그인이 불가능합니다.), 닉네임을 검색하여 간단한 유저 정보와 최근 전적 검색 
>
>리그오브레전드 각 챔피언의 정보들을 확인 할 수 있게 만들었습니다.

### 2) 배포주소
- **[OPGG](https://port-0-opgg-1jx7m2gldrhsds7.gksl2.cloudtype.app/)** (클라우드타입) 

# :watch: 개발기간
>2022.12.03 ~ 진행 중

# :books: 시작 가이드

### 1) React
> **[NodeJS](https://nodejs.org/dist/v18.15.0/node-v18.15.0.pkg)** 설치가 필요합니다.

```
npm i
node app
```

### 2) API

> **[OPGG](https://developer.riotgames.com/)** 를 사용하기 위해 apikey.js에 다음과 같은 API KEY가 필요합니다.
```
// public/script/apikey.js

const config = {
	apikey: ""; // API_KEY 입력
}
```
# :computer: 페이지 구성 
| 메인 페이지 |
|---|
|<img src="https://user-images.githubusercontent.com/117905287/227774190-28be9f1d-0c9c-430a-8da0-8645fe8927ae.png">|

| 챔피언 분석 페이지 |
|---|
<img src="https://user-images.githubusercontent.com/117905287/225333516-51e87e25-8009-4af1-bddd-ef2fd8197d88.png">|

| 전적 검색 페이지 <span style="opacity : 0.3; font-weight : 400"> - 진행 중</span> |
|---|
|<img src="https://user-images.githubusercontent.com/117905287/227774313-bf6dc03d-801d-43ef-b7eb-606283c27d57.png">|

| 로그인 | 회원가입 | 
|---|---|
|<img src="https://user-images.githubusercontent.com/117905287/225334630-aea7bf52-61a4-4cbd-a56e-bf124fa1af64.png" width=400>|<img src="https://user-images.githubusercontent.com/117905287/225334624-a7a7ae9e-56bc-4cee-9533-ccbd176903c5.png" width=400>|

| 발로란트<span style="opacity : 0.3; font-weight : 400"> - 진행 중</span> | 듀오지지<span style="opacity : 0.3; font-weight : 400"> - 진행 중</span> | 
|---|---|
|<img src="https://user-images.githubusercontent.com/117905287/225335589-74364273-2ea6-4a1a-ac6b-8cab293311e6.png" width=400>|<img src="https://user-images.githubusercontent.com/117905287/225335600-680212d0-f632-46b6-b761-badafccc1919.png" width=400>|

# :bulb: 주요 기능
### 1) 게임 내 모든 챔피언의 정보를 볼 수 있다.
* 챔피언의 스킬 정보, 스토리, 일러스트 확인 가능
* 신 챔피언 출시마다 추가 예정
### 2) 닉네임 검색 시 해당 유저의 정보를 볼 수 있다.
* 해당 유저의 소환사 아이콘, 레벨, 티어, 승률 및 승패 확인 가능
* 최근 게임 전적 10경기 각종 정보 및 승패 확인 가능
* 최근 게임에서 팀원의 정보까지 확인 할 수 있도록 추가 예정
### 3) 회원가입 및 로그인, 로그아웃 기능
* 정규 표준식을 이용해 회원가입을 만들었습니다.
* 로그인 시 메인화면에 닉네임을 표시하고 로그  아웃 기능도 구현했습니다.
* ~~현재 DB가 대신 user.json에 회원 데이터를 넣고 있습니다. 곧 수정할 예정입니다.~~
    * maria DB를 사용하여 로그인, 회원가입을 할 수 있도록 수정했습니다.

# :wrench: 진행하며
처음 개인프로젝트를 시작할 때 즐겁게 만들 수 있으며 공부가 되는 게 뭐가 있을까 고민하다가 시작한 OPGG 사이트 입니다.
프로젝트를 시작하고 노트북 앞에 앉으면 시간 가는 줄 모를정도로 정말 재미있게 진행했고 지금도 변함없이 즐기고 있습니다.
여러 기능들을 구현해보고 공부하면서 자바스크립트도 더 친해졌고 덕분에 프론트엔드에 한걸음 다가간 것 같습니다.
하지만 class명이 제대로 정리되지 않았으며 코드들도 깔끔하게 정리되어 있지 않아 부족하다는 것을 많이 느꼈습니다.
또한 진행하다 오류가 나거나 막히는 부분이 생기면 구글링으로 해결은 했지만 더 좋고 깔끔하게 사용할 수 있는 코드들도 있는지 더 공부해야 할 것 같습니다.

# :page_facing_up: 기술 스택
<img src="https://img.shields.io/badge/html5-1572B6?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-E34F26?style=for-the-badge&logo=css&logoColor=white"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
