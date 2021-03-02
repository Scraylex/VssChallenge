# bloxz-backend

## Build and Run the API

```sh
dotnet build BloxzApi
dotnet run -p BloxzApi
```

## Run the Unit Tests

```sh
dotnet test BloxzApi.Tests
```

### With Coverage

```sh
dotnet test BloxzApi.Tests /p:CollectCoverage=true /p:CoverletOutput=TestResults/
```

## Lint the Project

StyleCop is executed everytime the project is built.  
Since it only lints the code that has changed since the last rebuild, you may want to run

```sh
dotnet build BloxzApi --no-incremental
```
