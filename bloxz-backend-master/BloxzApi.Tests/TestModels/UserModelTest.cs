using BloxzApi.Models;
using Xunit;

namespace BloxzApi.Tests.TestModels
{
    public class UserModelTest
    {
        User[] users = new User[]{
            new User()
                {
                    FirstName = "Swaggy",
                    LastName = "Doe",
                    Email = "nulldoe@mail.com"
                },
            new User()
                {
                    FirstName = "Albert",
                    LastName = "Einstein",
                    Email = "Albert@TheBomb.com"
                }
        };

        [Fact]
        public void TestEquals()
        {
            Assert.False(users[1].Equals(users[0]));
            Assert.True(users[0].Equals(users[0]));
        }

        [Fact]
        public void TestHashCode()
        {
            var hash1 = users[0].GetHashCode();
            var hash2 = users[1].GetHashCode();

            Assert.False(hash1 == hash2);
            Assert.True(hash1.Equals(hash1));
        }
    }
}
