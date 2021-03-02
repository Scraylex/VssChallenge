using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using BloxzApi.Models;

namespace BloxzApi.Tests.ServiceTests
{
    [TestFixture]
    public class UserServiceTest : TestBase
    {
        private readonly UserService _service;
        public UserServiceTest() : base()
        {
            _service = new UserService(_context);
        }

        [Test]
        public async Task ServiceReadTestAsync()
        {
            var users = await _service.ReadAllUsers();
            var actual = users.Count();
            var expected = _context.Users.Count();
            Assert.True(expected == actual);
        }

        [Test]
        public async Task ServiceReadByIdTestAsync()
        {
            User testUser = new User
            {
                FirstName = "Hans",
                LastName = "Peter",
                Email = "hans.peter@mail.com"
            };

            var resultUser = await _service.CreateUser(testUser);
            var fetchedUser = await _service.ReadUser(testUser.ID);

            Assert.True(resultUser.Equals(fetchedUser));
        }

        [Test]
        public async Task ServiceCreateTestAsync()
        {
            User testUser = new User
            {
                FirstName = "Hans",
                LastName = "Peter",
                Email = "hans.peter@mail.com"
            };

            var actual = await _service.CreateUser(testUser);

            Assert.True(testUser.Equals(actual));
        }

        [Test]
        public async Task ServiceDeleteTestAsync()
        {
            User testUser = new User
            {
                FirstName = "Hans",
                LastName = "Peter",
                Email = "hans.peter@mail.com"
            };

            var entityEntry = await _service.CreateUser(testUser);

            var idToDelete = entityEntry.ID;

            await _service.DeleteUser(idToDelete);

            Assert.ThrowsAsync<EntityNotFoundException>(() => _service.ReadUser(idToDelete));
        }

        [Test]
        public async Task ServiceUpdateTestAsync()
        {
            User testUser = new User
            {
                FirstName = "Hans",
                LastName = "Peter",
                Email = "hans.peter@mail.com"
            };


            var entity = await _service.CreateUser(testUser);

            testUser.FirstName = "Maya";

            var expected = await _service.UpdateUser(entity.ID, testUser);

            Assert.True(testUser.Equals(expected));
        }
    }
}
