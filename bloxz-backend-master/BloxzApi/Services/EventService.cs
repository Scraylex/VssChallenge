using System.Collections.Generic;
using System.Threading.Tasks;
using BloxzApi.Data;
using BloxzApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BloxzApi
{
    public class EventService
    {
        private readonly BloxzContext _context;

        public EventService(BloxzContext context) => _context = context;

        public async Task<List<Event>> ReadAllEvents()
        {
            return await _context.Events.ToListAsync();
        }

        public async Task<Event> ReadEvent(int id)
        {
            var entity = await _context.Events.Include(e => e.Organiser).FirstOrDefaultAsync(data => data.ID == id);
            if (entity == null)
            {
                throw new EntityNotFoundException();
            }

            return entity;
        }

        public async Task<Event> CreateEvent(Event @event)
        {
            await _context.Events.AddAsync(@event);
            await _context.SaveChangesAsync();
            return @event;
        }

        public async Task<Event> UpdateEvent(long id, Event eventToModify)
        {
            var entity = await this._context.Events.FirstOrDefaultAsync(data => data.ID == id);
            if (entity == null)
            {
                throw new EntityNotFoundException();
            }

            entity.Description = eventToModify.Description;
            entity.Location = eventToModify.Location;
            entity.Title = eventToModify.Title;
            entity.Start = eventToModify.Start;
            this._context.Events.Update(entity);
            await this._context.SaveChangesAsync();
            return eventToModify;
        }

        public async Task<Event> DeleteEvent(long id)
        {
            var entity = await this._context.Events.FirstOrDefaultAsync(data => data.ID == id);
            if (entity == null)
            {
                throw new EntityNotFoundException();
            }

            this._context.Entry(entity).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();
            return entity;
        }
    }
}
