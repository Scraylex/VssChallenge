using System.Collections.Generic;
using System.Threading.Tasks;
using BloxzApi.Data;
using BloxzApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BloxzApi
{
    public class UserService
    {
        private readonly BloxzContext _context;

        public UserService(BloxzContext context)
        {
            _context = context;
        }

        public async Task<List<User>> ReadAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> ReadUser(int id)
        {
            var entity = await _context.Users.FirstOrDefaultAsync(data => data.ID == id);
            if (entity == null)
            {
                throw new EntityNotFoundException();
            }

            return entity;
        }

        public async Task<User> CreateUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUser(long id, User user)
        {
            var entity = await this._context.Users.FirstOrDefaultAsync(data => data.ID == id);
            if (entity == null)
            {
                throw new EntityNotFoundException();
            }

            entity.FirstName = user.FirstName;
            entity.LastName = user.LastName;
            entity.Email = user.Email;
            this._context.Users.Update(entity);
            await this._context.SaveChangesAsync();
            return user;
        }

        public async Task<User> DeleteUser(long id)
        {
            var entity = await this._context.Users.FirstOrDefaultAsync(data => data.ID == id);
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
