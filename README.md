# Tutorial: Frontend Development

![](https://raw.githubusercontent.com/bilo-io/tutorials/master/Logos/FED/fed-logo-dark.png)

Have you ever wanted to start building frontend web applications, but always hit a road block at one point or another? If you have experienced the pain of constantly reloading an `index.html` page to see your changes? Is it possible that you don't even know how to get started? Perhaps you already have a basic project set up, but you don't know how to bundle it for production?

This article is a guide to conquering all the caveats mentioned above. I will begin with a basic project structure, using NodeJS and Webpack.

### Goals

There are certain goals set out, which will be accomplished by the end of this article. The purpose of this article is for a frontend developer:

- to have a webapp that dynamically reloads while changes happen in files during development
- to easily accomplish tasks with command line scripts (e.g. install dependencies, start app, create prod build, etc.)
- to use a package manager for 3rd party libraries
- to use a module and application bundler

As such this tutorial is structured in the following logical flow:

1. **Project Structure** - The a basic, manageable folder structure we will create throughout the tutorial.

2. **Example WebApp** - A basic web application consisting of the minimal amount of files.

3. [**Node**](#3.-node) - Adding a package manager, dependencies, and a server to serve up the webapp.

4. **Webpack** - Adding a webapp bundler, allowing for development mode and production packaging.


# 1. Project Structure

We will have a very simple, yet manageable project structure. If you are following along with the tutorial, create your root project folder (e.g. `tut-fed`, from here on referred to as `root`) as follows:
```sh
tut-fed/                    # project root
├───dist/                   # prod app bundle
├───node_modules/           # node dependencies
├───src/                    # webapp source code
│   │
│   ├───app.js              # application logic
│   ├───index.html          # entry point to app
│   └───style.css           # styles for app appearance
│
├───package.json            # node package file
├───server.js               # serves webapp in prod
└───webpack.config.js       # webpack config for bundling
```
 The table below explains each of these files, and in the rest of the article we construct this structure in a comprehensive set of steps.

|File | Purpose |
|:-----|:--------|
| `package.json`| a Node package file, listing the webapp's dependencies, command line scripts, etc.|
|`server.js`| serves the webapplication in the `dist` folder|
|`webpack.config.js`| Webpack configuration file for bundling the application|
| `src/`      | source folder of the webapp, containing at the very least an `index.html` |
| `dist/`| (generated) distribution folder, which contains the production package |
|`artifact/`| (generated) application package with server, to test prod deployment locally|
|`node_modules/`| (generated) Node dependencies, 3rd party packages the webapp requires to function|

For now, let's focus on the contents of the `src` folder. 

# 2. Example WebApp

We will begin this tutorial with a simple `index.html` file as the entry point of the application. Create this in the `src` folder of your project root. NOTE: you can easily convert images to `.ico` for the tab icon in your browser, using [icoconvert.com](http://icoconvert.com/).

`root/src/index.html`:
```html
<!DOCTYPE html>
<html>

    <head>
        <title>Frontend Dev</title>
        <!--Icon-->
        <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico" />
        <!--Font-->
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Quicksand" />
        <!--Styles-->
        <link rel="stylesheet" href="./style.css" />
        <!--Javascript-->
        <script src="./app.js"></script>
    </head>

    <body>
        <div id="app">
            <div class="app-titlebar">
                <img src="./favicon.ico" />
                <label>FED Tutorial 101</label>
            </div>
            <div class="app-content">
                <p>Hello FEDs,</p>
                <p>Now you know how to make a basic web site.</p>
            </div>
        </div>
    </body>

</html>
```

Open the `index.html` file in a browser and you should see the message "Hello FEDs" displayed in the window. To customize the appearance, add style file to accompany the styles the header `h1`. You can also apply many other style updates with CSS, for example box-shadow, for which I use this [Box Shadow Generator]](http://www.cssmatic.com/box-shadow).

`src/style.css`:
```css
body {
    color: #00adee;
    background: #1e1e1e;
    padding: 1em;
}

img {
    width: 2rem;
    height: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 1rem;
}

label {
    font-size: 1.5rem;
    line-height: 4rem;
}

#app {
    font-family: Quicksand, sans-serif;
}

.app-titlebar {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    height: 4rem;
    width: 100vw;
    -webkit-box-shadow: 0px 6px 20px -5px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 6px 20px -5px rgba(0,0,0,0.75);
    box-shadow: 0px 6px 20px -5px rgba(0,0,0,0.75);
    z-index: 1;
}

.app-content {
    position: fixed;
    top: 4rem;
    left: 0;
    height: calc(100vh - 4rem);
    width: 100vw;
    background: #eee;
    color: #333;
    padding: 1rem;
}
```

Refresh the page, and you should see the header style has changed. This is a minimal example of a webapp, which will be used and edited throughout the rest of the article.


# 3. Node

The first thing you should probably do is make your application a Node package, if you haven't done so already. This will be useful with installing dependencies using the [Node Package Manager](), as well as running scripts to perform certain tasks with the webapp.

In the root of your application run the following command, and enter all required prompts (author name, etc.):

- `npm init`


Next, we will add [Express]() to serve the webapp locally on a port. To install Express, run:

- `npm install express --save`

> **NOTE:** 
>   - `npm install` adds the specified libraries to the `node_modules` directory. 
> - the `--save` flag saves the dependency in the `dependencies` node in `packages.json`.
> - the `--save-dev` flag saves the dependency in the `devDependencies` node in `package.json`

Now we need to serve up the folder containing the webapp, for which we need to a `server.js` file.

`root/server.js`:
```javascript
var express = require('express');
var server = express();

let port = process.env.port || 6565;
server.use(express.static(__dirname + '/src/'));
server.listen(port, '0.0.0.0');
console.log('...listening on port: ' + port);
```

You can test this file by running the following command in your terminal:
- `node server.js`
The terminal should say `... listening on port 6565`, so try opening [http://localhost:6565](http://localhost:6565) in your browser, and you should see the webapp.

Lastly, let's make use of the npm scripts. Make the following update to

`package.json`:
```javascript
{
    // ...
    "scripts": {
        "serve": "node server.js"
    },
    // ...
    "dependencies" : {
        // libraries used for the prod version ... need to be installed in prod
    },
    // ...
    "devDependencies" : {
        // libraries required by the app ... added to production bundle/package
    }
}
```

Now you should accomplish the same effect by using the following terminal command:

- `npm run serve`


Furthermore, in the `package.json` you can add additional, **named** scripts, that automate arbitrary tasks. We will get to this after **Webpack** has been fully integrated, and providing us with the ability to easily create an application bundle.

# 4. Webpack

Webpack is useful for bundling your application for production. You can include a variety of file extensions in your app, and these can be loaded with `loader` plugins for Webpack. Furthermore, you can run your app in continuous development mode, such that the app is recompiled when edits take place. Let's get started!

## Overview of webpack

![](./docs/fig-webpack.png)

## Setup Webpack

Make sure to have Webpack installed globally:

- `npm install -g webpack`

Install webpack and the [`webpack-dev-server`]():

- `npm install webpack webpack-dev-server --save-dev`

It is recommended to install the [`webpack-dev-server`]():

- `npm install webpack-dev-server --save-dev`

Another useful tool is the [`webpack-bundle-analyzer`]():
- `npm install webpack-bundle-analyzer --save-dev`

And that's it... now you're good to go.

>**NOTE**: we installed all of the above to the dev dependencies, because they are only used for development and to bundle the application. The production bundle does not need any of these dependencies, as it only needs to serve up the application code, and all `required` libraries (imported in the `src` folder).


## Configure your Webapp for Webpack

Now you need to configure Webpack, in order to tell it which files to bundle. Every Webpack configuration requires at the very least an `entry` and `output` node. Create the following file on the root.

`webpack.config.js`:
```javascript
var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST = path.resolve(__dirname, 'dist/');
var SRC = path.resolve(__dirname, 'src/');

var config = {
    entry: SRC + '/app.js',
    output: {
        path: DIST,
        publicPath: 'http://localhost:6565/',
        filename: 'app.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};

module.exports = config;
```

In this file we tell webpack to use the source folder `src/` and bundle it into `dist/`. Furthermore, we add **HtmlWebpackPlugin** so we can add the `index.html` to the bundle. To install this plugin use the following command:

- `npm install html-webpack-plugin --save-dev`

Lastly, add some scripts to make your life a little easier. You can add aliases for commands, which will reside in `package.json` under the `scripts` node. They need to be run with the command `npm run {Script Name}`

`package.json`:
```javascript
"scripts": {
    "start": "webpack-dev-server --inline --progress --port 6565",
    "build": "webpack -p",
    "serve": "node server.js",
    "clean": "rm -rf ./dist",
    "setup": "npm install && npm start"
  },
```

Now that we can create a production package with the `build` script, the server should point to that directory (`dist/`) instead.

`server.js`:
```javascript
// ...

server.use(express.static(__dirname + '/dist/'));

// ...
```

You can easily test this by running `node server.js` from your terminal.
