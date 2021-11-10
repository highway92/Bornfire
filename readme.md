# 모닥불

- 모닥불은 코로나 블루 극복과 일상회복을 도와주는 익명 감정 공유 서비스입니다.

  

## 프로젝트 구성 안내

#### 1단계 코로나 블루 데이터 분석 및 시각화

- 코로나 시기에 따른 코로나 블루와의 상관관계 분석
  - 주제1 : ex) 시기별 코로나 블루 추이
- 코로나 블루 관련 키워드 크롤링 및 시각화
- 데이터 분석의 결과로 나오는 인사이트 도출

#### 2단계 익명 웹 게시판 구현

- 익명 감정 공유 게시판 구축
- +데이터 분석 결과, 인사이트 기반의 서비스 추가

#### 3단계 자연어 처리 기술을 이용한 사용자별 맞춤 서비스 제공

- 사용자의 작성 게시글을 바탕으로 감성분석
- 사용자의 감정 분석 & 콘텐츠 추천
- 필요 시 사회 지원 서비스 연결





## 1. 프로젝트 소개



### 1.1 코로나 블루와 관련된 기본통계 제공
- 사용 데이터
    - 질병 소분류(4단 상병) 통계 데이터셋(보건의료빅데이터개방 시스템)
    - ▲범불안장애(F41.1) ▲명시되지 않은 불안장애 (F41.9) ▲경도의 우울병 에피소드(F32.0)에 해당하는 데이터
- 데이터 기간
    - pre-corona : 2018.12~ 2020.01
    - post-corona : 2020.02 ~2021.03

#### 1.1.1 진료년월별 
- 

#### 1.1.2 성별/연령별
- 

#### 1.1.3 지역별 입원/외래 환자 수
- 지역별 입원/외래 환자수 통계
- 지역별 환자 수 대비 정신건강 지원 서비스/기관 분포비율
  - 추후 지역별 지원서비스의 필요성을 위한 근거 결과로 활용
  - 지역에 따른 지원서비스 추천


### 1.2 익명 웹 게시판 서비스 제공

### 1.2.1 필요 기술 스택
- 백엔드 기술스택 : Flask, MONGODB, Uwsgi, Nginx, Docker, Ubuntu 20:04, AWS
- 고려가능 기술스택 : Postman
- 프론트엔드 기술스택 : Bootstrap, Jinja_template, Vanila JS, J-query

### 1.2.2 게시판 서비스 기능


## 2. 프로젝트 목표

**데이터 분석 결과로 도출되는 인사이트와 웹서비스의 해결과제에 대한 논의 (50자 이상)**

- 프로젝트 아이디어 동기
- 문제를 해결하기 위한 특정 질문 명시
- 데이터를 통해 탐색하려는 문제를 구체적으로 작성



## 3. 프로젝트 구성도

- 와이어프레임/스토리보드 추가



## 4. 프로젝트 팀원 역할 분담

| 이름   | 담당 업무                      |
| ------ | ------------------------------ |
| 심동민 | 팀리더 / 데이터 분석/ 백엔드   |
| 박수민 | **드라이버**/데이터 분석                    |
| 이상길 | **드라이버** / 백엔드 & 프론트 |
| 이동현 | 백엔드 & 프론트                |
| 이상백 | 백엔드 & 프론트                |

**멤버별 responsibility**

1. 팀장

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 데이터 분석 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비



2. 드라이버

- 파트별 회의 진행, 업데이트 상황 공유, 파트별 진행상황 드라이브



2. 데이터 분석

- 기획 단계: 데이터 셋 선정, 데이터 분석 주제 선정
- 개발 단계: 데이터 분석 결과 도출, 데이터 분석 결과 시각화
- 수정 단계: 피드백 반영 후 → 수정



3.  백엔드 & 프론트 담당

- 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
- 수정 단계: 코치님 피드백 반영해서 분석/ 시각화 방식 수정



## 5. 버전

- 프로젝트의 버전 기입

## 6. FAQ

- 자주 받는 질문 정리