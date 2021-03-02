using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloxzApi.Models
{
    public class Foodshare
    {
        public int ID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string PickupPlace { get; set; }

        [Required]
        public DateTime PickupStart { get; set; }

        [Required]
        public DateTime PickupEnd { get; set; }

        [Required]
        public bool IsReserved { get; set; }

        public string Photo { get; set; }

        [Required]
        public int SharedById { get; set; }

        [ForeignKey(nameof(SharedById))]
        [InverseProperty("Foodshares")]
        public User SharedBy { get; set; }

#nullable enable
        public int? ReservedById { get; set; }

        [ForeignKey(nameof(ReservedById))]
        public User? ReservedBy { get; set; }
#nullable disable

        public override bool Equals(object obj)
        {
            var foodshare = obj as Foodshare;
            if (foodshare == null)
            {
                return false;
            }

            return foodshare.ID == this.ID
                && foodshare.Title == this.Title
                && foodshare.Description == this.Description
                && foodshare.PickupPlace == this.PickupPlace
                && foodshare.PickupStart == this.PickupStart
                && foodshare.PickupEnd == this.PickupEnd
                && foodshare.SharedById == this.SharedById;
        }

        public override int GetHashCode() => HashCode.Combine(
            ID,
            Title,
            Description,
            PickupPlace,
            PickupStart,
            PickupEnd,
            IsReserved);
    }
}
