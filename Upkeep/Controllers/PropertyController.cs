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
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyRepository _propertyRepo;

        public PropertyController(IPropertyRepository propertyRepository)
        {
            _propertyRepo = propertyRepository;
        }

        [HttpGet("details/{id}")]
        public IActionResult Get(int id)
        {
            var property = _propertyRepo.GetPropertyById(id);
            if (property == null)
            {
                return NotFound();
            }
            return Ok(property);
        }

        [HttpGet("{userId}")]
        public IActionResult GetProperties(int userId)
        {
            List<Property> properties = _propertyRepo.GetPropertiesByUserId(userId);

            return Ok(properties);
        }

        [HttpPost]
        public IActionResult Post(Property property)
        {
            _propertyRepo.Add(property);
            return CreatedAtAction("Get", new { id = property.Id }, property);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _propertyRepo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, Property property)
        {
            if (id != property.Id)
            {
                return BadRequest();
            }

            _propertyRepo.Update(property);
            return NoContent();
        }
    }
}
