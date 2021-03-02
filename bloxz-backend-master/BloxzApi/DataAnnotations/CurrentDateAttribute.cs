using System;
using System.ComponentModel.DataAnnotations;

namespace BloxzApi.DataAnnotations
{
    public class CurrentDateAttribute : ValidationAttribute
    {
        public CurrentDateAttribute(string property)
        {
            ErrorMessage = $"Value for {property} must be in the future.";
        }

        public override bool IsValid(object value)
        {
            return (DateTime)value >= DateTime.Now;
        }
    }
}
