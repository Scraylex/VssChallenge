using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BloxzApi.DataAnnotations;

namespace BloxzApi.Models
{
    public class Event
    {
        public int ID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        [CurrentDate(nameof(Start))]
        public DateTime Start { get; set; }

        public int OrganiserId { get; set; }

        [ForeignKey(nameof(OrganiserId))]
        public User Organiser { get; set; }

        public override bool Equals(object obj)
        {
            var @event = obj as Event;
            if (@event == null)
            {
                return false;
            }

            return @event.ID == this.ID
                && @event.Title == this.Title
                && @event.Description == this.Description
                && @event.Location == this.Location
                && @event.Start == this.Start
                && @event.OrganiserId == this.OrganiserId;
        }

        public override int GetHashCode() => HashCode.Combine(ID, Title, Description, Location, Start, OrganiserId, Organiser);
    }
}
