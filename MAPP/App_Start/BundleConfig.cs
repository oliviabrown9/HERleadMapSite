using System.Web;
using System.Web.Optimization;

namespace MAPP
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-2.1.1.min.js",
                            "~/Scripts/jquery-ui.min.js",

                            "~/Scripts/jquery-ui-touch-punch.js",
                            "~/Scripts/jquery.placeholder.js",
                            "~/Scripts/bootstrap.js",
                            "~/Scripts/jquery.touchSwipe.min.js",

                            "~/Scripts/infobox.js",
                            "~/Scripts/jquery.visible.js",
                            "~/Scripts/home.js"

                        ));



            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/Site.css",
                "~/Content/app-blue.css",
                "~/Content/app-magenta.css",
                "~/Content/app-red.css",
                "~/Content/app-yellow.css",
                "~/Content/app.css",
                "~/Content/bootstrap.css",
                "~/Content/bootstrap.min.css",
                "~/Content/datepicker.css",
                "~/Content/fileinput.min.css",
                "~/Content/font-awesome.css",
                "~/Content/fullscreen-slider.css",
                "~/Content/jquery-ui.css",
                "~/Content/jquery.tagsinput.css",
                "~/Content/simple-line-icons.css"



                ));
        }
    }
}
