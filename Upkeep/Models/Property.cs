using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Upkeep.Models
{
    public class Property
    {
        public int id { get; set; }

        [Required]
        [MaxLength(75)]
        public string name { get; set; }

        [Required]
        [MaxLength(255)]
        public string address { get; set; }

        [Required]
        public int serviceCharge { get; set; }

        [Required]
        public DateTime lastService { get; set; }

        public string notes { get; set; }

        [Required]
        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string image { get; set; }

        public int UserId { get; set; }
        public User user { get; set; }


    }
}
