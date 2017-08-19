var props ;
function getEmployee() {
    
    $.ajax({
        type: "GET",
        url: "Home/getEmployee",
        contentType: 'application/html; charset=utf-8',
       
        async: false,
        success: function (dataset) {
            
            props =$.parseJSON( dataset);
           
        }
    });
}
function searchEmployee() {
    
    
    var obj = new Object();
    obj.currentCity = $('#currentCity').val();
    obj.permanentCity = $('#permanentCity').val();
    obj.projectCategory = $('#projectCategory').val();
    obj.fellowShipYear = $('#fellowShipYear').val();
    obj.optMode = "getEmployeeBySearch";
    getEmployeebySearch(obj);
    
}
var options = {
    zoom: 14,
    mapTypeId: 'Styled',
    disableDefaultUI: true,
    mapTypeControlOptions: {
        mapTypeIds: ['Styled']
    },
    scrollwheel: true
};
var styles = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "color": "#F50E77"
        }
    ]
},
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#fff"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fff"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#F50E77"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#fff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fff"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#F50E77"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#F50E77"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fff"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#76C3F5"
            }
        ]
    }
];

var markers = [];



var infobox = new InfoBox({
    disableAutoPan: false,
    maxWidth: 202,
    pixelOffset: new google.maps.Size(-101, -285),
    zIndex: null,
    boxStyle: {
        background: "url('images/infobox-bg.png') no-repeat",
        opacity: 1,
        width: "202px",
        height: "245px"
    },
    closeBoxMargin: "28px 26px 0px 0px",
    closeBoxURL: "",
    infoBoxClearance: new google.maps.Size(1, 1),
    pane: "floatPane",
    enableEventPropagation: false
});

var addMarkers = function (props, map) {
    $.each(props, function (i, prop) {
        var latlng = new google.maps.LatLng(prop.lat, prop.lng);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: new google.maps.MarkerImage(
                'images/' + prop.markerIcon,
                null,
                null,
                // new google.maps.Point(0,0),
                null,
                new google.maps.Size(50, 50)
            ),
            draggable: false,
            animation: google.maps.Animation.DROP,
        });
        var infoboxContent = '<div class="infoW">' +
                                '<div class="propImg">' +
                                    '<img src="images/prop/' + prop.image + '">' +

                                '</div>' +
                                '<div class="paWrapper">' +
                                    '<div class="propTitle">' + prop.title + '</div>' +
                                    '<div class="propAddress">' + prop.projectCategory + '</div>' +
                                '</div>' +
                                '<div class="paWrapper">' +
                                    '<div class="propTitle">' + prop.permanentCity + '</div>' +
                                    '<div class="propAddress">' + prop.city + '</div>' +
                                '</div>' +

                                '<div class="clearfix"></div>' +
                                '<div class="infoButtons">' +
                                    '<a class="btn btn-sm btn-round btn-gray btn-o closeInfo">Close</a>' +
                                    '<a href="#" data-toggle="modal" data-target="#contactAgent" onclick="bindSingleDetail(' + prop.employeeId + ')" class="btn btn-sm btn-round btn-red viewInfo">View</a>' +
                                '</div>' +
                             '</div> ';

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infobox.setContent(infoboxContent);

                infobox.open(map, marker);
            }
        })(marker, i));

        $(document).on('click', '.closeInfo', function () {
            infobox.open(null, null);
        });

        markers.push(marker);
    });
}

var map;
function getEmployeebySearch(obj) {
  
   
   
    $.ajax({
        type: 'POST',
        url: "/Home/getEmployee",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{'obj':" + JSON.stringify(obj) + "}",
        async: false,
        success: function (dataset) {
           
            setTimeout(function () {
                $('body').removeClass('notransition');

                if ($('#home-map').length > 0) {
                    map = new google.maps.Map(document.getElementById('home-map'), options);
                    var styledMapType = new google.maps.StyledMapType(styles, {
                        name: 'Styled'
                    });

                    map.mapTypes.set('Styled', styledMapType);
                    map.setCenter(new google.maps.LatLng(46.778259, -110.417931));
                    map.setZoom(4);

                    addMarkers(props, map);
                }
            }, 300);
       
            props = (dataset);
           
           
        }
      
    });
}
function addEditEmployee() {
    //Ajax call here
    debugger
    if ($('#latitude').text() === '' || $('#longitude').text() === '')
    {
        alert('Please drag Pin on map to save your exact location');
        return;
    }
    if ($('#name').val() === '' || $('#email').val() === '') {
        alert('Name & Email are mandatory field');
        return;
    }
        var obj = new Object();
        obj.employeeId = $('#employeeId').val();
        obj.name = $('#name').val();
        obj.facebookLink = $('#facebookLink').val();
        obj.instagramLink = $('#instagramLink').val();
        obj.twitterLink = $('#twitterLink').val();
        obj.email = $('#email').val();
        obj.currentCity = $('#currentCity').val();
        obj.permanentCity = $('#permanentCity').val();
        obj.herLeadProject = $('#herLeadProject').val();
        obj.projectDescription = $('#projectDescription').val();
        obj.projectCategory = $('#projectCategory').val();
        obj.school = $('#school').val();
        obj.fellowShipYear = $('#fellowShipYear').val();
        obj.lattitude = $('#latitude').text();
        obj.lontitude = $('#longitude').text();
        var fileUpload = $("#image").get(0);
        var files = fileUpload.files;
        for (var i = 0; i < files.length; i++) {
            obj.image = (files[i].name);
        }
        
        upload();
        employeeMasterSave(obj);
    
}

