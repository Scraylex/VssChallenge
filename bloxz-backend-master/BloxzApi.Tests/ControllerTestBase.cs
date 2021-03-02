using Microsoft.EntityFrameworkCore;
using BloxzApi.Data;
using BloxzApi.Models;

namespace BloxzApi.Tests
{
    public class ControllerTestBase
    {
        protected readonly DbContextOptions<BloxzContext> ContextOptions;

        public ControllerTestBase(string dbName)
        {
            ContextOptions = new DbContextOptionsBuilder<BloxzContext>()
                .UseInMemoryDatabase(dbName)
                .Options;

            Seed();
        }

        private void Seed()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                User[] users =
                {
                    new User
                    {
                        FirstName = "Max",
                        LastName = "Mustermann",
                        Email = "max.mustermann@mail.com"
                    },
                    new User
                    {
                        FirstName = "Erika",
                        LastName = "Musterfrau",
                        Email = "erika.musterfrau@mail.com"
                    }
                };
                context.Users.AddRange(users);

                Event[] events =
                {
                    new Event
                    {
                        Title = "Abhängen in WG",
                        Description = "Beeriocart bis zum Abwinken",
                        Location = "2.01 101",
                        Start = new System.DateTime(2020, 03, 21),
                        OrganiserId = 1
                    },
                    new Event
                    {
                        Title = "Quarantäne",
                        Description = "Daheimbleiben",
                        Location = "localhost",
                        Start = new System.DateTime(2020, 03, 25),
                        OrganiserId = 2
                    }
                };

                context.Events.AddRange(events);

                Foodshare[] foodShares =
                {
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

                context.Foodshares.AddRange(foodShares);

                context.SaveChanges();
            }
        }
    }
}
