using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BloxzApi.Data;
using BloxzApi.Models;
using BloxzApi.Services;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace BloxzApi.Tests
{
    public class FoodsharesControllerTest : ControllerTestBase
    {
        public FoodsharesControllerTest() : base("FoodsharesControllerTest") { }

        [Fact]
        public async Task Get_foodshares()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new FoodsharesController(new FoodshareService(context));

                var response = await controller.Get();

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var foodshares = Assert.IsType<List<Foodshare>>(okResult.Value);

                Assert.Equal(2, foodshares.Count);
                Assert.Equal("FirstClass StudentFood", foodshares[0].Title);
                Assert.Equal("Du willst mehr StudentFood", foodshares[1].Title);
            }
        }

        [Fact]
        public async Task Get_foodshare_by_id()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new FoodsharesController(new FoodshareService(context));

                var response = await controller.Get(1);

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var foodshare = Assert.IsType<Foodshare>(okResult.Value);

                Assert.Equal("FirstClass StudentFood", foodshare.Title);
            }
        }

        [Fact]
        public async Task Get_foodshare_by_id_returns_not_found()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new FoodsharesController(new FoodshareService(context));

                var response = await controller.Get(int.MaxValue);

                Assert.IsType<NotFoundResult>(response.Result);
            }
        }

        [Fact]
        public async Task Create_foodshare()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new FoodsharesController(new FoodshareService(context));

                var newFoodshare = new Foodshare
                {
                    Title = "TestFood",
                    Description = "TestFoodDescription",
                    PickupPlace = "TestFoodLocation",
                    PickupStart = DateTime.Now.AddDays(1),
                    PickupEnd = DateTime.Now.AddDays(2),
                    SharedById = 1,
                };

                var response = await controller.Post(newFoodshare);

                var okResult = Assert.IsType<CreatedResult>(response.Result);
                var foodshare = Assert.IsType<Foodshare>(okResult.Value);

                Assert.Equal(newFoodshare, foodshare);
            }
        }


        [Fact]
        public async Task Edit_foodshare()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new FoodsharesController(new FoodshareService(context));

                var modifiedFoodShare = new Foodshare
                {
                    ID = 1,
                    Title = "TestFood",
                    Description = "TestFoodDescription",
                    PickupPlace = "TestFoodLocation",
                    PickupStart = DateTime.Now.AddDays(1),
                    PickupEnd = DateTime.Now.AddDays(2),
                    SharedById = 1,
                };

                var response = await controller.Put(modifiedFoodShare.ID, modifiedFoodShare);

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var foodshare = Assert.IsType<Foodshare>(okResult.Value);

                Assert.Equal(modifiedFoodShare, foodshare);
            }
        }

        [Fact]
        public async Task Reserve__foodshare()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new FoodsharesController(new FoodshareService(context));

                var reservedFoodshare = new Foodshare
                {
                    ID = 1,
                    Title = "TestFood",
                    Description = "TestFoodDescription",
                    PickupPlace = "TestFoodLocation",
                    PickupStart = DateTime.Now.AddDays(1),
                    PickupEnd = DateTime.Now.AddDays(2),
                    SharedById = 1,
                    ReservedById = 2,
                };

                var response = await controller.Put(reservedFoodshare.ID, reservedFoodshare);

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var foodshare = Assert.IsType<Foodshare>(okResult.Value);

                Assert.True(foodshare.IsReserved);
            }
        }



        [Fact]
        public async Task Edit_foodshare_returns_not_found()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new FoodsharesController(new FoodshareService(context));

                var modifiedFoodShare = new Foodshare()
                {
                    ID = 1,
                    Title = "TestFood",
                    Description = "TestFoodDescription",
                    PickupPlace = "TestFoodLocation",
                    PickupStart = DateTime.Now.AddDays(1),
                    PickupEnd = DateTime.Now.AddDays(2),
                    SharedById = 1,
                };

                var response = await controller.Put(int.MaxValue, modifiedFoodShare);

                Assert.IsType<NotFoundResult>(response.Result);
            }
        }

        [Fact]
        public async Task Delete_foodshare()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new FoodsharesController(new FoodshareService(context));

                var response = await controller.Delete(1);

                Assert.IsType<NoContentResult>(response);
            }
        }

        [Fact]
        public async Task Delete_foodshare_returns_not_found()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new FoodsharesController(new FoodshareService(context));

                var response = await controller.Delete(int.MaxValue);

                Assert.IsType<NotFoundResult>(response);
            }
        }
    }
}
