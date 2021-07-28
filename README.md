# this is...

AWS Cognito MFA sample with React

this provides sign-in function only🥲

# introduction of code

`cognito_sample` was created by `npx create-react-app cognito_sample`  
and overriden by `react-app-rewired` and `customize-cra` (`config-overrides.js`).

you can run this sample by VSCode DevContainer.

## styling

bulma

## app paths and directories

* `/` : Admin
* `/login` : Login

# before use

You must set your AWS Cognito (User pool and Identity pool),  
then create `cognito_sample/.env` file like below.

```
REACT_APP_AWS_REGION="ap-northeast-1"
REACT_APP_COGNITO_USER_POOL_ID="ap-northeast-1_XXXXXXXXX"
REACT_APP_COGNITO_CLIENT_ID="XXXXXXXXXXXXXXXXXXXXXXXXXX"
REACT_APP_COGNITO_IDENTITY_POOL_ID="ap-northeast-1:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
REACT_APP_COGNITO_IDENTITY_LOGIN="cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_XXXXXXXXX"
```

# TODO

* creating sample of working with API Gateway with cognito auth
* modifying dumb directory structure
* modifying dumb styling
