# Build env
FROM mcr.microsoft.com/dotnet/core/sdk:latest AS build-env
WORKDIR /app

# Copy and restore packages
COPY *.csproj ./
RUN dotnet restore

# Copy other files and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:latest
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "aspnetapp.dll"]



