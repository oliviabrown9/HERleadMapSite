using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MAPP.Models
{
    public class commonClass
    {
    }
    public sealed class conClass
    {
        private static string _connectString = string.Empty;
        private static conClass conInstance = null;
        private conClass()
        {

        }
        public static string connectString
        {
            get
            {
                if (_connectString == string.Empty)
                {
                 
                 // conClass._connectString = "Data Source=CHANDAN-PC;Initial Catalog=MAPVIEW ;Integrated Security=true;";
                }
                return _connectString;
            }
        }
        public static conClass Instance
        {
            get
            {
                if (conInstance == null)
                {
                    conInstance = new conClass();

                }
                return conInstance;
            }
        }
    }
}