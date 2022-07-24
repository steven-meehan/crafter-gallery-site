# Crafter Gallery Site

A simple gallery site created and designed for crafters so they can display their wares. This is a [React](https://reactjs.org/) application bootstrapped using [Create React App](https://create-react-app.dev/). Instead of reaching out to a database, or back-end service, this application uses configuration files for everything from the navigation to the galleries and their contents. 

## Site Configuration

After cloning this repository for a new client, there are several things that need to be done in order to get a new site up and running. First the Navigation and Gallery Configuration Files need to be created and placed into the configs folder in the S3 bucket. Once the files have been created and placed, you need to transfer the images into their gallery specific folders under the gallery folder in the S3 bucket. Next You need to configure the Routes and CSS and create the `index.html` file.

The application is built with Sass so you will need something to compile the CSS files. For Visual Studio you can use a couple of extensions [Saas](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) & [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)

### Navigation Config

```JSON

{
    "navigation": [
        {
            "url": "/gallery",
            "order": 1,
            "name": "Gallery",
            "title": "Check out my Galleries",
            "active": true,
            "internalLink": true,
            "social": false,
            "icon": "",
            "childLinks": [
                {
                    "url": "/gallery/pens",
                    "order": 1,
                    "name": "Pens",
                    "title": "Examples of my Glitter Pens",
                    "active": true,
                    "internalLink": true,
                    "social": false,
                    "icon": "",
                    "childLinks": []
                },
                .
                .
                .
            ]                  
        },
        .
        .
        .
    ],
    "logoAltText": "{Place Alt Text for Logo Here}"
}

```

- `navigation`: Is an array of complex objects. (Required)
    - `url`: (`string`) This is the url for the route. (Required)
    - `order`: (`number`) This is the order used for displaying the routes. (Required)
    - `name`: (`string`) This is the display name for the route. (Required)
    - `title`: (`string`) This is the title for the link. (Required)
    - `active`: (`bool`) This determines if the route will be displayed.
    - `internalLink`: (`bool`) This determines if the link is internal to the application.
    - `social`: (`bool`) This determines if the link is for social media.
    - `icon`: (`string`) This specifies the font awesome icon to use for social media links.
    - `childLinks`: Is an array of complex objects (All the same as `navigation`)
- `logoAltText`: (`string`) This is the Alternative Text for the main logo. (Required)

### Gallery Configs

```JSON

{
    "baseUrl": "URL Goes Here",
    "folderName": "Folder Name Goes Here",
    "pageHeader": "Header Title Goes Here",
    "images": [
        {
            "title": "Image TItle Goes Here",
            "altText": "Image ALt Text Goes Here",
            "fileName": "Image Filename Goes Here",
            "order": 1,
            "externalLink": "External Email Goes Here",
            "landscape": false,
            "description": {
                "paragraphs": [
                    {
                        "text": "Blurb Goes Here",
                        "order": 1,
                        "active": true
                    },
                    .
                    .
                    .
                ]
            }
        }
        .
        .
        .
    ]
}

```

- `baseUrl`: (`string`) This is the base URL for all the images in the configuration file. (Required)
- `folderName`: (`string`) This is the sub-folder containing the images in the S3 bucket. (Required)
- `pageHeader`: (`string`) This is hte header for the gallery. (Required)
- `images`: Is an array of complex objects, but the name should be specific to the collection of images held within. (Required)
    - `title`: (`string`) This is the title of the image. (Required)
    - `altText`: (`string`) This is the alternate text for the image. (Required)
    - `fileName`: (`string`) This is the name of the image's file in the S3 bucket. (Required)
    - `order`: (`number`) This is the order used to display the image. (Required)
    - `externalLink`: (`string`) This is the external link to be used for the image. If there is no external link leave empty or set to null.
    - `landscape`: (`bool`) Tells the application if the image was taken using landscape view.
    - `description`: Is a complex object.
        - `paragraphs` : Is an array of complex objects. You can make as many of these paragraphs as you want.
            - `text`: (`string`) This is a paragraph for the description of the image. (Required)
            - `order`: (`number`) This is the paragraph's order in the description. (Required)
            - `active`: (`bool`) This determins if the paragraph is displayed on the web page. (Required)

### Home Config

This page is written to use either a collection of `Info`, `ImageSlider`, or `Image` components. Use the following configuration file to tweak the layout of the `Home` page. To render an `Image` component only include a single image in the `images` field of the JSON. 

```JSON

{
    "layout": {
        "columns": {
            "number": 2,
            "components": [
                {
                    "active": true,
                    "order": 1,
                    "component": "info",
                    "embedImage": false,
                    "paragraphs" : [
                        {
                            "order": 1,
                            "display": true,
                            "empahsis" : true,
                            "text": "TEXT Goes Here"
                        },
                        .
                        .
                        .
                    ]
                },
                {
                    "active": true,
                    "order": 2,
                    "component": "image",
                    "baseUrl": "URL Goes Here",
                    "images": [
                        {
                            "title": "Title Goes Here",
                            "altText": "Alternate Text Goes Here",
                            "fileName": "File Name Goes Here",
                            "order": 1,
                            "externalLink": "External Link Goes Here",
                            "landscape": false
                        },
                        .
                        .
                        .
                    ],
                    "slider": {
                        "auto":true,
                        "timer":30000
                    }
                }
            ]
        }
    }
}

```

### Not Found Config

```JSON

{
    "paragraphs" : [
        {
	    "order": 1,
	    "display": true,
	    "empahsis" : true,
	    "text": "Text Goes Here"
        }
        .
        .
        .
    ],
    "image" : {
	    "title": "Insert Title Here",
        "altText": "Insert Alternative Text Here",
        "fileName": "Insert filename Here",
        "url": "Insert URL Here"  
	}
}


```

### Route Configs

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


### Footer Config

Create a `Footer.json` file with the following structure.

```JSON

{
    "copyrightInfo": {
        "name": "NAME Goes Here",
        "url": "URL Goes Here",
        "title": "Title Goes Here"
    },
    "siteDesignInfo": {
        "display":true,
        "name":"Site Designer Goes Here",
        "url": "URL Goes Here",
        "title": "Title Goes Here"
    }
}

```

- `copyrightInfo`: Complex object to configure the copyright section of the footer.
    - `name`: {`string`} This is the crafter's name.
    - `url`: {`string`} This is used a url for the crafter. If empty the name will NOT be a link.
    - `title`: {`string`} This is the title for the link. If the url is empty or null this will not be used. 
- `siteDesignInfo`: Complex object to configure the site designer section of the footer.
    - `display`: {`bool`} Determines if the site designer information will be displayed.
    - `name`: {`string`} This is the site designer's name.
    - `url`: {`string`} This is used a url for the site designer. If empty the name will NOT be a link.
    - `title`: {`string`} This is the title for the link. If the url is empty or null this will not be used.

### CSS Config

```SCSS

// Color Palette
$primaryColor: #ffffff;
$secondaryColor: #6c757d80;
$highlightColor: #23e6ef;
$highlightColorDimmed: #23e6ef73;
$navLinkColor: #6c757d;
$altNavLinkColor: #50555a;
$thumbnailColor: #bac2c980;

// Font Colors
$navFontColor: #ffffff;
$fontColor: #000000;
$notFoundPrimaryColor: #40e6ef;
$notFoundSecondaryColor: #243ebd;

// Font Selection
$headerFont: 'Shadows Into Light Two', cursive;
$titleFont: 'Shadows Into Light Two', cursive;
$defaultFont: 'Shadows Into Light Two', cursive;

```

#### Color Palette

- `$primaryColor`: This takes care of the background color for the `Card` Component
- `$secondaryColor`: This takes care of the background color for the `body` element
- `$highlightColor`: This takes care of the Highlight Color, used for thin borders, the nav link's font pop, etc...
- `$highlightColorDimmed`: This takes care of the box shadow
- `$navLinkColor`: This takes care of the background color for the nav links
- `$altNavLinkColor`: This takes care of the hover color for the nav links
- `$thumbnailColor`: This takes care of the background color of the thumbnail bar

#### Font Color

- `$navFontColor`: This takes care of the primary font color for the nav links 
- `$fontColor`: This takes care of the primary font color for text on the page
- `$notFoundPrimaryColor`: The default link color on the not found page
- `$notFoundSecondaryColor`: The hover link color on the not found page

#### Font Selection

- `$headerFont`: This takes care of the font family for the header
- `$titleFont`: This takes care of the font family for the title
- `$defaultFont`: This takes care of the font family for the page

### index.html

Create an `index.html` file in the public folder before attempting to build. See sample below.

```HTML

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="{Description goes here}"
    />
    <link href="https://use.fontawesome.com/releases/v6.1.1/css/all.css" rel="stylesheet">
    <title>{Title goes here}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```

### index.scss

Create an `index.scss` file and insert the following code to have a simple background.

```scss

@import "./Configs/Variables.scss";

body {
    @include background();
}

```

If you want to have an image add the photo's url (`'https://www.sample.com/test/test.jpg'`) into the parentheses.

### Logo

Add the main Logo for the site in the assets folder named `Logo.png` and then for mobile add another named `LogoAlt.png`.

### Google Analytics

In order to connect the website to Google Analytics, you must first create the site's `index.html` file. After that you will need to create or log into a Google analytics account and then create the new property. Once complete, expand the `Global site tag` section under the `Tagging Instructions` heading and copy the block of code and paste it into the `<head>` section of the new site's `index.html` file.


### File Config Urls

```JSON

[
    {
        "configuration":"navigation",
        "url":"URL Goes Here"
    },
    {
        "configuration":"gallery",
        "url":"URL Goes Here"
    },
    {
        "configuration":"home",
        "url":"URL Goes Here"
    },
    {
        "configuration":"notFound",
        "url":"URL Goes Here"
    }
]

```

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
