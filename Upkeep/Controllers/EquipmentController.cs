using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upkeep.Models;
using Upkeep.Repositories;

namespace Upkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentRepository _equipmentRepo;

        public EquipmentController(IEquipmentRepository equipmentRepository)
        {
            _equipmentRepo = equipmentRepository;
        }

        [HttpGet("details/{id}")]
        public IActionResult Get(int id)
        {
            var equipment = _equipmentRepo.GetEquipmentById(id);
            if (equipment == null)
            {
                return NotFound();
            }
            return Ok(equipment);
        }

        [HttpGet("{userId}")]
        public IActionResult GetEquipment(int userId)
        {
            List<Equipment> equipmentList = _equipmentRepo.GetEquipmentByUserId(userId);

            return Ok(equipmentList);
        }

        [HttpPost]
        public IActionResult Post(Equipment equipment)
        {
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
    }
}
