using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Upkeep.Models
{
    public class User
    {
        public int Id { get; set; }
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(75)]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(555)]
        public string Email { get; set; }

        [Required]
        [MaxLength(11)]
        public string Phone { get; set; }
    }
}
