using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MAPP.Models;
using System.Text;
using System.Data;
using System.IO;

namespace MAPP.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult viewOnMap()
        {
            return View();
        }
   
        public string getEmployee(employeeDetail obj)
        {
           
            var JSONString = DataTableToJSONWithStringBuilder(obj.getDataSet().Tables[0]);
            return JSONString;
        }
        [HttpPost]
        public ActionResult UploadFiles()
        {
           
            string fname;
           

            if (Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];

                        string nameOfFile;
                      
                        var id = Request.Form["ID"];
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }
                        nameOfFile = fname;
                        Stream fileStream = file.InputStream;
                        int fileLength = file.ContentLength;
                        byte[] fileData = new byte[fileLength];
                        fileStream.Read(fileData, 0, fileLength);
                        fname = Path.Combine(Server.MapPath("~/Uploads/"), fname);

                        file.SaveAs(fname);
                       
                        string extension = Path.GetExtension(fname);

                       
                    }

                    return View();
                }
                catch (Exception ex)
                {
                    return Json(new { resText = "Error occurred. Error details: " + ex.Message, result = 0 });
                }

            }
            else
            {

                return Json(new { resText = "No files selected. ", result = 0 });
            }
        }

        public string getEmployeebyId(int id)
        {
            employeeDetail obj = new employeeDetail();
            obj.optMode = "getDetailById";
            obj.employeeId=id;
            var JSONString = DataTableToJSONWithStringBuilder(obj.getDataSet().Tables[0]);
            return JSONString;
        }
        public string DataTableToJSONWithStringBuilder(DataTable table)
        {
            var JSONString = new StringBuilder();
            if (table.Rows.Count > 0)
            {
                JSONString.Append("[");
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JSONString.Append("{");
                    for (int j = 0; j < table.Columns.Count; j++)
                    {
                        if (j < table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\",");
                        }
                        else if (j == table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\"");
                        }
                    }
                    if (i == table.Rows.Count - 1)
                    {
                        JSONString.Append("}");
                    }
                    else
                    {
                        JSONString.Append("},");
                    }
                }
                JSONString.Append("]");
            }
            return JSONString.ToString();
        }
        public ActionResult addNewMember()
        {
            return View();
        }

        [HttpPost]
        public JsonResult employeeMasterSave(employeeDetail obj)
        {
            string msg = "";           
            obj.save(out msg);
            return new JsonResult
            {
                Data = msg,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }


    }
}