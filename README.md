# Overview

This is a web app allows doing semantic search on top of your files. Inspired by https://github.com/imartinez/privateGPT, and hopefully would be integrated with it at some point.

# Getting Started

1. Install docker:

- get [docker for mac](https://docs.docker.com/desktop/install/mac-install) (use Apple silicon chip if you have it)
- install docker the app
- open the app and accept docker agreements
- use recommended settings
- you can continue without signing in

2. Clone this repo:

```sh
git clone https://github.com/nozdrenkov/gpt4m
```

3. Go to the `gpt4m` folder and move there your `db`, `models` and `source_documents` folders from your `privateGPT` folder.

4. From the `gpt4m` folder run:

```sh
docker-compose up
```

(it takes about 10 minutes to build everything first time)

5. Enjoy using semantic search by opening this in the browser: http://localhost:3333/
