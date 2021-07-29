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
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyRepository _propertyRepo;
        private readonly IUserRepository _userRepository;

        public PropertyController(IPropertyRepository propertyRepository, IUserRepository userRepository)
        {
            _propertyRepo = propertyRepository;
            _userRepository = userRepository;
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

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetProperties(string firebaseUserId)
        {
            List<Property> properties = _propertyRepo.GetPropertiesByFirebaseUserId(firebaseUserId);

            return Ok(properties);
        }

        [HttpPost]
        public IActionResult Post(Property property)
        {
            var currentUserProfile = GetCurrentUserProfile();
            property.UserId = currentUserProfile.Id;
            property.User = currentUserProfile;
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

        [HttpGet("search")]
        public IActionResult Search(string criterion)
        {
            return Ok(_propertyRepo.Search(criterion));
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
