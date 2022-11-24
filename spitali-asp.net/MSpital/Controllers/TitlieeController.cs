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


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Titulli.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TitleController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public TitleController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        // GET: api/values
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select TitleId, Namee, Surname,
                            convert(varchar(10),Titlee,120) as Titlee
                            from
                            dbo.Title
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
        public JsonResult Post(Title tit)
        {
            string query = @"
                           insert into dbo.Title
                           (Namee,Surname,Titlee)
                    values (@Namee,@Surname,@Titlee)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Namee", tit.Namee);
                    myCommand.Parameters.AddWithValue("@Surname", tit.Surname);
                    myCommand.Parameters.AddWithValue("@Titlee", tit.Titlee);
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
        public JsonResult Put(Title tit)
        {
            string query = @"
                           update dbo.Title
                           set Namee = @Namee,
                           Surname = @Surname,
                           Titlee = @Titlee
                           where TitleId = @TitleId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TitleId", tit.TitleId);
                    myCommand.Parameters.AddWithValue("@Namee", tit.Namee);
                    myCommand.Parameters.AddWithValue("@Surname", tit.Surname);
                    myCommand.Parameters.AddWithValue("@Titlee", tit.Titlee);
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
                           delete from dbo.Title
                            where TitleId = @TitleId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TitleId", id);

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

