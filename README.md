# Pintu Frontend Candidate Assignment

Replicated Pintu website page (https://pintu.co.id/market) for Pintu Frontend candidate assignment

## How to run the application

Install all dependencies

```bash
npm install
```

Run the application

```bash
npm start
```
Then open http://localhost:3000/ in your browser. 
*Make sure you are using browser with extension that allow CORS, example: "Allow CORS: Access-Control-Allow-Origin" extension in Chrome browser.

## Assumptions
- The assignment PDF file mentioned that the most important thing is the token list and the provided APIs also for the token list so the page only has the title and the token list.
- It appears in the actual page (https://pintu.co.id/market), the token prices are refreshed every around 5 seconds so this application will also do the same.
- Market cap is not included on the token list table column since the provided APIs don't have the market cap information.
- Since request to the provided APIs got blocked by CORS policy and this CORS policy should be enabled from server side, this application can be run in development by using Chrome browser extension: "Allow CORS: Access-Control-Allow-Origin"
- Maximal fraction digit for price number is set to 8 digits, example: Rp 1,1234567890 will become Rp 1,12345678


## Deployment
- Automatic deployment is done using Github Action
- Deployed to Vercel, url: https://pintu-market-chi.vercel.app/market

## About The Application
### Tech Stack:
- React 18
- Typescript

### Additional Libraries:
- Axios: used for send request to APIs. Chose axios because its browser support is wider than fetch.
- Craco: used for import path alias for better readability.
- Eslint: used for linting purpose.
- Prettier: used for code formatter.
- Sass: used for styling component with more features than CSS. Example: create & import variables, nested css selector
- Primereact: used for component library
- env-cmd: used for use .env file when running application

### Project Structure
This project structure is implementing MVVM (Model, View, ViewModel) design pattern. 

MVVM component:
- Model: contain business logic and handle data that will be presented by View component
- View: present user interface to the user using data from Model component
- ViewModel: handle state management and presentation logic. Act as bridge that help translate data from Model component to be in format that can be presented by View component

This project structure tree:
```bash
├───.github
│   └───workflows
├───.vercel
├───public
└───src
    ├───assets
    │   └───fonts
    ├───configs
    ├───contexts
    ├───hooks
    ├───styles
    │   ├───commons
    │   └───market
    ├───tests
    ├───utils
    │   ├───apis
    │   ├───customProps
    │   ├───customTypes
    │   │   ├───contexts
    │   │   ├───utils
    │   │   └───views
    │   └───httpRequests
    └───views
        ├───commons
        └───market
```

MVVM design pattern in this project structure:
- Model: Since we don't handle the data and only get the data from APIs, there is not many Model component in this project. There is only HttpError class (./src/utils/httpRequests/httpError.ts) that will be used for error handling.
- View: Every UI components are the View model which will present the UI interface to the user. All of the UI components are located in "./src/views".
- ViewModel: all custom hooks located in "./src/hooks" are the ViewModel component. Custom hooks will have the state management, all data fetching process, and all of the other processes that using the data fetched from APIs. Custom hooks will give the processed data to the View component.

Some benefits of this design pattern:
- Separation of concerns: Each components has it owns purpose.
- Enhanced testability: We can test the component with its business logic seperately. We can test View component only for its behavior without considering the data and we can test the business logic in ViewModel component without need to render the View component.
- Reusability: We can reuse the ViewModel component in some other View components.
- Maintainability: seperating the View component with ViewModel component make codes looks more concise, easy to read, and easy to maintain.

## Improvement Opportunity
- Maybe Lazy loading on token list can be one of the improvement opportunity for better website performance