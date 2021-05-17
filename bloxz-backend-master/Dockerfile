# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY BloxzApi/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY BloxzApi ./
RUN dotnet publish -c Release -o out
# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
EXPOSE 5000
EXPOSE 5001
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "BloxzApi.dll"]