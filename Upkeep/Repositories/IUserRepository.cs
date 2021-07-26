using Upkeep.Models;

namespace Upkeep.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        User GetByFirebaseUserId(string firebaseUserId);
        User GetById(int id);
    }
}