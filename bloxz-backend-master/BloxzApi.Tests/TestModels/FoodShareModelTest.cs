using System;
using BloxzApi.Models;
using Xunit;

namespace BloxzApi.Tests.TestModels
{
    public class FoodShareModelTest
    {
        Foodshare[] foodshares = new Foodshare[]{
            new Foodshare()
                {
                    Title = "FirstClass StudentFood",
                    Description = "Von diesem Essen kriegst du garantiert Bauchweh. Corona wäre Dir lieber.",
                    PickupPlace = "Meine dreckige Küche",
                    PickupStart = new System.DateTime(2020, 03, 21),
                    PickupEnd = new System.DateTime(2020, 03, 22),
                    SharedById = 2
                },
            new Foodshare()
                {
                    Title = "TestFood",
                    Description = "TestFoodDescription",
                    PickupPlace = "TestFoodLocation",
                    PickupStart = DateTime.Now.AddDays(1),
                    PickupEnd = DateTime.Now.AddDays(2),
                    SharedById = 1,
                    ReservedById = 2,
                }
        };

        [Fact]
        public void TestEquals()
        {
            Assert.False(foodshares[1].Equals(foodshares[0]));
            Assert.True(foodshares[0].Equals(foodshares[0]));
        }

        [Fact]
        public void TestHashCode()
        {
            var hash1 = foodshares[0].GetHashCode();
            var hash2 = foodshares[1].GetHashCode();

            Assert.False(hash1 == hash2);
            Assert.True(hash1.Equals(hash1));
        }
    }
}
