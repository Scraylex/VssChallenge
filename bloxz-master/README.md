# bloxz

## Local Setup

Clone the repository and install the dependecies:

```sh
git clone https://gitlab.dev.ifs.hsr.ch/epj/2020/bloxz/bloxz.git
cd bloxz
npm install
```

### IDE

We recommend to use _Visual Studio Code_ with the following extensions:

* `esbenp.prettier-vscode`
* `editorconfig.editorconfig`
* `dbaeumer.vscode-eslint`

## Run the App

```sh
npm start
```

For a list of all available scripts, run `npm run` in a terminal.

### With Docker

Build a local container:
`docker build -t bloxz:latest .`

Run the container interactively on port 3000:
`docker run -p 3000:3000/tcp bloxz:latest`

## Project Structure

An explanation of the most important components of the app.

```
├── api-spec.yml – API contract specification
├── public/ – Folder for static assets
└── src/
    ├── App.tsx – Entry point for the app
    ├── index.tsx – Here we add our app to the `/public/index.html`.
    ├── app/ – Source code directory for the app
    └── shared/ – Utils which are used all over in the app
```

### Erklärung zum Testing

Wir haben eine 75% Testabdeckung. Das heisst, wir werden oft Test schreiben. :)
Wir verwenden folgende Packages für Tests:

* `jest` Underliegende Testing Engine
* `react-testing-library` Abstraiert Jest und macht das Testing einfacher
* `history` Wird gebraucht um history (die URL und so) zu mocken.
* `fetch-mock` Brauchen wir um fetch calls zu mocken.

### Erklärung zu State

Um den Data- und der Presentation Layer auseinander zu halten, haben wir ein File `Example.tsx` das keinen State beinhaltet und ein `ExampleWithData.tsx` das Example mit einem State wrapped.

Lokale States erstellen wir über sogenannte [Hooks](https://reactjs.org/docs/hooks-intro.html). Für API Calls verwenden wir das Package `react-fetching-library`.
