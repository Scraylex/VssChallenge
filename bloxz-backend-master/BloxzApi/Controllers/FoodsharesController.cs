using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BloxzApi.Exceptions;
using BloxzApi.Models;
using BloxzApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloxzApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodsharesController : ControllerBase
    {
        private readonly FoodshareService _service;

        public FoodsharesController(FoodshareService service)
        {
            this._service = service;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<Foodshare>>> Get()
        {
            try
            {
                var result = await this._service.ReadAllFoodshares();
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
        public async Task<ActionResult<Foodshare>> Get(int id)
        {
            try
            {
                var result = await this._service.ReadFoodshare(id);
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
        public async Task<ActionResult<Foodshare>> Post(Foodshare foodshare)
        {
            try
            {
                var result = await _service.CreateFoodshare(foodshare);
                return Created("api/foodshares", result);
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
        public async Task<ActionResult<Foodshare>> Put(int id, Foodshare foodshare)
        {
            try
            {
                var result = await this._service.UpdateFoodshare(id, foodshare);
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
                await this._service.DeleteFoodshare(id);
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

        private StatusCodeResult InternalServerError()
        {
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}
