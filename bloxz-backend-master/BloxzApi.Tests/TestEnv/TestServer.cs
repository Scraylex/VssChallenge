using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using NUnit.Framework;

namespace BloxzApi.Tests.TestEnv
{
    public class TestServer : TestBase
    {
        [Test]
        public void WebHostBuilds()
        {
            var hostBuilder = new HostBuilder().ConfigureWebHostDefaults(webHost => webHost.UseStartup<Startup>());
            Assert.True(hostBuilder.Build().StartAsync().IsCompletedSuccessfully);
        }
    }
}
