using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Upkeep.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Description { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int Type { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
