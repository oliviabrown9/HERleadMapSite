using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MAPP.Models
{
    public class employeeDetail :commonClass
    {
       public long employeeId { get; set; }
       public string name { get; set; }
       public string facebookLink { get; set; }
       public string instagramLink  { get; set; }
       public string twitterLink{ get; set; }
       public string email  { get; set; }
       public string currentCity { get; set; }
       public string permanentCity   { get; set; }
       public string herLeadProject { get; set; }
       public string projectDescription { get; set; }
       public string projectCategory { get; set; }
       public string school  { get; set; }
       public string fellowShipYear  { get; set; }
       public string lattitude   { get; set; }
       public string lontitude   { get; set; }
       public string image  { get; set; }
        public string optMode { get; set; }
    public DataTable dtDetail { get; set; }

        public DataSet getDataSet()
        {
            string connectionString = conClass.connectString;
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlDataAdapter da = new SqlDataAdapter("employeeDetailSp", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@employeeId", this.employeeId);
                da.SelectCommand.Parameters.AddWithValue("@optMode", this.optMode);
                da.SelectCommand.Parameters.AddWithValue("@currentCity", this.currentCity);
                da.SelectCommand.Parameters.AddWithValue("@permanentCity", this.permanentCity);
                da.SelectCommand.Parameters.AddWithValue("@projectCategory", this.projectCategory);
                da.SelectCommand.Parameters.AddWithValue("@fellowShipYear", this.fellowShipYear);

                DataSet ds = new DataSet();

                da.Fill(ds);
                return ds;
            }
        }

        public void getEmployeeDetail()
        {
            DataSet ds = new DataSet();
            ds = getDataSet();
            if (ds != null)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    this.dtDetail = ds.Tables[0];
                }
            }
        }

        public void save(out string message)
        {
            string connectionString = conClass.connectString;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("employeeDetailSp_Crud", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@employeeId", this.employeeId);
                cmd.Parameters.AddWithValue("@name", this.name);
                cmd.Parameters.AddWithValue("@facebookLink", this.facebookLink);
                cmd.Parameters.AddWithValue("@instagramLink", this.instagramLink);
                cmd.Parameters.AddWithValue("@twitterLink", this.twitterLink);
                cmd.Parameters.AddWithValue("@email", this.email);
                cmd.Parameters.AddWithValue("@currentCity", this.currentCity);
                cmd.Parameters.AddWithValue("@permanentCity", this.permanentCity);
                cmd.Parameters.AddWithValue("@herLeadProject", this.herLeadProject);
                cmd.Parameters.AddWithValue("@projectDescription", this.projectDescription);
                cmd.Parameters.AddWithValue("@projectCategory", this.projectCategory);
                cmd.Parameters.AddWithValue("@school", this.school);
                cmd.Parameters.AddWithValue("@fellowShipYear", this.fellowShipYear);
                cmd.Parameters.AddWithValue("@lattitude", this.lattitude);
                cmd.Parameters.AddWithValue("@lontitude", this.lontitude);
                cmd.Parameters.AddWithValue("@image", this.image);
                cmd.Parameters.AddWithValue("@optMode", this.optMode);


                cmd.Parameters.Add("@msg", System.Data.SqlDbType.NVarChar, 250);
                cmd.Parameters["@msg"].Direction = ParameterDirection.Output;

                con.Open();
                cmd.ExecuteNonQuery();

                message = cmd.Parameters["@msg"].Value.ToString();

            }
        }



    }
}