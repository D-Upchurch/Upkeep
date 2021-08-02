using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upkeep.Models;
using Upkeep.Utils;

namespace Upkeep.Repositories
{
    public class PropertyRepository : BaseRepository, IPropertyRepository
    {
        public PropertyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Property> GetPropertiesByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.id, p.[name], p.address, p.serviceCharge, p.lastService, p.notes, p.image, p.userId,
                           u.Id AS UsersId, u.[Name] as UserName, u.email, u.phone, u.firebaseUserId
                    FROM Property p
                    LEFT JOIN [User] u ON p.userId = u.[Id]
                    WHERE u.firebaseUserId = @firebaseUserId
                    ";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    var reader = cmd.ExecuteReader();

                    var properties = new List<Property>();

                    while (reader.Read())
                    {
                        properties.Add(new Property()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Address = DbUtils.GetString(reader, "address"),
                            ServiceCharge = DbUtils.GetInt(reader, "serviceCharge"),
                            LastService = DbUtils.GetDateTime(reader, "lastService"),
                            Notes = DbUtils.GetNullableString(reader, "notes"),
                            Image = DbUtils.GetString(reader, "image"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UsersId"),
                                Name = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "email"),
                                Phone = DbUtils.GetString(reader, "phone"),
                                FirebaseUserId = DbUtils.GetString(reader, "firebaseUserId")
                            }
                        });
                    }

                    reader.Close();

                    return properties;
                }
            }
        }

        public Property GetPropertyById(int id, string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.[id], p.[name], p.address, p.serviceCharge, p.lastService, p.notes, p.image, p.userId,
                           u.[Id] AS [UsersId], u.[Name] as [UserName], u.[email], u.[phone], u.firebaseUserId
                    FROM Property p
                    LEFT JOIN [User] u ON p.userId = u.[Id]
                    WHERE (p.Id = @id) AND (u.firebaseUserId = @firebaseUserId)
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var property = new Property();

                    if (reader.Read())
                    {
                        property = new Property()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Address = DbUtils.GetString(reader, "address"),
                            ServiceCharge = DbUtils.GetInt(reader, "serviceCharge"),
                            LastService = DbUtils.GetDateTime(reader, "lastService"),
                            Notes = DbUtils.GetNullableString(reader, "notes"),
                            Image = DbUtils.GetString(reader, "image"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UsersId"),
                                Name = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "email"),
                                Phone = DbUtils.GetString(reader, "phone"),
                                FirebaseUserId = DbUtils.GetString(reader, "firebaseUserId")
                            }
                        };
                    }
                    reader.Close();

                    return property;
                }
            }
        }

        public void Add(Property property)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Property ([Name], Address, ServiceCharge, LastService, Notes, Image, UserId)
                    OUTPUT INSERTED.ID
                    VALUES(@Name, @Address, @ServiceCharge, @LastService, @Notes, @Image, @UserId);
                    ";

                    DbUtils.AddParameter(cmd, "@Name", property.Name);
                    DbUtils.AddParameter(cmd, "@Address", property.Address);
                    DbUtils.AddParameter(cmd, "@ServiceCharge", property.ServiceCharge);
                    DbUtils.AddParameter(cmd, "@LastService", property.LastService);
                    DbUtils.AddParameter(cmd, "@Notes", property.Notes);
                    DbUtils.AddParameter(cmd, "@Image", property.Image);
                    DbUtils.AddParameter(cmd, "@UserId", property.UserId);

                    property.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Property property)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Property
                    SET [Name] = @name,
                        Address = @address,
                        ServiceCharge = @serviceCharge,
                        LastService = @lastService,
                        Notes = @notes,
                        Image = @image
                    WHERE [Id] = @id
                    ";

                    DbUtils.AddParameter(cmd, "@name", property.Name);
                    DbUtils.AddParameter(cmd, "@address", property.Address);
                    DbUtils.AddParameter(cmd, "@serviceCharge", property.ServiceCharge);
                    DbUtils.AddParameter(cmd, "@lastService", property.LastService);
                    DbUtils.AddParameter(cmd, "@notes", property.Notes);
                    DbUtils.AddParameter(cmd, "@image", property.Image);
                    DbUtils.AddParameter(cmd, "@id", property.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Property
                    WHERE Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Property> Search(string criterion, string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.id, p.[name], p.address, p.serviceCharge, p.lastService, p.notes, p.image, p.userId,
                           u.Id AS UsersId, u.[Name] as UserName, u.email, u.phone, u.firebaseUserId
                    FROM Property p
                    LEFT JOIN [User] u ON p.userId = u.[Id]
                    WHERE ((p.address LIKE @Criterion) OR (p.[name] LIKE @Criterion)) AND (u.firebaseUserId = @firebaseUserId) 
                    ";

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var properties = new List<Property>();

                    while (reader.Read())
                    {
                        properties.Add(new Property()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Address = DbUtils.GetString(reader, "address"),
                            ServiceCharge = DbUtils.GetInt(reader, "serviceCharge"),
                            LastService = DbUtils.GetDateTime(reader, "lastService"),
                            Notes = DbUtils.GetNullableString(reader, "notes"),
                            Image = DbUtils.GetString(reader, "image"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UsersId"),
                                Name = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "email"),
                                Phone = DbUtils.GetString(reader, "phone"),
                                FirebaseUserId = DbUtils.GetString(reader, "firebaseUserId")
                            }
                        });
                    }

                    reader.Close();

                    return properties;
                }
            }
        }
    }
}
