# Crafter Gallery Site

A simple gallery site created and designed for crafters so they can display their wares. This is a [React](https://reactjs.org/) application bootstrapped using [Create React App](https://create-react-app.dev/). Instead of reaching out to a database, or back-end service, this application uses configuration files for everything from the navigation to the galleries and their contents. 

## Table of Contents

- [Site Configuration](#site-configuration)
    - [File Config Urls](#file-config-urls)
    - [Navigation and Routing](#navigation-and-routing)
        - [Navigation Config](#navigation-config)
        - [Route Config](#route-configs)
            - [Top Level Routes](#top-level-routes)
            - [Gallery Routes](#gallery-routes)
                - [Gallery Options for arrows](#gallery-options-for-arrows)
    - [SEO Configuration](#seo-configuration)
    - [Content Configuration](#content-configuration)
        - [Gallery Config](#gallery-configs)
        - [Home Config](#home-config)
        - [Not Found Config](#not-found-config)
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

After cloning this repository for a new client, there are several things that need to be done in order to get a new site up and running. First the Navigation and Gallery Configuration Files need to be created and placed into the configs folder in the S3 bucket. Once the files have been created and placed, you need to transfer the images into their gallery specific folders under the gallery folder in the S3 bucket. 

You need to ensure the route structure for the site and the S3 buckets do not match. If they do, when you try to visit the page for a specific image, you will not be routed through the website. Instead you will be served the image from the S3 bucket.

With that done you will have to configure the Routes, the SCASS variables, and create the `index.html` file.

The application is built with Sass so you will need something to compile the CSS files. For Visual Studio you can use a couple of extensions [Saas](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) & [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)

(There is a folder within config that contains sample configuuration files that will satisfy the vast majority of the  site's configuration.)

[Back to Top](#table-of-contents)

### File Config Urls

In an effort to keep the repository from being tied to a specific implementation, the `ConfigFileLocations.json` was created. It is an array of object with a `configuration` and `url` attribute.

```JSON

{
    "configuration":"Config Type Goes Here",
    "url":"URL Goes Here"
}

```

There are four required types:

- `navigation`: Details where the navigation config file is located. 
- `gallery`: Details where the gallery configuration files are located.
- `home`: : Details where the Home Page config file is located.
- `notFound`: : Details where the Not Found Page config file is located.

```JSON

[
    {
        "configuration":"navigation",
        "url":"https://www.example.com/configs/config-navigation.json"
    },
    {
        "configuration":"gallery",
        "url":"https://www.example.com/configs/"
    },
    {
        "configuration":"home",
        "url":"https://www.example.com/configs/config-page-home.json"
    },
    {
        "configuration":"notFound",
        "url":"https://www.example.com/configs/config-page-notFound.json"
    }
]

```

[Back to Top](#table-of-contents)

### Navigation and Routing

In addition to the `config-navigation` file [see above](#file-config-urls) which contains all the definitions for the links in the navigation, there are two additional files that define and create the application's Route Tree, `GalleryRoutes.json` and `TopLevelRoutes.json`. 

[Navigation Config](#navigation-config) : [Route Config](#route-configs) : [Back to Top](#table-of-contents)

#### Navigation Config

Once retrieved, the application parses the JSON file and dynamically builds out the links for the navbar. See below for an example of the config file.

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

Definition of the `config-navigation`:

- `navigation`: (Required) The root of the JSON response which contains an array of complex objects.
    - `url`: (Required) `string` This is the url for the route.
    - `order`: (Required) `number` This is the order used for displaying the routes.
    - `name`: (Required) `string` This is the display name for the route.
    - `title`: (Required) `string` This is the title for the link.
    - `active`: (Required) `bool` This determines if the route will be displayed.
    - `internalLink`: (Required) `bool` This determines if the link is internal to the application.
    - `social`: (Required) `bool` This determines if the link is for social media.
    - `icon`: (Optional) `string` This specifies the font awesome icon to use for social media links.
    - `childLinks`: (Optional) Is an array of complex objects, the same used within `navigation`
- `logoAltText`: (Required) `string` This is the Alternative Text for the main logo.

[Navigation and Routing](#navigation-and-routing) : [Back to Top](#table-of-contents)

#### Route Configs

In conjunction with the `config-navigation.json` file this application uses two local JSON files to create its Routing tree: `TopLevelRoutes.json` [details](#top-level-routes) & `GalleryRoutes.json` [details](#gallery-routes).

[Top Level Routing](#top-level-routes) : [Gallery Routing](#gallery-routes) : [Back to Top](#table-of-contents)


Both files are arrays of complex objects with the following definition:

```JSON

[
    {
        "path":"/",
        "sectionRoot":true,
        "component":"home",
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

Definition for Route Definition in `TopLevelRoutes.json` and `GalleryRoutes.json`:

- `path`: (Required) `string` Is the route definition.
- `sectionRoot`: (Required) `bool` Tells the router that the incoming route must be an sectionRoot match.
- `component`: (Required) `string` Details the component that will be used for the route.
- `componentOptions`: (Optional) This is a complex object that configures the `Carousel` component.
    - `configSettingFile`: (Required) `string` Is the location for the gallery's configuration file.
    - `defaultPage`: (Required) `string` Is the base portion of the url for the images in the configuration file.
    - `routeToNotFoundPage`: (Required) `bool` Determines if the image gallery will route the user to the gallery's default page or the not found page when an image is not found within the collection.
    - `fontAwesomeArrowIcons`: (optional) `string` Details the icons used for the arrows to cycle through the images in the gallery.[details](#gallery-options-for-arrows)
- `status`: (Optional) `number` This number is used when a required route needs a different status code.
- `redirect`: (Optional) Is a complex object that configures a redirection route.
    - `enabled`: (Required) `bool` Tells the router that the incoming route needs to be redirected.
    - `path`: (Required) `string` Is the route to be redirected to.

[Navigation and Routing](#navigation-and-routing) : [Back to Top](#table-of-contents)

##### Top Level Routes

The `Main` component consumes this configuration file and uses it to define the top level of the Route Tree.

> `TopLevelRoutes.json` This configuration file handles the top-level routes for the application. At minimum, you need an entry to for the Home, Galleries, and Not Found routes.

```JSON

[
    {
        "path":"/",
        "sectionRoot":true,
        "component":"Home",
        "componentOptions":null,
        "status":200,
        "redirect":{
            "behavior":false,
            "path":""
        }
    },
    {
        "path":"/galleries/*",
        "sectionRoot":false,
        "component":"gallery",
        "componentOptions":null,
        "status":200,
        "redirect":{
            "behavior":false,
            "path":""
        }
    },
    .
    .
    .
    {
        "path":"*",
        "sectionRoot":false,
        "component":"NotFound",
        "componentOptions":null,
        "status":404,
        "redirect":{
            "behavior":false,
            "path":null
        }
    }
]

```

[Route Config](#route-configs) : [Back to Top](#table-of-contents)

##### Gallery Routes

The `Gallery` component pulls this configuration file to establish the routes for all the galleries in the application.

> `GalleryRoutes.json`  This configuration handles the navigation for every gallery you put on the site. You will need to have four entries per gallery for complete coverage with the following paths:

- `"path":"gallery/"`: This entry will form the base for the gallery and is a redirecting entry to the first section.
- `"path":"gallery/section/"`: This entry will load the image gallery for the given section.
- `"path":"gallery/section/:imageName"`: This entry will load the image gallery starting with a specific image. (This uses a react router placeholder for to cover dynamic routes.)
- `"gallery/:galleryName"`: This entry will be a redirecting entry that redirects all unknown sections and redirects them to where you want them. (This uses a react router placeholder for to cover dynamic routes.)

It is highly recommended that you add a final entry to redirect any non-existing galleries to one of the existing ones.

```JSON

[
    {
        "path":"gallery/",
        "sectionRoot":true,
        "component":"",
        "componentOptions": null,
        "status":null,
        "redirect":{
            "behavior":true,
            "path":"/galleries/gallery/section"
        }
    },
    {
        "path":"gallery/section/",
        "sectionRoot":false,
        "component":"carousel",
        "componentOptions": {
            "configSettingFile":"config-gallery-items.json",
            "defaultPage":"/galleries/gallery/section/",
            "routeToNotFoundPage": true,
            "fontAwesomeArrowIcons":"fas fa-arrow-circle"
        },
        "status":null,
        "redirect":{
            "behavior":false,
            "path":""
        }
    },
    {
        "path":"gallery/section/:imageName",
        "sectionRoot":false,
        "component":"carousel",
        "componentOptions": {
            "configSettingFile":"config-gallery-items.json",
            "defaultPage":"/galleries/gallery/section/",
            "routeToNotFoundPage": true,
            "fontAwesomeArrowIcons":"fas fa-arrow-circle"
        },
        "status":200,
        "redirect":{
            "behavior":false,
            "path":""
        }
    },
    {
        "path":"gallery/:galleryName",
        "sectionRoot":false,
        "component":"",
        "componentOptions": null,
        "status":200,
        "redirect":{
            "behavior":true,
            "path":"/galleries/gallery/section"
        }
    },
    .
    .
    .
    {
        "path":"*",
        "sectionRoot":false,
        "component":"",
        "componentOptions":null,
        "status":200,
        "redirect":{
            "behavior":true,
            "path":"/galleries/gallery/section"
        }
    }
]

```

[Route Config](#route-configs) : [Gallery Routes](#gallery-routes) : [Back to Top](#table-of-contents)

###### Gallery Options for arrows

When filling out the Gallery Route configuration use the following values for the `fontAwesomeArrowIcons` field to deviate from the default pointer (`fas fa-angle`) used in the gallery. Each Gallery route can have its own defined value for the `fontAwesomeArrowIcons`.

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

[Route Config](#route-configs) : [Gallery Routes](#gallery-routes) : [Back to Top](#table-of-contents)

### SEO Configuration

In order to configure the site for SEO you will need a `SeoConfig.json` file for the static pages in the site. You will need an entry for each static page that will be served. 

```JSON

{
    "site": "Handmade Hijinks",
    "pageSettings": [
        {
            "page": "home",
            "title": "{Title Goes Here}",
            "description": "{Description Goes Here}",
            "imageUrl": "{Image URL Goes Here}",
            "imageAltText": "{Image AltText Goes Here}"
        },
        {
            "page": "notFound",
            "title": "{Title Goes Here}",
            "description": "{Description Goes Here}",
            "imageUrl": "{Image URL Goes Here}",
            "imageAltText": "{Image AltText Goes Here}"
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

[Back to Top](#table-of-contents)

### Content Configuration

With the [Navigation & Routing](#navigation-and-routing) configured, you need to focus on creating the config files that power the Site's content. Currently there are three types of required config files: [Gallery Configs](#gallery-configs), [Home Config](#home-config), and the [NotFound Config](#not-found-config).

Each type of file will be hosted online and pulled into the application while running, which will allow for dynamically updating these pages.

[Back to Top](#table-of-contents)

#### Gallery Configs

These files contain all the required infomation to generate a specific image gallery. You will a seperate configuration file for every requested gallery.

```JSON

{
    "baseUrl": "URL Goes Here",
    "folderName": "Folder Name Goes Here",
    "pageHeader": "Header Title Goes Here",
    "items": [
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

Definition for `config-{galleryName}.json`:

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
            - `display`: (Required) `bool` This determins if the paragraph is displayed on the web page.
            - `emphasis`: (Required) `bool` This determins if the paragraph is bolded.
            - `text`: (Required) `string` This is a paragraph for the description of the image.
            - `alignment`: (Required) `string` This determins how the text is aligned on screen.

[Content Configuration](#content-configuration) : [Back to Top](#table-of-contents)

#### Home Config

This page is written to use a collection of `Info`, `ImageSlider`, or `Image` components. Use the following configuration file to tweak the layout of the `Home` page as needed for a client's request. To render an `Image` component only include a single image in the `images` field of the JSON. 

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
                            "emphasis" : true,
                            "text": "TEXT Goes Here",
                            "alignment": "Alignment Goes Here"
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
                        "timer":30000,
            			"arrowIcons": "Font Awsome Arrow Info Goes Here"
                    }
                }
            ]
        }
    }
}

```

Definition for `config-page-home.json`:

- `layout`: (Required) This is the root node of the configuration file.
    - `columns`: (Required) A complex object that details how the columns will be rendered on the home page.
        - `number`: (Required) `number` Details how many columns to render.
        - `components`: (Required) A complex array of objects that details the types of components to dynamically render on the home page.
            - `active`: (Required) `boolean` Determines if the component will be rendered. 
            - `order`: (Required) `number` Determines the order of the component.
            - `component`: (Required) `string` Tells the home page what component to render. It must be either `info` or `image`.
            - `paragraphs`: (Optional) An array of complex objects that specify what text should be rendered in the component.
                - `order`: (Required) `number` Determines the order of the paragraphs.
                - `display`: (Required) `boolean` Determines if the paragraph will be rendered.
                - `emphasis`: (Optional) `boolean` Determines if the paragraph will be bolded.
                - `text`: (Required) `string` The text to be rendered on the page.
                - `alignment`: (Optional) `string` Determines the alignment of the text.
            - `images`: (Optional) An array of complex onjects consisting of the images to display.
                - `title`: (Required) `string` This will be used for the title of the rendered image.
                - `altText`: (Required) `string` This will be used for the alternate text of the rendered image.
                - `fileName`: (Required) `string` This is the name of the file to be rendered and is used to build the image's url. 
                - `order`: (Required) `number` Determines the order of the images.
                - `externalLink`: (Optional) `string` Used to make the image a link to another location on the internet.
                - `landscape`: (Optional) `boolean` Used to adjust the display of narrow images.
            - `baseUrl`: (Optional) `string` This is the base url for the images, only used when rendering images.
            - `slider`: (Optional) This is used when rendering images.
                - `auto`: (Required) `boolean` Turns the automatic transition on or off.
                - `timer`: (Required) `number` If configured this establishes the timer for the transition.
                - `arrowIcons`: (Optional) `string` This specifies what arrows will be used when building the `ImageSlider`. See [Gallery Options for arrows](#gallery-options-for-arrows) for arrows to see the options available from Font Awesome.
                - `size`: (Optional) `string` Determines the size of the rendered image(s)

[Content Configuration](#content-configuration) : [Back to Top](#table-of-contents)

#### Not Found Config

Upon consumption the `config-page-notfound.json` file will be used to build out the custom Not Found page. Currently, if you include an image, it will be inserted after the first paragraph.

```JSON

{
    "paragraphs" : [
        {
            "order": 1,
            "display": true,
            "emphasis" : true,
            "text": "Text Goes Here",
            "alignment": "Alignment Goes Here"
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

Definition for `config-page-home.json`:

- `paragraphs`: (Required) An array of complex objects that specify what text should be rendered in the component.
    - `order`: (Required) `number` Determines the order of the paragraphs.
    - `display`: (Required) `boolean` Determines if the paragraph will be rendered.
    - `emphasis`: (Optional) `boolean` Determines if the paragraph will be bolded.
    - `text`: (Required) `string` The text to be rendered on the page.
    - `alignment`: (Optional) `string` Determines the alignment of the text.
- `images`: (Optional) A complex onjects for an image.
    - `title`: (Required) `string` This will be used for the title of the rendered image.
    - `altText`: (Required) `string` This will be used for the alternate text of the rendered image.
    - `fileName`: (Required) `string` This is the name of the file to be rendered and is used to build the image's url. 
    - `order`: (Required) `number` Determines the order of the images.
    - `externalLink`: (Optional) `string` Used to make the image a link to another location on the internet.
    - `landscape`: (Optional) `boolean` Used to adjust the display of narrow images.

[Back to Top](#table-of-contents)

### Misc Content

The following sections detail the instructions to complete setting up a site for a new client, including working with the [Index Pages](#index-pages), [Logo](#logo), [Footer](#footer-config), and [CSS](#css-config).

#### Index Pages

In order to keep this project from becoming tieds to a specific client, the `index.html` and `index.scss` files have been removed from the repository and added to the do not track list. As a result once you clone the repo, you will need to recreate these two files, see below for examples. 

[HTML](#html) : [SCSS](scss)

##### HTML

The `index.html` requires one element with the id of root in order to work. See the indcluded example for a starting point.

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
    @include background();
}

```

As written above the resulting site will have a solid background. If instead you want to use a background image add the photo's url, i.e. `'https://www.sample.com/test/test.jpg'` as a paramater.

```scss

@include background('https://www.sample.com/test/test.jpg');

```

[Misc Content](#misc-content) : [Index Pages](#index-pages) : [Back to Top](#table-of-contents)

#### Logo

You will need two logo images, one for use on desktops and a second for use on mobile.

##### Desktop Version:
Add the main Logo for the site (saved as a png) to the assets folder with the name `Logo.png`. 

##### Mobile Version:
Add the mobile Logo for the site (saved as a png) to the assets folder with the name `LogoAlt.png`. 

[Misc Content](#misc-content) : [Back to Top](#table-of-contents)

#### Footer Config

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
$secondaryColor: #6c757d80;
$highlightColor: #23e6ef;
$highlightColorDimmed: #23e6ef73;
$navLinkColor: #6c757d;
$altNavLinkColor: #50555a;
$thumbnailColor: #bac2c980;

```

- `$primaryColor`: This takes care of the background color for the `Card` Component
- `$secondaryColor`: This takes care of the background color for the `body` element
- `$highlightColor`: This takes care of the Highlight Color, used for thin borders, the nav link's font pop, etc...
- `$highlightColorDimmed`: This takes care of the box shadow
- `$navLinkColor`: This takes care of the background color for the nav links
- `$altNavLinkColor`: This takes care of the hover color for the nav links
- `$thumbnailColor`: This takes care of the background color of the thumbnail bar

[Misc Content](#misc-content) : [CSS Config](#css-config) : [Back to Top](#table-of-contents)

##### Font Color

This details the color scheme for the font used throughout the site.

```SCSS

// Font Colors
$navFontColor: #ffffff;
$fontColor: #000000;
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
$titleFont: 'Shadows Into Light Two', cursive;
$defaultFont: 'Shadows Into Light Two', cursive;

```

- `$headerFont`: This takes care of the font family for the header
- `$titleFont`: This takes care of the font family for the title
- `$defaultFont`: This takes care of the font family for the page

[Misc Content](#misc-content) : [CSS Config](#css-config) : [Back to Top](#table-of-contents)

##### Site Mixins

This section contains all the mixins for the site. Currently there is only one used for the site background.

```SCSS

// Site Mixins
@mixin background ($fileName:""){
    font-family: $defaultFont;
    margin: 0;

    @if $fileName == ""{
        background-color: $secondaryColor;
    }
    @else {
        background-image: url(#{$fileName});
        background-size: cover;
        background-position: center;
    }
}

```
[Misc Content](#misc-content) : [CSS Config](#css-config) : [Back to Top](#table-of-contents)

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
