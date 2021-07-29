using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Upkeep.Models
{
    public class Property
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(75)]
        public string Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string Address { get; set; }

        [Required]
        public int ServiceCharge { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime LastService { get; set; }

        public string Notes { get; set; }

        [Required]
        [DataType(DataType.ImageUrl)]
        [MaxLength(255)]
        public string Image { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }


    }
}
