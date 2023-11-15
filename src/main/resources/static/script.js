function kayitekle() {
var ad=document.getElementById('ad').value;
var soyad=document.getElementById('soyad').value;
var yas=document.getElementById('yas').value;
$.ajax({
    type: "GET",
    url: "/personel/kaydet?ad=" + ad + "&soyad=" + soyad+ "&yas=" + yas,
    dataType: "json",
    success: function(result, status, xhr) {
      // AJAX isteği başarılı bir şekilde tamamlandığında yapılacak işlemler
      location.reload();
    },
    error: function(xhr, status, error) {
      // AJAX isteği sırasında bir hata oluştuğunda yapılacak işlemler
    }
  });
}

function silicic(the) {
  $.ajax({
            type: "GET",
            url: "/personel/sil?id="+the,
            dataType: "json",
          success: function(result, status, xhr) {
                // AJAX isteği başarılı bir şekilde tamamlandığında yapılacak işlemler
                location.reload();
              },
              error: function(xhr, status, error) {
                // AJAX isteği sırasında bir hata oluştuğunda yapılacak işlemler
              }

});
}
function aramaYap() {
  var aramaTerimi = document.getElementById("aramaTerimi").value;

  $.ajax({
    type: "GET",
    url: "/personel/arama?ad=" + aramaTerimi,
    dataType: "json",
    success: function(result, status, xhr) {
      // AJAX isteği başarılı bir şekilde tamamlandığında yapılacak işlemler
      sonuclariGoster(result);
    },
    error: function(xhr, status, error) {
      // AJAX isteği sırasında bir hata oluştuğunda yapılacak işlemler
    }
  });
}

function sonuclariGoster(sonuclar) {
  // Sonuçları görüntüleme işlemi
  var sonucDiv = document.getElementById("sonuclar");
  sonucDiv.innerHTML = ""; // Önceki sonuçları temizle

  for (var i = 0; i < sonuclar.length; i++) {
    var sonuc = sonuclar[i];
    var sonucHTML = "<p><strong>Name:</strong> " + sonuc.ad + ", <strong>Lastname:</strong> " + sonuc.soyad + ", <strong>Age:</strong> " + sonuc.yas + "</p>";
    sonucDiv.innerHTML += sonucHTML;
  }
}

$(document).ready(function() {
    function fetchData() {
        $.ajax({
                type: "GET",
                url: "/personel/ozluk",
                dataType: "json",
                success: function(result, status, xhr) {
                var table = "<table class=\"mytable\"><tr><th>id</th><th>name</th><th>lastname</th><th>age</th><th>del</th></tr>";

                result.forEach(function(row) {
                table += "<tr><td>" + row['key'] + "</td><td>" + row['ad'] + "</td><td>" + row['soyad'] + "</td><td>" + row['yas'] + "</td><td><button onClick='silicic(" + row['key'] + ")' class='sil-button'>del</button></td></tr>";
                });

                table += "</table>";
                $("#table").html(table);
            },
            error: function(result, status, xhr) {
             alert("sonuc:"+status+""+error+""+xhr.status+""+xhr.statusText)
            }
        });
    }

    fetchData();
});
