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
            var currentUserProfile = GetCurrentUserProfile();
            var property = _propertyRepo.GetPropertyById(id, currentUserProfile.FirebaseUserId);
            if (property == null)
            {
                return NotFound();
            }
            else if (property.UserId != currentUserProfile.Id)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(property);
            }
        }

        [HttpGet]
        public IActionResult GetProperties()
        {
            var currentUserProfile = GetCurrentUserProfile();
            List<Property> properties = _propertyRepo.GetPropertiesByFirebaseUserId(currentUserProfile.FirebaseUserId);

            return Ok(properties);
        }

        [HttpGet("filterProperties")]
        public IActionResult FilterProperties()
        {
            var currentUserProfile = GetCurrentUserProfile();
            return Ok(_propertyRepo.FilterProperties(currentUserProfile.FirebaseUserId));
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
            var currentUserProfile = GetCurrentUserProfile();
            return Ok(_propertyRepo.Search(criterion, currentUserProfile.FirebaseUserId));
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
