using System.Collections.Generic;
using System.Threading.Tasks;
using BloxzApi.Data;
using BloxzApi.Exceptions;
using BloxzApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BloxzApi.Services
{
    public class FoodshareService
    {
        private readonly BloxzContext _context;

        public FoodshareService(BloxzContext context)
        {
            _context = context;
        }

        public async Task<List<Foodshare>> ReadAllFoodshares()
        {
            return await _context.Foodshares.Include(e => e.SharedBy).Include(e => e.ReservedBy).ToListAsync();
        }

        public async Task<Foodshare> ReadFoodshare(int id)
        {
            var entity = await _context.Foodshares.Include(e => e.SharedBy).Include(e => e.ReservedBy).FirstOrDefaultAsync(data => data.ID == id);
            if (entity == null)
            {
                throw new EntityNotFoundException();
            }

            return entity;
        }

        public async Task<Foodshare> CreateFoodshare(Foodshare foodshare)
        {
            foodshare.SharedBy = await _context.Users.FirstOrDefaultAsync(data => data.ID == foodshare.SharedById);
            await _context.Foodshares.AddAsync(foodshare);
            await _context.SaveChangesAsync();
            return foodshare;
        }

        public async Task<Foodshare> UpdateFoodshare(long id, Foodshare foodshareToModify)
        {
            var entity = await this._context.Foodshares.Include(e => e.SharedBy).FirstOrDefaultAsync(data => data.ID == id);
            if (entity == null)
            {
                throw new EntityNotFoundException();
            }

            if (entity.IsReserved)
            {
                throw new FoodAlreadyReservedException();
            }

            if (foodshareToModify.ReservedById != entity.ReservedById)
            {
                var reservedByUser = await _context.Users.FirstOrDefaultAsync(data => data.ID == foodshareToModify.ReservedById);
                if (reservedByUser == null)
                {
                    throw new InvalidRequestException("User not valid");
                }
                else
                {
                    entity.ReservedBy = reservedByUser;
                    entity.ReservedById = foodshareToModify.ReservedById;
                    entity.IsReserved = true;
                }
            }

            entity.Description = foodshareToModify.Description;
            entity.PickupPlace = foodshareToModify.PickupPlace;
            entity.Title = foodshareToModify.Title;
            entity.PickupStart = foodshareToModify.PickupStart;
            entity.PickupEnd = foodshareToModify.PickupEnd;
            this._context.Foodshares.Update(entity);
            await this._context.SaveChangesAsync();
            return entity;
        }

        public async Task<Foodshare> DeleteFoodshare(long id)
        {
            var entity = await this._context.Foodshares.FirstOrDefaultAsync(data => data.ID == id);
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
