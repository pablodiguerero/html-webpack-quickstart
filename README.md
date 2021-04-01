# Pug html compiller

![bootstrap version](https://img.shields.io/badge/bootstrap-4.6.0-brightgreen)
![webpack version](https://img.shields.io/badge/webpack-5.20.0-brightgreen)

Compile PUG templates to HTML using Webpack

Project's general commands:

```bash
# Run dev server
cd app && npm run serve

# Build for production
cd app && npm run build
```

Docker commands:

```bash
# Build docker container
docker build --progress=plain -t front .

# Run docker container
docker run -p 8000:80 front
```

## Codestyle & formating

Strongly recomended to use [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for automatically code formating
