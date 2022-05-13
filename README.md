<div id="top"></div>

** I'll update with below.  For now just remember:


ChronlyHMS requires an input element with the attribute 'data-univHMS'
add

npm i chronlyhms

import ChronlyHMS from 'chronlyhms';


import 'chronlyhms/src/chrono.css'


**


<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![RepoSize][reposize-shield]][reposize-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  
  
  <a href="https://github.com/StephanLuis/chronlyhms">
    <img src="readme/logo.svg" alt="Logo" width="90" height="90">
  </a>

  <h3 align="center">ChronlyHMS-- Best 'Time Only' Input</h3>

  <p align="center">
    A time only input that works cross browser in very close imitation of a native time input on Chrome.  Works on Safari without AM/PM modification, time spans up to 999 hrs are natively implemented as well as small time spans to 1 millisecond.<br> </p>
    <br />
    <a href="https://github.com/StephanLuis/chronlyhms"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://practisemaster.com/demos/chronoHMStest.html">View Demo</a>
    ·
    <a href="https://github.com/StephanLuis/chronlyhms/issues">Report Bug</a>
    ·
    <a href="https://github.com/StephanLuis/chronlyhms/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Yes! It seems CRAZY in 2022 that there is not a native 'time only' input for HTML.  <br>Not a control not for dates or the time of day but for a value of time just as hours, minutes, seconds. <br> Why is it difficult to 'code' a countdown timer? Why can't it be done with one control, have a look at google's timer and other coundown timers! Shouldn't a user be able to 'scientifically' specify a time?  <br>The closest input, type- time, with UX for hours to millisecs is pretty finicky see below, so I've simplified that!

<img src="readme/html.png" alt="drawing" width="60%"/>

<!-- [![HTML Screen Shot][html-screenshot]](https://example.com) -->

The very worst is Safari on desktop and mobile undermine those efforts and update the input depending on OS settings for desktop or provide a snazzy control with restricted capability...

<img src="readme/safariBad.png" alt="drawing" width="60%"/>
<!-- [![Safari Screen Shot][safari-screenshot]](https://example.com) -->


<h3> Bob is rescued with ChronlyHMS! </h3>

The objective is a minimised vanilla javascript plugin that reproduces the behaviour of the input type=time on Chrome.  This way at least two of the major browsers are supported.

<i>Does this loose any functionality?</i>  No!  document.querySelector('#bob').value  has a getter and setter!  So values can be set and retrieved by ID.


There are a few plugins (links to come), but I couldn't get them to work as 'time only' or 'time unit' inputs.  The controls with the plugin still treated time as a date (ex 24hr max).  Still it seems in 2022 the most relable is multi input (more links to come ), the best example is the Google countdown timer.  And that's wrong because time is a basic unit that should be separate from calendar complexities.  That got me thinking, why isn't there an input control for it implemented across browsers??  I needed one so coded ChronlyHMS.

Here's why:
* Time is a unit of hours minutes and seconds (and millisecs) and needn't be associated with date
* The date association breaks UX and is varied with browser implementation
* I found no other crossbrowser solution
* I thought this would be a great open source project
* There is no need to continue modifying number inputs for time 

Of course, this is functional and in it's infancy.  With some contribution this is a project that can inspire change to the HTML spec.


feel free to vote for WhatWG inclusion of a into the HTML spec! (link comming soon)

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This section should lists any major frameworks/libraries used to for this project. Any add-ons/plugins are in the acknowledgements section.

* [Node.js](https://nodejs.org/)
* [Webpack](https://webpack.js.org/)
* [Gitpod](https://www.gitpod.io/)
* [OpenSauce](https://angular.io/)
* [Selenium](https://www.selenium.dev/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[contributors-shield]: https://img.shields.io/github/contributors/StephanLuis/chronlyhms?style=for-the-badge
[contributors-url]: https://github.com/StephanLuis/chronlyhms/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/StephanLuis/chronlyhms?style=for-the-badge
[forks-url]: https://github.com/StephanLuis/chronlyhms/network/members
[stars-shield]: https://img.shields.io/github/stars/StephanLuis/chronlyhms?style=for-the-badge
[stars-url]: https://github.com/StephanLuis/chronlyhms/stargazers
[issues-shield]: https://img.shields.io/github/issues/StephanLuis/chronlyhms?style=for-the-badge
[issues-url]: https://github.com/StephanLuis/chronlyhms/issues
[license-shield]: https://img.shields.io/github/license/StephanLuis/chronlyhms?style=for-the-badge
[license-url]: https://github.com/StephanLuis/chronlyhms/blob/main/LICENSE
[reposize-shield]: https://img.shields.io/github/repo-size/stephanluis/chronlyhms?style=for-the-badge
[reposize-url]: https://github.com/StephanLuis/chronlyhms
[product-screenshot]: images/screenshot.png

[html-screenshot]: readme/html.png
[safari-screenshot]: readme/safariBad.png
