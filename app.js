//console.log("Hello FSW 1 Luar biasa");
const fs = require("fs"); //untuk memanggil isi json dan ini tidak perlu instal karena bawaan nodejs
const express = require("express"); //memanggil express
const app = express(); //inisialisasi app dengan memanggil express
const PORT = 8000; // localhost: 8000

// middleware untuk membaca json dari request body dari client
app.use(express.json());

// inisialisasi untuk membaca data json
const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

//anonymous function menggunakan parameter req,res,next
app.get("/", (req, res, next) => {
  res.send("<h1>Hello FSW 1 Tercinta..</h1>");
});

// memanggil data dummy json yg ada di folder data
// /api/v1/customers  => merupakan penamaan yg sesuai dengan aturan API dimana nama api terus versi dan collection atau datanya
app.get("/api/v1/customers", (req, res, next) => {
  res.status(200).json({
    status: "success",
    totData: customers.length,
    data: {
      customers,
    },
  });
});

// app.post("/api/v1/customers", (req, res) => {
//   console.log(req.body);
//   res.send("selesai"); //harus ada akhiran res dalam rest api dengan express agar tidak mutar terus req nya atau load
// });

app.post("/api/v1/customers", (req, res) => {
  console.log(req.body);

  const newCustomer = req.body;
  customers.push(newCustomer);

  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          customer: newCustomer,
        },
      });
    },
  );
});

app.listen(PORT, () => {
  console.log(`APP running on port : ${PORT}`);
});
