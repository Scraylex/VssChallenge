using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using BloxzApi.Models;
using BloxzApi.Services;

namespace BloxzApi.Tests.ServiceTests
{
    [TestFixture]
    public class FoodshareTest : TestBase
    {
        private readonly FoodshareService _service;
        public FoodshareTest() : base()
        {
            _service = new FoodshareService(_context);
        }

        [Test]
        public async Task ServiceReadTestAsync()
        {
            var foodshares = await _service.ReadAllFoodshares();
            var actual = foodshares.Count();
            var expected = _context.Foodshares.Count();
            Assert.True(expected == actual);
        }

        [Test]
        public async Task ServiceReadByIdTestAsync()
        {
            var testFoodshare = new Foodshare
            {
                Title = "FirstClass StudentFood",
                Description = "Von diesem Essen kriegst du garantiert Bauchweh. Corona wäre Dir lieber.",
                PickupPlace = "Meine dreckige Küche",
                PickupStart = new System.DateTime(2020, 03, 21),
                PickupEnd = new System.DateTime(2020, 03, 22),
                SharedById = 2
            };

            var result = await _service.CreateFoodshare(testFoodshare);

            Assert.DoesNotThrowAsync(() => _service.ReadFoodshare(result.ID));
        }

        [Test]
        public async Task ServiceCreateTestAsync()
        {
            var testFoodshare = new Foodshare
            {
                Title = "FirstClass StudentFood",
                Description = "Von diesem Essen kriegst du garantiert Bauchweh. Corona wäre Dir lieber.",
                PickupPlace = "Meine dreckige Küche",
                PickupStart = new System.DateTime(2020, 03, 21),
                PickupEnd = new System.DateTime(2020, 03, 22),
                SharedById = 2
            };

            var actual = await _service.CreateFoodshare(testFoodshare);

            Assert.True(testFoodshare.Equals(actual));
        }

        [Test]
        public async Task ServiceDeleteTestAsync()
        {
            var testFoodshare = new Foodshare
            {
                Title = "FirstClass StudentFood",
                Description = "Von diesem Essen kriegst du garantiert Bauchweh. Corona wäre Dir lieber.",
                PickupPlace = "Meine dreckige Küche",
                PickupStart = new System.DateTime(2020, 03, 21),
                PickupEnd = new System.DateTime(2020, 03, 22),
                SharedById = 2
            };

            var entityEntry = await _context.AddAsync(testFoodshare);
            await _context.SaveChangesAsync();
            var idToDelete = entityEntry.Entity.ID;

            var actual = await _service.DeleteFoodshare(idToDelete);

            Assert.True(entityEntry.Entity.Description == actual.Description);
        }

        [Test]
        public async Task ServiceUpdateTestAsync()
        {
            var testFoodshare = new Foodshare
            {
                Title = "FirstClass StudentFood",
                Description = "Von diesem Essen kriegst du garantiert Bauchweh. Corona wäre Dir lieber.",
                PickupPlace = "Meine dreckige Küche",
                PickupStart = new System.DateTime(2020, 03, 21),
                PickupEnd = new System.DateTime(2020, 03, 22),
                SharedById = 2
            };

            var entity = await _service.CreateFoodshare(testFoodshare);

            testFoodshare.Title = "Katzenfutter";

            var expected = await _service.UpdateFoodshare(entity.ID, testFoodshare);

            Assert.True(testFoodshare.Equals(expected));
        }
    }
}
