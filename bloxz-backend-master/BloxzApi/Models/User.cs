using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BloxzApi.Models
{
    public class User
    {
        public int ID { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set;}

        public ICollection<Event> Events { get; set; }

        public virtual ICollection<Foodshare> FoodShares { get; set; }

        public override bool Equals(object obj)
        {
            var user = obj as User;
            if (user == null)
            {
                return false;
            }

            return user.ID == this.ID
                && user.FirstName == this.FirstName
                && user.LastName == this.LastName
                && user.Password == this.Password
                && user.Email == this.Email;
        }

        public override int GetHashCode() => HashCode.Combine(ID, FirstName, LastName, Password, Email, Events, FoodShares);
    }
}
