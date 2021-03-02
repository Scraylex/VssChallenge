using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BloxzApi.Exceptions;
using BloxzApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloxzApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventService _service;

        public EventsController(EventService service)
        {
            this._service = service;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<Event>>> Get()
        {
            try
            {
                var result = await this._service.ReadAllEvents();
                return Ok(result);
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Event>> Get(int id)
        {
            try
            {
                var result = await this._service.ReadEvent(id);
                return Ok(result);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Event>> Post(Event @event)
        {
            try
            {
                RequestCheck(@event);
                DateCheck(@event);
                var result = await _service.CreateEvent(@event);
                return Created("api/events", result);
            }
            catch (InvalidRequestException)
            {
                return BadRequest();
            }
            catch (InvalidDateException)
            {
                return BadRequest();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Event>> Put(int id, Event @event)
        {
            try
            {
                RequestCheck(@event);
                DateCheck(@event);
                var result = await this._service.UpdateEvent(id, @event);
                return Ok(result);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (InvalidRequestException)
            {
                return BadRequest();
            }
            catch (InvalidDateException)
            {
                return BadRequest();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await this._service.DeleteEvent(id);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch
            {
                return InternalServerError();
            }
        }

        private void DateCheck(Event events)
        {
            if (events.Start < DateTime.Now)
            {
                throw new InvalidDateException("Invalid Date");
            }
        }

        private void RequestCheck(Event events)
        {
            if (events.Description == null
                || events.Location == null
                || events.Start == null
                || events.Title == null
                || events.OrganiserId == 0)
            {
                throw new InvalidRequestException("Bad Request");
            }
        }

        private StatusCodeResult InternalServerError()
        {
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}
