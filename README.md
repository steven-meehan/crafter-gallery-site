# Crafter Gallery Site

A simple gallery site created and designed for crafters so they can display their wares. This is a [React](https://reactjs.org/) application bootstrapped using [Create React App](https://create-react-app.dev/). Instead of reaching out to a database, or back-end service, this application uses configuration files for everything from the navigation to the galleries and their contents. 

## Site Configurations

In order to set up a new site, clone the repository and create the configuration files for the Routes.

### Routes

In conjunction with the Navigation Configuration file this application uses two JSON files to create the Routing tree.

#### Top Level Routes

The `Content` component pulls this configuration file to establish the main routes for the application.

> `TopLevelRoutes.json` This configuration file handles the top-level routes for the application. At minimum, you need an entry to for the Home, Gallery and Not Found routes.

```JSON

[
    {
        "path":"/",
        "exact":true,
        "component":"Home",
        "componentOptions":null,
        "status":null,
        "redirect":{
            "enabled":false,
            "path":null
        }
    }
    .
    .
    .
]

```

#### Gallery Routes

The `Gallery` component pulls this configuration file to establish the routes for all the galleries in the application.

> `GalleryRoutes.json`  This configuration handles the navigation for all the galleries. You will need two entries for each gallery. One for the main gallery and the other for the specific image files. It is highly recommended that you add a final entry to redirect any non-existing galleries to one of the existing ones.

```JSON

[
    {
        "path":"/gallery/pens",
        "exact":true,
        "component":"Carousel",
        "componentOptions": {
            "configSettingFile":"config-gallery-pens.json",
            "imagesObject":"pens",
            "defaultPage":"/gallery/pens/",
            "fontAwesomeArrowIcons":"fas fa-arrow-circle"
        },
        "status":null,
        "redirect":{
            "behavior":false,
            "path":null
        }
    },
    {
        "path":"/gallery/pens/:imageName",
        "exact":false,
        "component":"Carousel",
        "componentOptions": {
            "configSettingFile":"config-gallery-pens.json",
            "imagesObject":"pens",
            "defaultPage":"/gallery/pens/",
            "fontAwesomeArrowIcons":"fas fa-arrow-circle"
        },
        "status":null,
        "redirect":{
            "behavior":false,
            "path":null
        }
    }
    .
    .
    .
    {
        "path":"/gallery/:galleryName",
        "exact":false,
        "component":null,
        "componentOptions": null,
        "status":null,
        "redirect":{
            "behavior":true,
            "path":"/gallery/pens"
        }
    }
]

```

- `path`: (`string`) is the route for the given entry
- `exact`: (`bool`) tells the router that the incoming route must be an exact match
- `component`: (`string`) details the component that will be used for the route
- `componentOptions`: is a complex object that configures the `Carousel` component
    - `configSettingFile`: (`string`) is the location for the gallery's configuration file
    - `imagesObject`: (`string`) is the name of the images in the configuration file
    - `defaultPage`: (`string`) is the base portion of the url for the images in the configuration file
    - `fontAwesomeArrowIcons`: (`string`) details the icons used for the arrows to cycle through the images in the gallery
- `status`: (`number`) this number is used when a required route needs a different status code
- `redirect`: is a complex object that configures a redirection route
    - `enabled`: (`bool`) tells the router that the incoming route needs to be redirected
    - `path`: (`string`) is the route for the given entry

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
