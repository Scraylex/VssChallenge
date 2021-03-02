using System.Collections.Generic;
using System.Threading.Tasks;
using BloxzApi.Data;
using BloxzApi.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace BloxzApi.Tests
{
    public class UsersControllerTest : ControllerTestBase
    {
        public UsersControllerTest() : base("UsersControllerTest") { }

        [Fact]
        public async Task Get_users()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var response = await controller.Get();

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var users = Assert.IsType<List<User>>(okResult.Value);

                Assert.Equal(2, users.Count);
                Assert.Equal("Mustermann", users[0].LastName);
                Assert.Equal("Musterfrau", users[1].LastName);
            }
        }

        [Fact]
        public async Task Get_user_by_id()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var response = await controller.Get(1);

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var user = Assert.IsType<User>(okResult.Value);

                Assert.Equal("Mustermann", user.LastName);
            }
        }

        [Fact]
        public async Task Get_user_by_id_returns_not_found()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var response = await controller.Get(int.MaxValue);

                Assert.IsType<NotFoundResult>(response.Result);
            }
        }

        [Fact]
        public async Task Create_user()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var newUser = new User
                {
                    FirstName = "Jane",
                    LastName = "Doe",
                    Email = "janedoe@mail.com"
                };

                var response = await controller.Post(newUser);

                var okResult = Assert.IsType<CreatedResult>(response.Result);
                var @user = Assert.IsType<User>(okResult.Value);

                Assert.Equal(newUser, @user);
            }
        }

        [Fact]
        public async Task Create_user_without_firstname_returns_bad_request()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var newUser = new User
                {
                    FirstName = null,
                    LastName = "Doe",
                    Email = "nulledoe@mail.com"
                };

                var response = await controller.Post(newUser);

                Assert.IsType<BadRequestResult>(response.Result);
            }
        }

        [Fact]
        public async Task Edit_user()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var modifiedUser = new User
                {
                    ID = 1,
                    FirstName = "Jane",
                    LastName = "Doe",
                    Email = "janedoe@mail.com"
                };

                var response = await controller.Put(modifiedUser.ID, modifiedUser);

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var @user = Assert.IsType<User>(okResult.Value);

                Assert.Equal(modifiedUser, @user);
            }
        }

        [Fact]
        public async Task Edit_user_without_firstname_returns_bad_request()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var modifiedUser = new User
                {
                    ID = 1,
                    FirstName = null,
                    LastName = "Doe",
                    Email = "nulldoe@mail.com"
                };

                var response = await controller.Put(modifiedUser.ID, modifiedUser);

                Assert.IsType<BadRequestResult>(response.Result);
            }
        }

        [Fact]
        public async Task Edit_user_returns_not_found()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var user = new User()
                {
                    FirstName = "Swaggy",
                    LastName = "Doe",
                    Email = "nulldoe@mail.com"
                };

                var response = await controller.Put(int.MaxValue, user);

                Assert.IsType<NotFoundResult>(response.Result);
            }
        }

        [Fact]
        public async Task Delete_user()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var response = await controller.Delete(1);

                Assert.IsType<NoContentResult>(response);
            }
        }

        [Fact]
        public async Task Delete_user_returns_not_found()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new UsersController(new UserService(context));

                var response = await controller.Delete(int.MaxValue);

                Assert.IsType<NotFoundResult>(response);
            }
        }
    }
}
