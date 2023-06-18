var table_data = document.getElementById("table-data");

function creattable() {
  var xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
    true
  );
  xhttp.send();

  xhttp.onreadystatechange = function() {
    var adressdata;
    if (xhttp.readyState === 4) {
      var response = JSON.parse(xhttp.responseText);
      adressdata = response;
      var table = '<table id="tble_data">';

      for (var i = 0; i < response.length; i++) {
        if (i >= 5) {
          break;
        }
        table +=
          '<tr class="data-row" id="' +
          response[i].id +
          '"> <td class="column1">' +
          response[i].id +
          '</td><td class="column2">' +
          response[i].firstName +
          '</td><td class="column3">' +
          response[i].lastName +
          '</td><td class="column">' +
          response[i].email +
          '</td><td class="column5">' +
          response[i].phone +
          "</td></tr>";
      }

      table += "</table>";
      table_data.innerHTML = table;
    }

    var table = $("#tble_data");

    table.on("click", "tr", function() {
      var g = $(this).attr("id");
      for (i = 0; i < adressdata.length; i++) {
        if (adressdata[i].id == g) {
          var info_content = document.getElementById("info-content");
          info_content.style.display = "block";
          info_content.innerHTML = "";
          var div = document.createElement("div");
          div.innerHTML =
            "<b> User selected: </b>" +
            adressdata[i].firstName +
            adressdata[i].lastName;
          var divdescription = document.createElement("div");
          divdescription = document.createTextNode("Description:");
          var textarea = document.createElement("textarea");
          textarea.cols = "50";
          textarea.rows = "5";
          textarea.setAttribute("readonly", "readonly");
          textareatxt = document.createTextNode(adressdata[i].description);
          textarea.appendChild(textareatxt);
          var divadrssstret = document.createElement("div");
          divadrssstret.innerHTML =
            "<b> Address: </b>" + adressdata[i].address.streetAddress;
          var divadrsscity = document.createElement("div");
          divadrsscity.innerHTML =
            "<b>  City: </b>" + adressdata[i].address.city;
          var divadrssstate = document.createElement("div");
          divadrssstate.innerHTML =
            "<b> State: </b>" + adressdata[i].address.state;
          var divadrsszip = document.createElement("div");
          divadrsszip.innerHTML = "<b> Zip: </b>" + adressdata[i].address.zip;
          info_content.appendChild(div);
          info_content.appendChild(divdescription);
          info_content.appendChild(textarea);
          info_content.appendChild(divadrssstret);
          info_content.appendChild(divadrsscity);
          info_content.appendChild(divadrssstate);
          info_content.appendChild(divadrsszip);
        }
      }
      $("tr.active").removeClass("active");
      $(this).addClass("active");
    });
  };
}
creattable();
var search_box = document.getElementById("search-box");
search_box.addEventListener("keyup", function() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search-box");
  filter = input.value.toUpperCase();
  table = document.getElementById("tble_data");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});
