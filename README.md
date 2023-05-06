## Verisons
```
$ node -v
v19.7.0

$ npm -v
9.6.5

$ gatsby -v
Gatsby CLI version: 5.9.0
Gatsby version: 5.9.0

$ npm list storybook
storybook@7.0.7
```

.env
```
accessToken="xxxxxxxxxxxxxxxxxxxxxx"
spaceId="xxxxxxxxxxxxxxx"
```

### Gatsby
develop
```
gatsby develop
```
ローカル内の他端末からアクセス
```
gatsby develop -H 0.0.0.0
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


#### Gatsbyとパッケージのインストール
```
npm install
npm install -g gatsby-cli
```
##### 注意
- npmはcloneしたディレクトリで実行
- -gオプションでグローバル(マシン)にインストール
