module.exports = {
    mode: 'development',
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./firebase.js`,
  
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}`,
      // 出力ファイル名
      filename: "firebase_webpacked.js"
    },

    experiments: {
        topLevelAwait: true,
    },

};
// module.exports = {
//     // モード値を production に設定すると最適化された状態で、
//     // development に設定するとソースマップ有効でJSファイルが出力される
//     mode: 'development',
  
//     // メインとなるJavaScriptファイル（エントリーポイント）
//     entry: './firebase.js',
  
//     module: {
//       rules: [
//         {
//           // 拡張子 .ts の場合
//           test: /\.ts$/,
//           // TypeScript をコンパイルする
//           use: 'ts-loader',
//         },
//       ],
//     },
//     // import 文で .ts ファイルを解決するため
//     // これを定義しないと import 文で拡張子を書く必要が生まれる。
//     // フロントエンドの開発では拡張子を省略することが多いので、
//     // 記載したほうがトラブルに巻き込まれにくい。
//     resolve: {
//       // 拡張子を配列で指定
//       extensions: [
//         '.ts', '.js',
//       ],
//     },
//   };