using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using BloxzApi.Models;

namespace BloxzApi.Tests.ServiceTests
{
    [TestFixture]
    public class EventServiceTest : TestBase
    {
        private readonly EventService _service;
        public EventServiceTest() : base()
        {
            _service = new EventService(_context);
        }

        [Test]
        public async Task ServiceReadTestAsync()
        {
            var events = await _service.ReadAllEvents();
            var actual = events.Count();
            var expected = _context.Events.Count();
            Assert.True(expected == actual);
        }

        [Test]
        public async Task ServiceReadByIdTestAsync()
        {
            Event testEvent = new Event
            {
                Title = "Abhaengen in WG",
                Description = "Beeriocart bis zum Abwinken",
                Location = "2.01 101",
                Start = new System.DateTime(2020, 03, 21),
                OrganiserId = 1,
            };

            var result = await _service.CreateEvent(testEvent);

            Assert.DoesNotThrowAsync(() => _service.ReadEvent(result.ID));
        }

        [Test]
        public async Task ServiceCreateTestAsync()
        {
            Event expected = new Event
            {
                Title = "TestEntity",
                Description = "TestDescription",
                Location = "TestLocation",
                Start = new System.DateTime(),
                OrganiserId = 1,
            };

            var actual = await _service.CreateEvent(expected);

            Assert.True(expected.Equals(actual));
        }

        [Test]
        public async Task ServiceDeleteTestAsync()
        {
            var testEvent = new Event
            {
                Title = "TestDelete",
                Description = "Ciao Bye",
                Location = "void",
                Start = new System.DateTime(2020, 12, 21)
            };

            var entityEntry = await _context.AddAsync(testEvent);
            await _context.SaveChangesAsync();
            var idToDelete = entityEntry.Entity.ID;

            var actual = await _service.DeleteEvent(idToDelete);

            Assert.True(entityEntry.Entity.Description == actual.Description);
        }

        [Test]
        public async Task ServiceUpdateTestAsync()
        {
            Event testEvent = new Event
            {
                Title = "TestEntity",
                Description = "TestDescription",
                Location = "TestLocation",
                Start = new System.DateTime()
            };

            var entity = await _service.CreateEvent(testEvent);

            testEvent.Title = "lalal";

            var expected = await _service.UpdateEvent(entity.ID, testEvent);

            Assert.True(testEvent.Equals(expected));
        }
    }
}
