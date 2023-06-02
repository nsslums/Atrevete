
## first setup
```
git clone https://github.com/nsslums/Atrevete.git
cd Atrevete
npm install
echo > .env
```
.envファイルの中身(Gatsby使用時必須)
```
ACCESSTOKEN="xxxxxxxxxxxxxxxxxxxxxx"
SPACEID="xxxxxxxxxxxxxxx"
SITEURL="https://your.domain"
```
### Gatsby
```
npm run develop
```

### Storybook
```
npm run storybook
```

### ローカル開発環境の構築
#### npmの準備
```
nvm install 19
nvm use 19
```
##### nvmのインストール方法
https://github.com/nvm-sh/nvm#installing-and-updating


#### プロジェクトのclone
```
git clone https://github.com/nsslums/Atrevete.git
```

##### 注意
- npmはcloneしたディレクトリで実行

## Verisons
```
$ node -v
v20.2.0

$ npm -v
9.6.6

$ npm list gatsby
Gatsby version: 5.10.0

$ npm list storybook
storybook@7.0.18
```