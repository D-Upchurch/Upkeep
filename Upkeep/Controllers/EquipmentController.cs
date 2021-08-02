using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Upkeep.Models;
using Upkeep.Repositories;

namespace Upkeep.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentRepository _equipmentRepo;
        private readonly IUserRepository _userRepo;

        public EquipmentController(IEquipmentRepository equipmentRepository, IUserRepository userRepository)
        {
            _equipmentRepo = equipmentRepository;
            _userRepo = userRepository;
        }

        [HttpGet("details/{id}")]
        public IActionResult Get(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var equipment = _equipmentRepo.GetEquipmentById(id, currentUserProfile.FirebaseUserId);
            if (equipment == null)
            {
                return NotFound();
            }
            else if (equipment.User != currentUserProfile)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(equipment);
            }
            
        }

        [HttpGet]
        public IActionResult GetEquipment()
        {
            var currentUserProfile = GetCurrentUserProfile();
            List<Equipment> equipmentList = _equipmentRepo.GetEquipmentByFirebaseUserId(currentUserProfile.FirebaseUserId);

            return Ok(equipmentList);
        }

        [HttpPost]
        public IActionResult Post(Equipment equipment)
        {
            var currentUserProfile = GetCurrentUserProfile();
            equipment.UserId = currentUserProfile.Id;
            equipment.User = currentUserProfile;
            _equipmentRepo.Add(equipment);
            return CreatedAtAction("Get", new { id = equipment.Id }, equipment);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _equipmentRepo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, Equipment equipment)
        {
            if (id != equipment.Id)
            {
                return BadRequest();
            }

            _equipmentRepo.Update(equipment);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
