
## first setup
```
git clone https://github.com/nsslums/Atrevete.git
cd Atrevete
npm install
echo DEBUG_ACCESSTOKEN= >> .env
echo DEBUG_SPACEID= >> .env
```
.envファイルの中身(必須)
```
DEBUG_ACCESSTOKEN="xxxxxxxxxxxxxxxxxxxxxx"
DEBUG_SPACEID="xxxxxxxxxxxxxxx"
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
v19.7.0

$ npm -v
9.6.5

$ gatsby -v
Gatsby version: 5.9.0

$ npm list storybook
storybook@7.0.7
```