function employeeMasterSave(obj) {
    $.ajax({
        type: 'POST',
        url: "Home/employeeMasterSave",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{'obj':" + JSON.stringify(obj) + "}",
        async: false,
        success: function (Data) {
            
            alert('Record Saved Successfully...!!')
            $('#employeeId').val('');
            $('#name').val('');
            $('#email').val('');
            $('#facebookLink').val('');
            $('#instagramLink').val('');
            $('#twitterLink').val('');
           
            $('#currentCity').val('');
            $('#permanentCity').val('');
            $('#herLeadProject').val('');;
            $('#projectDescription').val('');
            $('#projectCategory').val('');
            $('#school').val('');
            $('#fellowShipYear').val('');
           
        },
        error: function (err) {
            alert(err.message + "|3");
        }
    });
}

function bindSingleDetail(id) {
 debugger
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Home/getEmployeebyId",
        dataType: "json",
        data: "{'id':" + id + "}",
       
               
        success: function (d) {
           
            var result = (d);
           
            
            for (var i = 0; i < result.length; i++) {
               
                var b='';
                b=b+'  <div class="contactForm"> <div class="row">';
                b=b+'                       <div class="summary">';
                b=b+'                           <div class="row">';
                b=b+'                               <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
                b=b+'                                   <div class="agentAvatar summaryItem">';
                b=b+'                                       <div class="clearfix"></div>';
                b = b + '                                       <img class="avatar agentAvatarImg" src="Uploads/' + result[i].image + '" alt="">';
                b = b + '                                       <div class="agentName">' + result[i].name + '</div>';
                b=b+'                                   </div>';
                b=b+'                               </div>';
                b=b+'                               <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">';
                b=b+'                                   <div class="agentAvatar summaryItem">';
                b=b+'                                       <div class="clearfix"></div>';
                b = b + '                                      <b> project Catgory :' + result[i].projectCategory ;
                b=b+'                                       <br />';
                b = b + '                                       her lead ' + result[i].herLeadProject;
                b=b+'                                       <br />';
                b = b + '                                       School :' + result[i].school;
                b=b+'                                       <br />';
                b = b + '                                       fellowShip year :' + result[i].fellowShipYear;
                b = b + '                                       <br />';
                b = b + '                                       Current City :' + result[i].currentCity;
                b = b + '                                       <br />';
                b = b + '                                       Permanent City :' +result[i].permanentCity;
                b = b + '                                       <br /></b>';
                b=b+'                                   </div>';
                b=b+'                               </div>';
                b=b+'                           </div>';
                b=b+'                       </div>';
                b=b+'                       <div class="description">';
                b=b+'                           <h3>Description</h3>';
                b = b + '                           <p>' + result[i].projectDescription + '</p>';
                b=b+'                       </div>';
                b=b+'                       <div class="share">';
                b=b+'                           <h3>Share on Social Networks</h3>';
                b=b+'                           <div class="row">';
                b=b+'                               <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 shareItem">';
                b = b + '                                   <a href="' + result[i].facebookLink + '" target="_blank" class="btn btn-sm btn-round btn-o btn-facebook"><span class="fa fa-facebook"></span> Facebook</a>';
                b=b+'                               </div>';
                b=b+'                               <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 shareItem">';
                b = b + '                                   <a href="' + result[i].twitterLink + '" target="_blank" class="btn btn-sm btn-round btn-o btn-twitter"><span class="fa fa-twitter"></span> Twitter</a>';
                b=b+'                               </div>';
                b=b+'                               <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 shareItem">';
                b = b + '                                   <a href="' + result[i].email + '" target="_blank" class="btn btn-sm btn-round btn-o btn-google"><span class="fa fa-google-plus"></span> Google+</a>';
                b=b+'                               </div>';
                b=b+'                               <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 shareItem">';
                b = b + '                                   <a href="' + result[i].instagramLink + '" target="_blank" class="btn btn-sm btn-round btn-o btn-pinterest"><span class="fa fa-instagram"></span> Instagram</a>';
                b=b+'                               </div>';
                b=b+'                           </div>';
                b=b+'                       </div>';
                b=b+'                   </div>';
                b = b + '               </div>';
            }
            $("#detail").html(b);
        }
    })

}

function upload()
{
    alert('clled');
  debugger
    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {  
  
        var fileUpload = $("#image").get(0);  
        var files = fileUpload.files;  
              
        // Create FormData object  
        var fileData = new FormData();  
  
        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {  
            fileData.append(files[i].name, files[i]);  
        }  
              
        // Adding one more key to FormData object  
        fileData.append('username', 'Manas');  
  
        $.ajax({  
            url: 'Home/UploadFiles',  
            type: "POST",  
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,  
            success: function (result) {  
                alert('Image Uploaded Successfully..!');  
            },  
            error: function (err) {  
                alert(err.statusText);  
            }  
        });  
    } else {  
        alert("FormData is not supported.");  
    }  

}