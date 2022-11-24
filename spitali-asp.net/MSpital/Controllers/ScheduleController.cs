using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MSpital.Models;

namespace ScheduleApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ScheduleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select ScheduleId, Paradite, Pasdite, NderrimiNates, PushimiDrekes from
                            dbo.Schedule
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Schedule sch)
        {
            string query = @"
                           insert into dbo.Schedule
                           (Paradite, Pasdite, NderrimiNates, PushimiDrekes)
                           values (@Paradite, @Pasdite, @NderrimiNates,     @PushimiDrekes)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Paradite", sch.Paradite);
                    myCommand.Parameters.AddWithValue("@Pasdite", sch.Pasdite);
                    myCommand.Parameters.AddWithValue("@NderrimiNates", sch.NderrimiNates);
                    myCommand.Parameters.AddWithValue("@PushimiDrekes", sch.PushimiDrekes);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Schedule sch)
        {
            string query = @"
                           update dbo.Schedule
                           set Paradite= @Paradite,
                            Pasdite=@Pasdite,
                            NderrimiNates=@NderrimiNates,
                            PushimiDrekes=@PushimiDrekes
                            where ScheduleId=@ScheduleId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ScheduleId", sch.ScheduleId);
                    myCommand.Parameters.AddWithValue("@Paradite", sch.Paradite);
                    myCommand.Parameters.AddWithValue("@Pasdite", sch.Pasdite);
                    myCommand.Parameters.AddWithValue("@NderrimiNates", sch.NderrimiNates);
                    myCommand.Parameters.AddWithValue("@PushimiDrekes", sch.PushimiDrekes);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Schedule
                            where ScheduleId=@ScheduleId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ScheduleId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
