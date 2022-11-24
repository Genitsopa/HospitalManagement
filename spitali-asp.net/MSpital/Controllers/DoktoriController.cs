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

namespace Doktorii.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoktoriController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public DoktoriController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select DoktoriId, Emri, Mbiemri, Gjinia, Titulli, 
                            convert(varchar(10),Mosha,120) as Mosha
                            from
                            dbo.Doktori
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
        public JsonResult Post(Doktori dr)
        {
            string query = @"
                            insert into dbo.Doktori
                            (Emri,Mbiemri,Gjinia,Titulli,Mosha)
                            values (@Emri,@Mbiemri,@Gjinia,@Titulli,@Mosha)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Emri", dr.Emri);
                    myCommand.Parameters.AddWithValue("@Mbiemri", dr.Mbiemri);
                    myCommand.Parameters.AddWithValue("@Gjinia", dr.Gjinia);
                    myCommand.Parameters.AddWithValue("@Titulli", dr.Titulli);
                    myCommand.Parameters.AddWithValue("@Mosha", dr.Mosha);
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
        public JsonResult Put(Doktori dr)
        {
            string query = @"
                            update dbo.Doktori
                            set Emri = @Emri,
                            Mbiemri = @Mbiemri,
                            Gjinia = @Gjinia,
                            Titulli = @Titulli,
                            Mosha = @Mosha
                            where DoktoriId = @DoktoriId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DoktoriId", dr.DoktoriId);
                    myCommand.Parameters.AddWithValue("@Emri", dr.Emri);
                    myCommand.Parameters.AddWithValue("@Mbiemri", dr.Mbiemri);
                    myCommand.Parameters.AddWithValue("@Gjinia", dr.Gjinia);
                    myCommand.Parameters.AddWithValue("@Titulli", dr.Titulli);
                    myCommand.Parameters.AddWithValue("@Mosha", dr.Mosha);
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
                            delete from dbo.Doktori
                            where DoktoriId=@DoktoriId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DoktoriId", id);
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
