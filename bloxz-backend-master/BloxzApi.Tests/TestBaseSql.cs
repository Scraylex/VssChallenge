using Microsoft.EntityFrameworkCore;
using BloxzApi.Data;

namespace BloxzApi.Tests
{
    public class TestBaseSql
    {
        public BloxzContext _context;

        public TestBaseSql()
        {
            var options = new DbContextOptionsBuilder<BloxzContext>()
                .UseSqlite("Data Source=bloxz.db").Options;
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
