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
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace AppointmentTypess.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentTypesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public AppointmentTypesController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select AppointmentTypesId, AppointmentType, UsualAppointmentLength,
                            convert(varchar(10),OnlineBookingAvailable,120) as OnlineBookingAvailable
                            from
                            dbo.AppointmentTypes
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

        // POST api/values
        [HttpPost]
        public JsonResult Post(AppointmentTypes at)
        {
            string query = @"
                            insert into dbo.AppointmentTypes
                            (AppointmentType,UsualAppointmentLength,OnlineBookingAvailable)
                            values (@AppointmentType,@UsualAppointmentLength,@OnlineBookingAvailable)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AppointmentType", at.AppointmentType);
                    myCommand.Parameters.AddWithValue("@UsualAppointmentLength", at.UsualAppointmentLength);
                    myCommand.Parameters.AddWithValue("@OnlineBookingAvailable", at.OnlineBookingAvailable);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        // PUT api/values/5
        [HttpPut]
        public JsonResult Put(AppointmentTypes at)
        {
            string query = @"
                           update dbo.AppointmentTypes
                           set AppointmentType= @AppointmentType,
                            UsualAppointmentLength= @UsualAppointmentLength,
                            OnlineBookingAvailable= @OnlineBookingAvailable
                            where AppointmentTypesId=@AppointmentTypesId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AppointmentTypesId", at.AppointmentTypesId);
                    myCommand.Parameters.AddWithValue("@AppointmentType", at.AppointmentType);
                    myCommand.Parameters.AddWithValue("@UsualAppointmentLength", at.UsualAppointmentLength);
                    myCommand.Parameters.AddWithValue("@OnlineBookingAvailable", at.OnlineBookingAvailable);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.AppointmentTypes
                            where AppointmentTypesId=@AppointmentTypesId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AppointmentTypesId", id);
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

