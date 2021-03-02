using System;
using BloxzApi.Data;
using BloxzApi.Models;

namespace BloxzApi.Tests
{
    public class TestDataHelper
    {
        protected readonly BloxzContext Context;
        protected const string InitializationError = "Error while re-initializing database entries.";

        public TestDataHelper(BloxzContext context)
        {
            Context = context;
        }

        public void InitializeTestData()
        {
            try
            {
                PrepareDatabase();
                SeedTestData();
            }
            catch (Exception ex)
            {
                throw new ApplicationException(InitializationError, ex);
            }
        }

        private void PrepareDatabase()
        {
            Context.Database.EnsureDeleted();
            Context.Database.EnsureCreated();
        }

        private void SeedTestData()
        {


            User[] users = {
                new User
                {
                FirstName = "Max",
                LastName = "Musterman",
                Email = "max.musterman@mail.com",
                },
                new User
                {
                FirstName = "Erika",
                LastName = "Musterfrau",
                Email = "erika.musterfrau@mail.com",
                }
            };
            Context.Users.AddRange(users);
            Context.SaveChanges();

            Event[] events =
            {
                new Event
                {
                    Title = "Abhaengen in WG",
                    Description = "Beeriocart bis zum Abwinken",
                    Location = "2.01 101",
                    Start = new System.DateTime(2020, 03, 21),
                    OrganiserId = 1,
                },
                new Event
                {
                    Title = "Quarantaene",
                    Description = "Daheimbleiben",
                    Location = "localhost",
                    Start = new System.DateTime(2020, 03, 25),
                    OrganiserId = 2,
                }
            };
            Context.Events.AddRange(events);
            Context.SaveChanges();

            Foodshare[] foodShares = {

                new Foodshare
                {
                    Title = "FirstClass StudentFood",
                    Description = "Von diesem Essen kriegst du garantiert Bauchweh. Corona wäre Dir lieber.",
                    PickupPlace = "Meine dreckige Küche",
                    PickupStart = new System.DateTime(2020, 03, 21),
                    PickupEnd = new System.DateTime(2020, 03, 22),
                    SharedById = 1
                },

                new Foodshare
                {
                    Title = "Du willst mehr StudentFood",
                    Description = "Wenn du das überlebst, schenkt dir die HSR den Master.",
                    PickupPlace = "Mein Keller",
                    PickupStart = new System.DateTime(2020, 03, 25),
                    PickupEnd = new System.DateTime(2020, 03, 25),
                    SharedById = 1
                }
            };
            Context.Foodshares.AddRange(foodShares);
            Context.SaveChanges();

        }
    }
}
