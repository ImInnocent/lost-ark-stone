# 로아 돌깎깎

<img src="https://github.com/ImInnocent/lost-ark-stone/blob/master/store/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%20(1).png" width="640" /> 

## 뭐하는 서비스인가요?
온라인게임 '로스트 아크'의 어빌리티 스톤을 세공할 수 있는 서비스입니다.
확률을 직접 체감해보세요.

#### 로아 돌깎깎의 장점은 무엇인가요?
크롬 확장 프로그램을 이용해서 언제나 빠르게 창을 열 수 있고, 이미지로 구성되어 있기 때문에 몰입도 높은 돌깎기를 할 수 있습니다.

#### 어떻게 빠르게 사이트에 접속할 수 있나요?
크롬 우측 상단의 퍼즐모양 이미지를 선택하신 후, 로아 돌깎깎 옆의 핀을 눌러주세요.<br/>
로아 돌깎깎이 고정되면, 아이콘을 클릭후 팝업을 클릭하시면 사이트로 이동됩니다.

<img src="https://github.com/ImInnocent/lost-ark-stone/blob/master/store/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B72.png" width="640" /> 

#### 5개짜리만 가능한가요?
아니요! 화면 오른쪽 '메뉴'에 마우스를 올려서 메뉴창을 꺼내서 슬롯 개수를 조정하면 됩니다.

#### 다시 깎고 싶어요!
화면 오른쪽 '메뉴'에 마우스를 올려서 메뉴창을 꺼내고, 초기화 아래에 있는 '실행'버튼을 누르세요!

# 기술 관련

### Github Link
https://github.com/ImInnocent/lost-ark-stone

### 주요 패키지들
__React__: 17.0.2 이상<br/>
__MUI__: 5.0.5 이상<br/>
__lodash__: 4.17.21 이상

### 기술 스택
__클라이언트 프레임워크__: React<br/>
__클라이언트 UI__: HTML + CSS + MaterialUI (MUI)<br/>
__빌드__: Webpack + Customize-cra<br/>
__배포__: Chrome Extension

### 프로젝트 빌드 방법
```
# 프로젝트 클론
git clone https://github.com/ImInnocent/lost-ark-stone

cd lost-ark-stone

# 패키지 설치
npm install

# 빌드 (/build 폴더에 생성)
yarn build

# 빌드 + 실행 (/dist 폴더에 생성)
yarn start
```

### Trouble Shooting
copy-webpack-plugin이 7.0.0버전 이상부터 getCache함수를 지원하지 않기 때문에, 이전버전인 6.3.2버전을 설치해야 한다.<br/>

https://forum.framework7.io/t/fresh-create-project-not-working/12657
