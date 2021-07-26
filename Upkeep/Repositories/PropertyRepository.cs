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

        public List<Property> GetPropertiesByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.id, p.[name], p.address, p.serviceCharge, p.lastService, p.notes, p.image, p.userId
                    FROM Property p
                    WHERE p.userId = @userId
                    ";
                    DbUtils.AddParameter(cmd, "@userId", userId);

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
                            UserId = DbUtils.GetInt(reader, "userId")
                        });
                    }

                    reader.Close();

                    return properties;
                }
            }
        }

        public Property GetPropertyById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.id, p.[name], p.address, p.serviceCharge, p.lastService, p.notes, p.image, p.userId
                    FROM Property p
                    WHERE p.Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
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
                            UserId = DbUtils.GetInt(reader, "userId")
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
    }
}
