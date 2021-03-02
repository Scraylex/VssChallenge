using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BloxzApi.Data;
using BloxzApi.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace BloxzApi.Tests
{
    public class EventsControllerTest : ControllerTestBase
    {
        public EventsControllerTest() : base("EventsControllerTest") { }

        [Fact]
        public async Task Get_events()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var response = await controller.Get();

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var events = Assert.IsType<List<Event>>(okResult.Value);

                Assert.Equal(2, events.Count);
                Assert.Equal("Abhängen in WG", events[0].Title);
                Assert.Equal("Quarantäne", events[1].Title);
            }
        }

        [Fact]
        public async Task Get_event_by_id()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var response = await controller.Get(1);

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var @event = Assert.IsType<Event>(okResult.Value);

                Assert.Equal("Abhängen in WG", @event.Title);
            }
        }

        [Fact]
        public async Task Get_event_by_id_returns_not_found()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var response = await controller.Get(int.MaxValue);

                Assert.IsType<NotFoundResult>(response.Result);
            }
        }

        [Fact]
        public async Task Create_event()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var newEvent = new Event
                {
                    Title = "Tomorrow's hang out",
                    Description = "Let's fetz Freunde!",
                    Location = "Secret Spot",
                    Start = DateTime.Now.AddDays(1),
                    OrganiserId = 1
                };

                var response = await controller.Post(newEvent);

                var okResult = Assert.IsType<CreatedResult>(response.Result);
                var @event = Assert.IsType<Event>(okResult.Value);

                Assert.Equal(newEvent, @event);
            }
        }

        [Fact]
        public async Task Create_event_without_title_returns_bad_request()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var newEvent = new Event
                {
                    Title = null,
                    Description = "Let's fetz Freunde!",
                    Location = "Secret Spot",
                    Start = DateTime.Now.AddDays(1),
                    OrganiserId = 1
                };

                var response = await controller.Post(newEvent);

                Assert.IsType<BadRequestResult>(response.Result);
            }
        }

        [Fact]
        public async Task Create_event_with_date_in_past_returns_bad_request()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var newEvent = new Event
                {
                    Title = "Apocalypse",
                    Description = "It's all over, baby blue.",
                    Location = "Everywhere",
                    Start = new DateTime(2012, 12, 21),
                    OrganiserId = 1
                };

                var response = await controller.Post(newEvent);

                Assert.IsType<BadRequestResult>(response.Result);
            }
        }

        [Fact]
        public async Task Edit_event()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var modifiedEvent = new Event
                {
                    ID = 1,
                    Title = "Something new",
                    Description = "It's gonna be fresh, promise ;)",
                    Location = "In the cloud",
                    Start = DateTime.Now.AddDays(1),
                    OrganiserId = 1
                };

                var response = await controller.Put(modifiedEvent.ID, modifiedEvent);

                var okResult = Assert.IsType<OkObjectResult>(response.Result);
                var @event = Assert.IsType<Event>(okResult.Value);

                Assert.Equal(modifiedEvent, @event);
            }
        }

        [Fact]
        public async Task Edit_event_without_title_returns_bad_request()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var modifiedEvent = new Event
                {
                    ID = 1,
                    Title = null,
                    Description = "It's gonna be fresh, promise ;)",
                    Location = "In the cloud",
                    Start = DateTime.Now.AddDays(1),
                    OrganiserId = 1
                };

                var response = await controller.Put(modifiedEvent.ID, modifiedEvent);

                Assert.IsType<BadRequestResult>(response.Result);
            }
        }

        [Fact]
        public async Task Edit_event_with_date_in_past_returns_bad_request()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var modifiedEvent = new Event
                {
                    ID = 1,
                    Title = "Apocalypse",
                    Description = "It's all over, baby blue.",
                    Location = "Everywhere",
                    Start = new DateTime(2012, 12, 21),
                    OrganiserId = 1
                };

                var response = await controller.Put(modifiedEvent.ID, modifiedEvent);

                Assert.IsType<BadRequestResult>(response.Result);
            }
        }

        [Fact]
        public async Task Edit_event_returns_not_found()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var modifiedEvent = new Event
                {
                    ID = 1,
                    Title = "Apocalypse",
                    Description = "It's all over, baby blue.",
                    Location = "Everywhere",
                    Start = new DateTime(2021, 12, 21),
                    OrganiserId = 1
                };
                var response = await controller.Put(int.MaxValue, modifiedEvent);

                Assert.IsType<NotFoundResult>(response.Result);
            }
        }

        [Fact]
        public async Task Delete_event()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var response = await controller.Delete(1);

                Assert.IsType<NoContentResult>(response);
            }
        }

        [Fact]
        public async Task Delete_event_returns_not_found()
        {
            using (var context = new BloxzContext(ContextOptions))
            {
                var controller = new EventsController(new EventService(context));

                var response = await controller.Delete(int.MaxValue);

                Assert.IsType<NotFoundResult>(response);
            }
        }
    }
}
