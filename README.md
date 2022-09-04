# Github GraphQL apiを通した、組織の情報取得方法

## 課題
github GrapyQL apiを利用するためには、OAuth tokenが必須。
今回、組織のアカウントのTokenを取得し、組織に属するメンバーの情報を取得したい。



## 事前準備

1. Vite + React + tsをインストール

    参照 [Vite公式ドキュメント　はじめ方](https://ja.vitejs.dev/guide/#vite-%E3%82%92%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%A7%E8%A9%A6%E3%81%99)

    ```
    npm crate vite@latest
    ```

    画面表示に従い、設定を完了させる。

2. プロジェクト内に移動

    ```
    cd <YOUR_PROJECT_NAME>
    ```


2. PORT番号の指定
    packages.jsonファイルの中にある、divコマンドを修正
    ```
    "dev": "PORT= <PORT_NUM> vite"
    ```
    
    Vite はできないが、Webpackであれば、.envファイルで以下のように記述するだけで設定できるそう。
    ```
    PORT= <PORT_NUM>
    ```

3. テスト起動
    ```
    npm run dev
    ```



## 実践

1. Github APP を作成し、組織にインストールさせ、ライブラリーを通して Token を取得する

    ### 参照
    [Github Appの作成から、Token取得方法](https://micahjon.com/2021/repo-scoped-access-token-for-github-org/)
    [ライブラリーを通したToken取得方法](https://www.npmjs.com/package/github-app-installation-token)

    ### 条件
    Github Appを作成する際、Membersのみonly-readにする。
    それ以外の設定はすべて、no-access。
    
    ### 注意
    今回、Github Appを通し取得したプライベートキーを、プロジェクトルートの上に格納した。
    理由：ローカルパスの指定がうまくいかず、カレントディレクトリで指定した。（本来は、別の場所に格納するのがふさわしい・・・）


    Token取得に成功した場合、.envファイル（プロジェクトルート）に格納
    ```
    VITE_REACT_APP_GITHUB_ORGANIZATION_ACCESS_TOKEN = <YOUR_TOKEN_KEY>
    ```

    **注意**
    なぜか、変数名の頭に、VITE_を付けないと、アクセスできない
    ちなみに、VITE_はコンソールからアクセスできてしまうので、他の手段を考える必要がありそう。


2. Apollo Clientのインストール
 
    ## 参照
    [Apollo Client アプリケーションを作る準備](https://qiita.com/FumioNonaka/items/0c6b711627e3443ff73b#apollo-client%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E3%81%A4%E3%81%8F%E3%82%8B%E6%BA%96%E5%82%99)
    
    [Apollo Client + React 入門](https://qiita.com/seya/items/e1d8e77352239c4c4897#%E5%BF%85%E8%A6%81%E3%81%AApackage%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)

    ```
    npm install @apollo/client graphql
    ```


3. src/App.tsxを修正

    本レポジトリに格納されているsrc/App.tsxを参照ください

4. アプリを起動

    ```
    npm run dev
    ```

5. ブラウザのコンソールで情報が取得されているか確認

    情報が取得されていたら成功！


    エラーが発生した場合

    ・Tokenを取得しなおし、設定しなおす
    ・Github Appの権限公開設定が間違っているか確認


    
# 今回の検証結果

上記のやり方で、成功することができた。
ただ、組織の場合、各ユーザーがそれぞれ自分を「public」に設定しない限り
Tokenを通して情報を取得しても、そのユーザーのnameは取得できない。（idとavatarUrlは取得できた。）

Token格納に関して、いくつかセキュリティ面を考慮した課題があるが、
ひとまず、出来そう。


# License

[MIT](https://choosealicense.com/licenses/mit/)
    
