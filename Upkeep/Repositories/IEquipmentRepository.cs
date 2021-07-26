using System.Collections.Generic;
using Upkeep.Models;

namespace Upkeep.Repositories
{
    public interface IEquipmentRepository
    {
        void Add(Equipment equipment);
        void Delete(int id);
        Equipment GetEquipmentById(int id);
        List<Equipment> GetEquipmentByUserId(int userId);
        void Update(Equipment equipment);
    }
}