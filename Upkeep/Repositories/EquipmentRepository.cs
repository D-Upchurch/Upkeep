using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upkeep.Models;
using Upkeep.Utils;

namespace Upkeep.Repositories
{
    public class EquipmentRepository : BaseRepository, IEquipmentRepository
    {
        public EquipmentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Equipment> GetEquipmentByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT e.Id, e.Type, e.Make, e.Model, e.Hours, e.Notes, e.UserId, e.Image
                    FROM Equipment e
                    WHERE e.UserId = @userId
                    ";
                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var equipmentList = new List<Equipment>();

                    while (reader.Read())
                    {
                        equipmentList.Add(new Equipment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type"),
                            Make = DbUtils.GetString(reader, "Make"),
                            Model = DbUtils.GetString(reader, "Model"),
                            Hours = DbUtils.GetNullableInt(reader, "Hours"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Image = DbUtils.GetString(reader, "Image")
                        });
                    }

                    reader.Close();

                    return equipmentList;
                }
            }
        }

        public Equipment GetEquipmentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT e.Id, e.Type, e.Make, e.Model, e.Hours, e.Notes, e.UserId, e.Image
                    FROM Equipment e
                    WHERE e.Id = @Id
                    ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    var equipment = new Equipment();

                    if (reader.Read())
                    {
                        equipment = new Equipment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type"),
                            Make = DbUtils.GetString(reader, "Make"),
                            Model = DbUtils.GetString(reader, "Model"),
                            Hours = DbUtils.GetNullableInt(reader, "Hours"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Image = DbUtils.GetString(reader, "Image")
                        };
                    }
                    reader.Close();

                    return equipment;
                }
            }
        }

        public void Add(Equipment equipment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Equipment (Type, Make, Model, Hours, Notes, UserId, Image)
                    OUTPUT INSERTED.ID
                    VALUES(@Type, @Make, @Model, @Hours, @Notes, @UserId, @Image);
                    ";

                    DbUtils.AddParameter(cmd, "@Type", equipment.Type);
                    DbUtils.AddParameter(cmd, "@Make", equipment.Make);
                    DbUtils.AddParameter(cmd, "@Model", equipment.Model);
                    DbUtils.AddParameter(cmd, "@Hours", equipment.Hours);
                    DbUtils.AddParameter(cmd, "@Notes", equipment.Notes);
                    DbUtils.AddParameter(cmd, "@UserId", equipment.UserId);
                    DbUtils.AddParameter(cmd, "@Image", equipment.Image);

                    equipment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Equipment equipment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Equipment
                    SET Type = @type,
                        Make = @make,
                        Model = @model,
                        Hours = @hours,
                        Notes = @notes,
                        Image = @image
                    WHERE [Id] = @id
                    ";

                    DbUtils.AddParameter(cmd, "@type", equipment.Type);
                    DbUtils.AddParameter(cmd, "@make", equipment.Make);
                    DbUtils.AddParameter(cmd, "@model", equipment.Model);
                    DbUtils.AddParameter(cmd, "@hours", equipment.Hours);
                    DbUtils.AddParameter(cmd, "@image", equipment.Image);
                    DbUtils.AddParameter(cmd, "@id", equipment.Id);

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
                    DELETE FROM Equipment
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
