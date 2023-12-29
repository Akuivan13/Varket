var cartItemsArray = [];

    function updatePrice() {
      var selectedProduct = document.getElementById("product").value;
      var priceField = document.getElementById("price");

      // Set prices based on the selected product
      switch (selectedProduct) {
        case "Product 1":
          priceField.value = "$10.00";
          break;
        case "Product 2":
          priceField.value = "$20.00";
          break;
        case "Product 3":
          priceField.value = "$30.00";
          break;
        case "Product 4":
          priceField.value = "$40.00";
          break;
        case "Product 5":
          priceField.value = "$50.00";
          break;
        case "Product 6":
          priceField.value = "$60.00";
          break;
        case "Product 7":
          priceField.value = "$70.00";
          break;
        case "Product 8":
          priceField.value = "$80.00";
          break;
        case "Product 9":
          priceField.value = "$90.00";
          break;
        case "Product 10":
          priceField.value = "$100.00";
          break;
        default:
          priceField.value = "";
      }
    }

    function addToCart() {
      var selectedProduct = document.getElementById("product").value;
      var selectedPrice = parseFloat(document.getElementById("price").value.replace("$", ""));
      var cartItems = document.getElementById("cartItems");
      var listItem = document.createElement("li");
      listItem.appendChild(document.createTextNode(selectedProduct + " - " + formatPrice(selectedPrice)));
      cartItems.appendChild(listItem);

      cartItemsArray.push(selectedProduct + " - " + selectedPrice);

      // Update total amount
      var totalAmount = cartItemsArray.reduce(function (acc, item) {
        var price = parseFloat(item.split(" - ")[1]);
        return acc + price;
      }, 0);

      document.getElementById("totalAmount").textContent = formatPrice(totalAmount);
    }

    function sendWhatsAppMessage() {
      var name = document.getElementById("name").value;
      var message = document.getElementById("message").value;
      var phone = document.getElementById("phone").value;
      var location = document.getElementById("location").value;

      // Mendapatkan waktu dan tanggal saat ini
      var currentDate = new Date();
      var formattedDate = currentDate.toLocaleDateString('id-ID');
      var formattedTime = currentDate.toLocaleTimeString('id-ID', { hour12: false });

      // Menghitung total jumlah yang harus dibayar
      var totalAmount = cartItemsArray.reduce(function (acc, item) {
        var price = parseFloat(item.split(" - ")[1]);
        return acc + price;
      }, 0);
if (!name || !message || !phone || !location) {
        alert("Harap isi semua data yang diperlukan sebelum mengirim pesan WhatsApp.");
        return; // Berhenti jika data kosong
      }
      // Membuat pesan WhatsApp dengan informasi lengkap
      var whatsappMessage = "Nama: " + name +
        "\nPesan: " + message +
        "\nNomor Telepon: " + phone +
        "\nLokasi Penerima: " + location +
        "\nWaktu Pengiriman: " + formattedDate + " " + formattedTime +
        (cartItemsArray.length > 0 ? "\nItem di Keranjang: " + cartItemsArray.join("\n") : "") +
        "\nJumlah yang Harus Dibayar: " + formatPrice(totalAmount);

      var phoneNumber = "+6282373842192";
      var whatsappLink = "https://api.whatsapp.com/send?phone=" + phoneNumber +
        "&text=" + encodeURIComponent(whatsappMessage);

      // Membuka tautan WhatsApp di jendela baru
      window.open(whatsappLink, "_blank");

      // Menampilkan notifikasi alert
      alert("Pesan berhasil dikirim ke WhatsApp!");
    }

    function formatPrice(price) {
      return "$" + price.toFixed(2);
    }