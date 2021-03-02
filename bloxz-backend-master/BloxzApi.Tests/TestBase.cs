using Microsoft.EntityFrameworkCore;
using BloxzApi.Data;

namespace BloxzApi.Tests
{
    public class TestBase
    {
        public BloxzContext _context;

        public TestBase()
        {
            var options = new DbContextOptionsBuilder<BloxzContext>()
                .UseInMemoryDatabase("Bloxz")
                .EnableSensitiveDataLogging()
                .Options;
            _context = new BloxzContext(options);
            InitializeTestEnvironment(_context);
        }

        private void InitializeTestEnvironment(BloxzContext context)
        {
            TestDataHelper testDataHelper = new TestDataHelper(context);
            testDataHelper.InitializeTestData();
        }
    }
}
