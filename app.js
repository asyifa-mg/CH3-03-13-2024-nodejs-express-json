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

// //api utk get data by id
// const getCustomersById = (req, res, next) => {
//   //shorhcut pemanggilan objek
//   const id = req.params.id;
//   //menggunakan array method untuk membntu menemukan spesifik data
//   const customer = customers.find((cust) => cust._id === id);
//   //console.log(customer);
//   res.status(200).json({
//     status: "success",
//     data: {
//       customer,
//     },
//   });
// };

// //api untuk update data
// const updateCustomer = (req, res) => {
//   const id = req.params.id;
//   console.log("masuk tidak ya");

//   //1. lakukan pencarian data yang sesuai parameter id nya
//   const customer = customers.find((cust) => cust._id === id);
//   const customerIndex = customers.findIndex((cust) => cust._id === id);

//   // 2. ada gak data customer nya
//   if (!customer) {
//     //pencarian jika data tdk ada
//     return res.status(404).json({
//       status: "fail",
//       message: `Customer dengan ID: ${id}" gak ada`,
//     });
//   }
//   //3. kalau ada berarti update data nya sesuai request body dari client/user
//   customers[customerIndex] = { ...customers[customerIndex], ...req.body };
//   console.log(customers[customerIndex]);
//   //4. melakukan update didokumen
//   fs.writeFile(
//     `${__dirname}/data/dummy.json`,
//     JSON.stringify(customers),
//     (err) => {
//       res.status(201).json({
//         status: "success",
//         message: "berhasil update data",
//         data: {
//           customer: customer[customerIndex],
//           customer,
//         },
//       });
//     },
//   );
//   //res.status(200).json({});
// };

// //API UNTUK DELETE DATA
// const deleteCustomer = (req, res) => {
//   const id = req.params.id;
//   //console.log("masuk tidak ya");
//   //1. lakukan pencarian data yang sesuai parameter id nya
//   const customer = customers.find((cust) => cust._id === id);
//   const customerIndex = customers.findIndex((cust) => cust._id === id);

//   // // 2. ada gak data customer nya
//   if (!customer) {
//     //pencarian jika data tdk ada
//     return res.status(404).json({
//       status: "fail",
//       message: `Customer dengan ID: ${id}" gak ada`,
//     });
//   }
//   //3. kalau ada berarti update data nya sesuai request body dari client/user
//   customers.splice(customerIndex, 1);
//   //4. melakukan update didokumen
//   fs.writeFile(
//     `${__dirname}/data/dummy.json`,
//     JSON.stringify(customers),
//     (err) => {
//       res.status(201).json({
//         status: "success",
//         message: "berhasil delete data",
//         data: {
//           customer: customer[customerIndex],
//           customer,
//         },
//       });
//     },
//   );
// };

// app.get("/", defaultRouter);
// app.route("/api/v1/customers").get(getCustomers).post(createCustomer);
// app
//   .route("/api/v1/customers/:id")
//   .get(getCustomersById)
//   .patch(updateCustomer)
//   .delete(deleteCustomer);

// app.listen(PORT, () => {
//   console.log(`APP running on port : ${PORT}`);
// });
