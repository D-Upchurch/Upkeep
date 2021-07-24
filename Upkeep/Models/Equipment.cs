using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Upkeep.Models
{
    public class Equipment
    {
        public int id { get; set; }

        [Required]
        [MaxLength(255)]
        public string type { get; set; }

        [Required]
        [MaxLength(255)]
        public string Make { get; set; }

        [Required]
        [MaxLength(255)]
        public string Model { get; set; }

        public int Hours { get; set; }
        
        public string Notes { get; set; }

        [Required]
        [DataType(DataType.ImageUrl)]
        [MaxLength(255)]
        public string Image { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
