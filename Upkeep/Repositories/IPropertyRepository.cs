using System.Collections.Generic;
using Upkeep.Models;

namespace Upkeep.Repositories
{
    public interface IPropertyRepository
    {
        void Add(Property property);
        void Delete(int id);
        List<Property> GetPropertiesByFirebaseUserId(string firebaseUserId);
        List<Property> FilterProperties(string firebaseUserId);
        Property GetPropertyById(int id, string firebaseUserId);
        void Update(Property property);
        List<Property> Search(string criterion, string firebaseUserId);
    }
}