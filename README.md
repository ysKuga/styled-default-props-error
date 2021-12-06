# styled-components にて `Type of property 'defaultProps' ～` のエラーが出る事象について

現在指定している `styled-components` の `4.1.5` などで\
型が `StyledComponent` を `styled` に指定すると `Type of property 'defaultProps' ～` というエラーが出る。

これは [New error: Type of property 'defaultProps' circularly references itself in mapped type #37597](https://github.com/microsoft/TypeScript/issues/37597) として `styled-components` の issue になっており\
対策として `styled-components`, `@types/styled-components` の `latest` へのバージョンアップが提示されている。

これはコード上での回避が `@ts-ignore` 以外にも可能ではある。

`src\App.tsx` にて以下のように記述しているが、\
`ThemedBaseStyledInterface` 配下での `circularly references itself` を回避するため\
いったん `StyledComponent` から `React.FC` への変換を行っている。

```tsx
const StyledTest = styled.div`
  background-color: blue;
  color: red;
`;

// `ts-ignore` でエラーを無視しないといけない記述
// const ReStyledTest = styled(StyledTest)`
//   background-color: green;
// `;

const ReStyledTest = styled<
  // StyledComponent でない型の扱いにすることで `Type of property 'defaultProps' ～` のエラーを回避
  React.FC<typeof StyledTest["defaultProps"] & { test?: boolean }>
>(
  ({
    // StyledTest には不要となる変数を除去
    test,
    ...props
  }) => <StyledTest {...props} />
)`
  background-color: green;
  color: ${(props) => (props.test ? "black" : "white")};
`;
```

リポジトリ作成時点で以下のバージョンにて問題の解決が確認されているため\
結論としては `styled-components`, `@types/styled-components` の `latest` へのバージョンアップをすべきである。

```json
    "styled-components": "^5.3.3",
    "@types/styled-components": "^5.1.16"
```

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
