using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;

namespace BloxzApi.Tests.TestEnv
{
    public class TestStartup : TestBase
    {
        [Test]
        public void TestStartUp()
        {
            Mock<IConfigurationSection> configurationSectionStub = new Mock<IConfigurationSection>();
            configurationSectionStub.Setup(x => x["BloxzContext"]).Returns("Data Source=bloxz.db");

            Mock<Microsoft.Extensions.Configuration.IConfiguration> configurationStub =
                new Mock<Microsoft.Extensions.Configuration.IConfiguration>();
            configurationStub.Setup(x => x.GetSection("ConnectionStrings")).Returns(configurationSectionStub.Object);

            IServiceCollection services = new ServiceCollection();
            var target = new Startup(configurationStub.Object);

            target.ConfigureServices(services);
            services.AddTransient<EventsController>();

            var serviceProvider = services.BuildServiceProvider();

            var controller = serviceProvider.GetService<EventsController>();
            Assert.IsNotNull(controller);
        }
    }
}
