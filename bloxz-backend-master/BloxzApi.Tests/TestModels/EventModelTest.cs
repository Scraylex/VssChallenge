using System;
using BloxzApi.Models;
using Xunit;

namespace BloxzApi.Tests.TestModels
{
    public class EventModelTest
    {
        Event[] events = new Event[]{
            new Event()
                {
                    Title = "Tomorrow's hang out",
                    Description = "Let's fetz Freunde!",
                    Location = "Secret Spot",
                    Start = DateTime.Now.AddDays(1),
                    OrganiserId = 1
                },
            new Event()
                {
                    Title = "Apocalypse",
                    Description = "It's all over, baby blue.",
                    Location = "Everywhere",
                    Start = new DateTime(2012, 12, 21),
                    OrganiserId = 1
                }
        };

        [Fact]
        public void TestEquals()
        {
            Assert.False(events[1].Equals(events[0]));
            Assert.True(events[0].Equals(events[0]));
        }

        [Fact]
        public void TestHashCode()
        {
            var hash1 = events[0].GetHashCode();
            var hash2 = events[1].GetHashCode();

            Assert.False(hash1 == hash2);
            Assert.True(hash1.Equals(hash1));
        }
    }
}
