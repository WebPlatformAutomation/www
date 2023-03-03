# Demo project for Platform-UI

## Install Platform-UI

```
npm install platform-ui-automation --save-dev
```

## Create Test Directory and Profiles

The test directory `test/e2e` has the configuration for profiles:

```
dev: 
  baseUrl: http://localhost:3000

preview: 
  baseUrl: https://${branch}--www--webplatformautomation.hlx.page

live: 
  baseUrl: https://${branch}--www--webplatformautomation.hlx.live

prod: 
  baseUrl: https://www.webplatform4.com

acom:
  baseUrl: https://www.adobe.com
```

## Run tests in the feature directory

Use the profile `acom` to run test with the tag @id-1.
```
npx run test/e2e -p acom -t @id-1
```

## Run test scripts in content

The page under test is https://www.webplatform4.com/example.

The test script is in https://www.webplatform4.com/example-test.

Test `example` page on the local dev server. Use `hlx up` to start up the server.

```
npx run test/e2e -g example -p dev
```

Test `example` page on the Franlin preview

```
npx run test/e2e -g example -p preview
```

Test `example` page on the Franlin live

```
npx run test/e2e -g example -p live
```

Test `example` page on the production

```
npx run test/e2e -g example -p prod
```

Note: The directory `features/site` is created to store downloaded test scenarios. It's safe to delete it. Don't create new Cucumber scripts in the directory.  