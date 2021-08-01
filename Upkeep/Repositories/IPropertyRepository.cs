using System.Collections.Generic;
using Upkeep.Models;

namespace Upkeep.Repositories
{
    public interface IPropertyRepository
    {
        void Add(Property property);
        void Delete(int id);
        List<Property> GetPropertiesByFirebaseUserId(string firebaseUserId);
        Property GetPropertyById(int id);
        void Update(Property property);
        List<Property> Search(string criterion, string firebaseUserId);
    }
}