# Crafter Gallery Site

A simple gallery site designed to be a public portfolio for crafters. This is a [React](https://reactjs.org/) application bootstrapped with [Create React App](https://create-react-app.dev/). Instead of reaching out to a database, or back-end service, this application uses configuration files pulled from the web server to render everything from the navigation to the galleries and their contents.

While the code was initially created to run out of an Amazon S3 bucket, you do not have to utilize that technology stack, though for the purpose of this documentation I will assume you are using a combination of an S3 bucket and CloudFront to run your crafter's site.

The system's `uesHttp` hook has been designed to cache the results for the web requests to retrieve the data files needed, see [Data File Locations](#data-file-locations) for full details.

## Table of Contents

- [Site Configuration](#site-configuration)
    - [Data File Locations](#data-file-locations)
    - [Navigation and Routing](#navigation-and-routing)
        - [Navigation](#navigation)
        - [Routing](#routing)
            - [Top Level Routes](#top-level-routes)
            - [Gallery Routes](#gallery-routes)
                - [Gallery Options for arrows](#gallery-options-for-arrows)
    - [Content Configuration](#content-configuration)
        - [Gallery Data Files](#gallery-data-files)
        - [Home](#home)
        - [Not Found](#not-found)
    - [Misc Content](#misc-content)
        - [Index Pages](#index-pages)
            - [HTML](#html)
            - [SCSS](#scss)
        - [Logo](#logo)
        - [Footer Config](#footer-config)
        - [CSS Config](#css-config)
            - [Color Palette](#color-palette)
            - [Font Color](#font-color)
            - [Font Selection](#font-selection)
            - [Site Mixins](#site-mixins)
    - [SEO Configuration](#seo-configuration)
    - [Google Analytics](#google-analytics)
- [Available Scripts](#available-scripts)
    - [Start](#start)
    - [Test](#test)
    - [Run Build](#run-build)
    - [Run Eject](#run-eject)
- [Learn More](#learn-more)
    - [Code Splitting](#code-splitting)
    - [Analyzing the Bundle Size](#analyzing-the-bundle-size)
    - [Making a Progressive Web App](#making-a-progressive-web-app)
    - [Advanced Configuration](#advanced-configuration)
    - [Deployment](#deployment)
    - [Build fails to minify](#build-fails-to-minify)

## Site Configuration

The application is built with Sass so you will need something to compile the CSS files. For Visual Studio you can use a couple of extensions [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) & [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)

After cloning this repository for a new client, there are several steps that need to be taken to successfully run the new site. 
- First there are several configuration files the application requires.
    - Copy the contents of the `assets` folder from `NewSiteSampleFiles` to the `assets` folder under `src` (These are sample logos that should be replaced with the crafter's logo).
    - Copy the contents of the `ConfigurationFiles` folder from `NewSiteSampleFiles` to the `ConfigurationFiles` folder in the `scr` folder.
    - Copy the contents of the `data-files` folder from `NewSiteSampleFiles\public` to the `public\data-files` folder.
    - Copy the loose files of the `NewSiteSampleFiles\public` to the `public` folder (This includes a sample favicon icon that should be replaced with the crafter's logo).
    - Copy the contents of the `Variable.scss` & `index.scss` file from `NewSiteSampleFiles` to the `scr` folder.

With the configuration files copied, update them with the client specific information (see below sections to fully configure). Once the files have been created and placed, you need to transfer the images into their gallery specific folders under the gallery folder in the S3 bucket. You need to ensure the route structure for the site and the S3 buckets do not match. If they do, when you try to visit the page for a specific image, you will not be routed through the website. Instead you will be served the image from the S3 bucket.

Finally create the `index.html` file in the `public` folder and add the `favicon.png` as well.

[Back to Top](#table-of-contents)

### Data File Locations

In an effort to keep the repository from being tied to a specific implementation, key aspects of certain pages and their contents are reliant upon data files. In order for the application to pull the correct file update the `data-file-locations.json` file. The JSON file is an array of objects with the following properties: `configuration` and `url`.

At minimum there needs to be an entry for `navigation`, `galleries`, `home` and `notFound` (These are included in the sample file).

```JSON

[
    {
        "contentType":"{Config Type GOES HERE}",
        "url":"{URL GOES HERE}",
        "cacheAge": 900000
    },
    .
    .
    .
]

```

- `contentType`: (Required) This specifies which section of the application to configure. Currently there are four required types to define in this file. Each additional page will require its own entry.
    - `navigation`: Details where the navigation config file is located. 
    - `gallery`: Details where the gallery configuration files are located.
    - `home`: : Details where the Home Page config file is located.
    - `notFound`: : Details where the Not Found Page config file is located.
- `url`: (Required) `string` This is URL where the data file is stored.
- `cacheAge`: (Required) `number` This is used to specify how long the application should cache the results for the request is milliseconds. A good default value is about 15 minutes or 900000 milliseconds. 

[Back to Top](#table-of-contents)

### Navigation and Routing

To fully setup the site's routing and navigation, you will need to update the `routes-gallery.json`, `routes-top-level.json`, and `navigation.json` files.

The `navigation.json` [file] (#navigation-config) is the data file that details all the information needed for building the navigation bar.

Where as `routes-gallery.json` and `routes-top-level.json` are configuration files used to create the site's Routing Table see [below](#routing) for the full details.

[Back to Top](#table-of-contents)

#### Navigation

The `Header` component uses the [`data-file-locations.json`](#data-file-locations) to retrieve the `navigation.json` file. Once pulled, the application parses the file and dynamically builds out the links required for the navbar. See below for an example of the config file.

```JSON

{
    "logoAltText": "{Place Alt Text for Logo Here}",
    "backgroundColor": "altPrimary",
    "links": [
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
    ]
}

```

Definition of the `navigation.json`:

- `logoAltText`: (Required) `string` This is the Alternative Text for the main logo.
- `backgroundColor`: (Required) `string` This is responsible for the color of the navbar's background. The only values allowed are `primary`, `altPrimary`, and `none`.
- `links`: (Required) The root of the JSON response which contains an array of complex objects.
    - `url`: (Required) `string` This is the url for the route.
    - `order`: (Required) `number` This is the order used for displaying the routes.
    - `name`: (Required) `string` This is the display name for the route.
    - `title`: (Required) `string` This is the title for the link.
    - `active`: (Required) `bool` This determines if the route will be displayed.
    - `internalLink`: (Required) `bool` This determines if the link is internal to the application.
    - `social`: (Required) `bool` This determines if the link is for social media.
    - `icon`: (Optional) `string` This specifies the font awesome icon to use for social media links.
    - `childLinks`: (Optional) Is an array of complex objects, the same used within `navigation`

[Navigation and Routing](#navigation-and-routing) : [Back to Top](#table-of-contents)

#### Routing

In order to build out the Routing Tree the application requires the [`routes-gallery.json`](#gallery-routes) and [`routes-top-level.json`](#top-level-routes) files. Both files are arrays of complex objects with the following definition:

```JSON

[
    {
        "path":"/",
        "page":"home",
        "sectionRoot":true,
        "component":"home",
        "componentOptions":null,
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

Definition for Route Definition in `routes-gallery.json` and `routes-top-level.json`:

- `path`: (Required) `string` Is the route definition.
- `page`: (Required) `string` This is the page that will be rendered and it should be an empty string if the route is item specific or a redirect.
- `sectionRoot`: (Required) `bool` Tells the router that the incoming route must be an sectionRoot match.
- `component`: (Required) `string` Details the component that will be used for the route.
- `componentOptions`: (Optional) This is a complex object that configures the `Carousel` component.
    - `configSettingFile`: (Required) `string` Is the location for the gallery's configuration file.
    - `defaultPage`: (Required) `string` Is the base portion of the url for the images in the configuration file.
    - `routeToNotFoundPage`: (Required) `bool` Determines if the image gallery will route the user to the gallery's default page or the not found page when an image is not found within the collection.
    - `fontAwesomeArrowIcons`: (Optional) `string` Details the icons used for the arrows to cycle through the images in the gallery.[details](#gallery-options-for-arrows)
- `redirect`: (Optional) Is a complex object that configures a redirection route.
    - `enabled`: (Required) `bool` Tells the router that the incoming route needs to be redirected.
    - `path`: (Required) `string` Is the route to be redirected to.

[Navigation and Routing](#navigation-and-routing) : [Back to Top](#table-of-contents)

##### Top Level Routes

The `routes-top-level.json` file is consumed by the `Main`.

> `routes-top-level.json` This configuration file handles the top-level routes for the application. At minimum, you need an entry to for the Home, Galleries, and Not Found routes.

```JSON

[
    {
        "path":"/",
        "page":"home",
        "sectionRoot":true,
        "component":"Home",
        "componentOptions":null,
        "redirect":{
            "enabled":false,
            "path":""
        }
    },
    {
        "path":"/galleries/*",
        "page":"galleries",
        "sectionRoot":false,
        "component":"gallery",
        "componentOptions":null,
        "redirect":{
            "enabled":false,
            "path":""
        }
    },
    .
    .
    .
    {
        "path":"*",
        "page":"notFound",
        "sectionRoot":false,
        "component":"NotFound",
        "componentOptions":null,
        "redirect":{
            "enabled":false,
            "path":null
        }
    }
]

```

[Navigation and Routing](#navigation-and-routing) : [Back to Top](#table-of-contents)

##### Gallery Routes

The `routes-gallery.json` file is consumed by the `Gallery` component.

> `routes-gallery.json`  This configuration handles the navigation for every gallery you put on the site. You will need to have four entries per gallery for complete coverage with the following paths:

- `"path":"gallery/"`: This entry will form the base for the gallery and is a redirecting entry to the first section.
- `"path":"gallery/section/"`: This entry will load the image gallery for the given section.
- `"path":"gallery/section/:imageName"`: This entry will load the image gallery starting with a specific image. (This uses a react router placeholder for to cover dynamic routes.)
- `"gallery/:galleryName"`: This entry will be a redirecting entry that redirects all unknown sections and redirects them to where you want them. (This uses a react router placeholder for to cover dynamic routes.)

It is highly recommended that you add a final entry to redirect any non-existing galleries to one of the existing ones.

```JSON

[
    {
        "path":"gallery/",
        "page":"",
        "sectionRoot":true,
        "component":"",
        "componentOptions": null,
        "redirect":{
            "enabled":true,
            "path":"/galleries/gallery/section"
        }
    },
    {
        "path":"gallery/section/",
        "page":"section",
        "sectionRoot":false,
        "component":"carousel",
        "componentOptions": {
            "configSettingFile":"config-gallery-items.json",
            "defaultPage":"/galleries/gallery/section/",
            "routeToNotFoundPage": true,
            "fontAwesomeArrowIcons":"fas fa-arrow-circle"
        },
        "redirect":{
            "enabled":false,
            "path":""
        }
    },
    {
        "path":"gallery/section/:imageName",
        "page":"",
        "sectionRoot":false,
        "component":"carousel",
        "componentOptions": {
            "configSettingFile":"config-gallery-items.json",
            "defaultPage":"/galleries/gallery/section/",
            "routeToNotFoundPage": true,
            "fontAwesomeArrowIcons":"fas fa-arrow-circle"
        },
        "redirect":{
            "enabled":false,
            "path":""
        }
    },
    {
        "path":"gallery/:galleryName",
        "page":"",
        "sectionRoot":false,
        "component":"",
        "componentOptions": null,
        "redirect":{
            "enabled":true,
            "path":"/galleries/gallery/section"
        }
    },
    .
    .
    .
    {
        "path":"*",
        "page":"",
        "sectionRoot":false,
        "component":"",
        "componentOptions":null,
        "redirect":{
            "enabled":true,
            "path":"/galleries/gallery/section"
        }
    }
]

```

[Navigation and Routing](#navigation-and-routing) : [Back to Top](#table-of-contents)

###### Gallery Options for arrows

When filling out the `routes-gallery.json` file use the following values for the `fontAwesomeArrowIcons` field to deviate from the default pointer (`fas fa-angle`) used in the gallery. Each Gallery route can have its own defined value.

- `fas fa-angle`
- `fas fa-angle-double`
- `fas fa-arrow`
- `fas fa-arrow-alt-circle`
- `fas fa-arrow-circle`
- `fas fa-arrow-rotate`
- `fas fa-long-arrow`
- `fas fa-long-arrow-alt`
- `fas fa-caret`
- `fas fa-chevron`
- `fas fa-chevron-circle`
- `fas fa-hand-point`
- `fa-solid fa-circle`
- `fa-solid fa-square-caret`

[Routing](#routing) : [Gallery Routes](#gallery-routes) : [Back to Top](#table-of-contents)

### Content Configuration

With the [Navigation & Routing](#navigation-and-routing) configured, you need to focus on creating the Data files that are used to render the site's content. Currently there are three types of required data files: [Gallery Data Files](#gallery-data-files), [Home](#home), and the [NotFound](#not-found).

Various components will use the [`data-file-locations.json`](#data-file-locations) to dynamically pull each of these Data files and render the content.

[Back to Top](#table-of-contents)

#### Gallery Data Files

Each individual gallery will have its own Data file and the file name must begin with 'galley-' see below for an example.

```JSON

{
    "baseUrl": "{URL GOES HERE}",
    "folderName": "{Folder Name GOES HERE}",
    "pageHeader": "{Page Header GOES HERE}",
    "items": [
        {
            "title": "{Image TItle GOES HERE}",
            "altText": "{Image ALt Text GOES HERE}",
            "fileName": "{Image Filename GOES HERE}",
            "order": 1,
            "externalLink": "{External Email GOES HERE}",
            "landscape": false,
            "description": {
                "paragraphs": [
                    {
                        "text": "{Blurb GOES HERE}",
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

Definition for `gallery-{galleryName}.json`:

- `baseUrl`: (Required) `string` This is the base URL for all the images in the configuration file.
- `folderName`: (Required) `string` This is the sub-folder containing the images in the S3 bucket.
- `pageHeader`: (Required) `string` This is hte header for the gallery.
- `items`: (Required) Is an array of complex objects, but the name should be specific to the collection of images held within. (Required)
    - `title`: (Required) `string` This is the title of the image.
    - `altText`: (Required) `string` This is the alternate text for the image.
    - `fileName`: (Required) `string` This is the name of the image's file in the S3 bucket.
    - `order`: (Required) `number` This is the order used to display the image.
    - `externalLink`: (Optional) `string` This is the external link to be used for the image. If there is no external link leave empty or set to null.
    - `landscape`: (Optional) `bool` Tells the application if the image was taken using landscape view.
    - `description`: (Optional) Is a complex object.
        - `paragraphs`: (Optional) Is an array of complex objects. You can make as many of these paragraphs as you want.
            - `order`: (Required) `number` This is the paragraph's order in the description.
            - `display`: (Required) `bool` This determines if the paragraph is displayed on the web page.
            - `emphasis`: (Required) `bool` This determines if the paragraph is bolded.
            - `text`: (Required) `string` This is a paragraph for the description of the image.
            - `alignment`: (Required) `string` This determines how the text is aligned on screen.

[Content Configuration](#content-configuration) : [Back to Top](#table-of-contents)

#### Home

This page has been coded to render a collection of `Info`, `ImageSlider`, or `Image` components. Use the following Data file to tweak the layout of the `Home` page as needed for the client. To render an `Image` component only include a single image in the `images` field of the JSON. 

```JSON

{
    "name": "home",
    "header": "",
    "layout": {
        "rows": [
            {
	    	    "order": 1,
                "numberOfColumns": 1
            }
        ]
    },
    "components": [
        {
            "active": true,
            "row": 0,
            "order": 1,
            "columnPosition": "left",
            "componentType": "info",
            "paragraphs": [
                {
                    "order": 1,
                    "display": true,
                    "emphasis": false,
                    "text": "",
                    "alignment": "center"
                }
            ]
	    },
        .
        .
        .
        {
            "active": true,
            "row": 0,
            "order": 2,
            "columnPosition": "image",
            "componentType": "image",
            "imageFiles": [
                {
                    "htmlTitle": "",
                    "htmlAltText": "",
                    "fileName": "",
                    "externalUrl": "",
                    "landscape": false,
                    "imageUrl": "",
                    "description": null
                }
            ],
            "imageSlider": {
                "auto":true,
                "timer":30000,
                "arrowIcons": "fas fa-chevron-circle",
                "size": "70%"
            }
        }
    ]
}

```

Definition for `page-{PageName}.json`:

- `name`: (Required) `string` This is the name of the page being configured.
- `header`: (Required) `string` This is the header for the page.
- `layout`: (Required) This is the root node of the configuration file.
    - `rows`: (Required) This is an array of complex object that detail the setup for each row.
        - `order`: (Required) `number` Determines the order and key for the array of rows.
        - `numberOfColumns`: (Required) `number` Details how many columns to render.
- `components`: (Required) A complex array of objects that details the types of components to dynamically render on the home page.
    - `active`: (Required) `boolean` Determines if the component will be rendered. 
    - `row`: (Required) `number` This tells which row the component belongs too.
    - `order`: (Required) `number` Determines the order of the component.
    - `columnPosition`: (Required) `string` Determines which column the component should be rendered in (defaults to left).
    - `componentType`: (Required) `string` Determines the type of component to render. It must be either `info` or `image`.
    - `paragraphs`: (Optional) An array of complex objects that specify what text should be rendered in the component.
        - `order`: (Required) `number` Determines the order of the paragraphs.
        - `display`: (Required) `boolean` Determines if the paragraph will be rendered.
        - `emphasis`: (Optional) `boolean` Determines if the paragraph will be bolded.
        - `text`: (Required) `string` The text to be rendered on the page.
        - `alignment`: (Optional) `string` Determines the alignment of the text.
    - `imageFiles`: (Optional) An array of complex objects consisting of the images to display.
        - `htmlTitle`: (Required) `string` This will be used for the title of the rendered image.
        - `htmlAltText`: (Required) `string` This will be used for the alternate text of the rendered image.
        - `fileName`: (Required) `string` This is the name of the file to be rendered and is used to build the image's url. 
        - `externalUrl`: (Optional) `string` Used to make the image a link to another location on the internet.
        - `landscape`: (Optional) `boolean` Used to adjust the display of narrow images.
        - `imageUrl`: (Optional) `string` This is the base url for the images, only used when rendering images.
        - `description`: (Optional) An array of complex objects that specify what text should be rendered in the component.
            - `order`: (Required) `number` Determines the order of the paragraphs.
            - `display`: (Required) `boolean` Determines if the paragraph will be rendered.
            - `emphasis`: (Optional) `boolean` Determines if the paragraph will be bolded.
            - `text`: (Required) `string` The text to be rendered on the page.
            - `alignment`: (Optional) `string` Determines the alignment of the text.
    - `imageSlider`: (Optional) This is used when rendering images.
        - `auto`: (Required) `boolean` Turns the automatic transition on or off.
        - `timer`: (Required) `number` If configured this establishes the timer for the transition.
        - `arrowIcons`: (Optional) `string` This specifies what arrows will be used when building the `ImageSlider`. See [Gallery Options for arrows](#gallery-options-for-arrows) for arrows to see the options available from Font Awesome.
        - `size`: (Optional) `string` Determines the size of the rendered image(s)

[Content Configuration](#content-configuration) : [Back to Top](#table-of-contents)

#### Not Found

This page will use the `page-notfound.json` Data file and will build out the custom Not Found page.

### Misc Content

The following sections detail the instructions to complete setting up a site for a new client, including working with the [Index Pages](#index-pages), [Logo](#logo), [Footer](#footer-config), and [CSS](#css-config).

#### Index Pages

In order to keep this project from becoming tied to a specific client, the `index.html` and `index.scss` files have been removed from the repository and added to the do not track list. As a result once you clone the repo, you will need to recreate these two files, see below for examples. 

[HTML](#html) : [SCSS](#scss)

##### HTML

The `index.html` requires one element with the id of root in order to work. See the included example for a starting point.

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

[Misc Content](#misc-content) : [Index Pages](#index-pages) : [Back to Top](#table-of-contents)

##### SCSS

With the `index.html` file created, you can turn to the `index.scss` file. At minimum you need to style include the following:

```scss

@import "./Configs/Variables.scss";

body {
    @include htmlBodyBackground();
}

```

As written above the resulting site will have a solid background. If instead you want to use a background image add the photo's url, i.e. `'https://www.sample.com/test/test.jpg'` as a parameter.

```scss

    @include htmlBodyBackground($fileName: 'https://www.sample.com/test/test.jpg');

```

```scss

    @include htmlBodyBackground($gradient: 'linear-gradient(90deg, rgba(230,235,235,1) 0%, rgba(103,104,104,1) 15%, rgba(9,8,8,1) 50%, rgba(103,104,104,1) 85%, rgba(230,235,235,1) 100%)');

```

In order to build the gradient you can use the [CSS Gradient](https://cssgradient.io/) tool. Once you have designed the gradient you want, you can copy the resulting snippet of CSS and insert it into the `htmlBodyBackground` mixin as seen above.

[Misc Content](#misc-content) : [Index Pages](#index-pages) : [Back to Top](#table-of-contents)

#### Logo

You will need two logo images, one for use on desktops and a second for use on mobile.

##### Desktop Version:
Add the main Logo for the site (saved as a png with a resolution of 260x105) to the assets folder with the name `Logo.png`. 

##### Mobile Version:
Add the mobile Logo for the site (saved as a png with a resolution of 130x105) to the assets folder with the name `LogoAlt.png`. 

[Misc Content](#misc-content) : [Back to Top](#table-of-contents)

#### Footer Config

Create a `footer.json` file with the following structure.

```JSON

{
    "fontColor": "secondary",
    "copyrightInfo": {
        "name": "{Crafter Name GOES HERE}",
        "url": "{URL GOES HERE}",
        "title": "{Title GOES HERE}"
    },
    "siteDesignInfo": {
        "display":true,
        "name":"{Site Designer GOES HERE}",
        "url": "{URL GOES HERE}",
        "title": "{Title GOES HERE}"
    }
}

```

- `fontColor`: (Required) `string` This field determines the footer's font color. There are only two valid options are `primary` and `secondary`. 
- `copyrightInfo`: (Required) A complex object used to configure the copyright section of the footer.
    - `name`: (Required) `string` This is the crafter's name.
    - `url`: (Optional) `string` This is used a url for the crafter. If empty the name will NOT be a link.
    - `title`: (Optional) `string` This is the title for the link. If the url is empty or null this will not be used. 
- `siteDesignInfo`: (Required) A complex object to configure the site designer section of the footer.
    - `display`: (Required) `bool` Determines if the site designer information will be displayed.
    - `name`: (Required) `string` This is the site designer's name.
    - `url`: (Optional) `string` This is used a url for the site designer. If empty the name will NOT be a link.
    - `title`: (Optional) `string` This is the title for the link. If the url is empty or null this will not be used.

[Misc Content](#misc-content) : [Back to Top](#table-of-contents)

#### CSS Config

Since this project depends on SASS have a unified theme that is not committed to the repository, you will have to create `Variables.scss` file and configure it for [Color Palette](#color-palette), [Font Colors](#font-color), [Font Selection](#font-selection), and [Site Mixins](#site-mixins)

##### Color Palette

This section details the main color scheme of the website.

```SCSS

// Color Palette
$primaryColor: #ffffff;
$altPrimaryColor: #f1fcff44;
$secondaryColor: #6c757d;
$secondaryColorDimmed: #6c757d80;
$accentColor: #23e6ef;
$accentColorDimmed: #23e6ef73;
$navLinkColor: #6c757d;
$altNavLinkColor: #50555a;

```

- `$primaryColor`: This takes care of the background color for the `Card` Component
- `$secondaryColor`: This takes care of the background color for the `body` element
- `$secondaryColorDimmed`: This takes care of the background color of the thumbnail bar
- `$accentColor`: This takes care of the Highlight Color, used for thin borders, the nav link's font pop, etc...
- `$accentColorDimmed`: This takes care of the box shadow
- `$navLinkColor`: This takes care of the background color for the nav links
- `$altNavLinkColor`: This takes care of the hover color for the nav links

[Misc Content](#misc-content) : [CSS Config](#css-config) : [Back to Top](#table-of-contents)

##### Font Color

This details the color scheme for the font used throughout the site.

```SCSS

// Font Colors
$navFontColor: #ffffff;
$fontColor: #000000;
$secondaryFontColor: #ffffff;
$notFoundPrimaryColor: #40e6ef;
$notFoundSecondaryColor: #243ebd;

```

- `$navFontColor`: This takes care of the primary font color for the nav links 
- `$fontColor`: This takes care of the primary font color for text on the page
- `$notFoundPrimaryColor`: The default link color on the not found page
- `$notFoundSecondaryColor`: The hover link color on the not found page

[Misc Content](#misc-content) : [CSS Config](#css-config) : [Back to Top](#table-of-contents)

##### Font Selection

This details the font family used throughout the site.

```SCSS

// Font Selection
$headerFont: 'Shadows Into Light Two', cursive;
$linkFont: 'Shadows Into Light Two', cursive;
$defaultFont: 'Shadows Into Light Two', cursive;

```

- `$headerFont`: This takes care of the font family for the header
- `$linkFont`: This takes care of the font family for the Links
- `$defaultFont`: This takes care of the font family for the page

[Misc Content](#misc-content) : [CSS Config](#css-config) : [Back to Top](#table-of-contents)

##### Site Mixins

This section contains all the mixins for the site. Currently there is only one used for the site background.

```SCSS

@mixin htmlBodyBackground ($fileName:"", $gradient:""){
    font-family: $defaultFont;
    margin: 0;

    @if $fileName == "" and $gradient == "" {
        background-color: $secondaryColor;
    }
    @else if $fileName != "" and $gradient == "" {
        background-image: url(#{$fileName});
        background-size: cover;
        background-position: center;
    }
    @else {
        background: #{$gradient};
    }
}

```
[Misc Content](#misc-content) : [CSS Config](#css-config) : [Back to Top](#table-of-contents)

### SEO Configuration

The images held within the galleries will have their SEO data built from the data files powering the given gallery. However, for best results all pages should have certain elements in the `<head>` section of the page.

So, for those static pages you will need a `seo-config.json` file. You will need one entry for each static page to be served. 

```JSON

{
    "site": "{Site name GOES Here}",
    "pageSettings": [
        {
            "page": "home",
            "title": "{Title GOES HERE}",
            "description": "{Description GOES HERE}",
            "imageUrl": "{Image URL GOES HERE}",
            "imageAltText": "{Image AltText GOES HERE}",
            "errorPage": false
        },
        {
            "page": "notFound",
            "title": "{Title GOES HERE}",
            "description": "{Description GOES HERE}",
            "imageUrl": "{Image URL GOES HERE}",
            "imageAltText": "{Image AltText GOES HERE}",
            "errorPage": false
        }
    ]
}

```

- `site`: (Required) This is used to set the Open Graph site name meta tag.
- `pageSettings`: (Required) This is an array of complex objects that will configure the meta tags for static pages in the site.
    - `page`: (Required) `string` This is the page that uses the rest of the values.
    - `title`: (Required) `string` This is used to set the page's title and Open Graph title meta tags.  
    - `description`: (Required) `string` This is used to set the page's description meta tag.
    - `imageUrl`: (Required) `string` This is used to set the image, Open Graph image and secure image, and the Twitter image meta tags.
    - `imageAltText`: (Required) `string` This is used to set the twitter alternate text meta tag. 
    - `errorPage`: (Required) `boolean` This tells the system if the page requires additional error information.

[Back to Top](#table-of-contents)

### Google Analytics

In order to connect the website to Google Analytics, you must first create the site's `index.html` file. After that you will need to create or log into a Google analytics account. Once there you will have to create the new property. Copy the `Global site tag` section from  the `Tagging Instructions` heading and paste it into the `<head>` section of the new site's `index.html` file.

[Back to Top](#table-of-contents)

## Available Scripts

In the project directory, you can run:

### Start

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Test

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Run Build

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Run Eject

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

[Back to Top](#table-of-contents)

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

### Build fails to minify

If `npm run build` fails to minify, you should check out this section: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

[Back to Top](#table-of-contents)
