const express = require("express");
const app = express();
const port = 4444;

app.use(express.json());

let phones = [
    { name: "Xiaomi note 11", data: "2020-year", memory: "128GB", price: "220$", id: 0 },
    { name: "Xiaomi note 12", data: "2021-year", memory: "256GB", price: "300$", id: 1 },
    { name: "Iphone 12 pro max", data: "2020-year", memory: "512 GB", price: "250$", id: 2 },
    { name: "Samsung s22 ultra", data: "2022-year", memory: "256", price: "1080$", id: 3 },
    { name: "Huawei P50 Pro", data: "2022-year", memory: "256GB", price: "910$", id: 4 },
    { name: "Xonor x8", data: "2022-year", memory: "256GB", price: "300$", id: 5 },
    { name: "Vivo Y35", data: "2022-year", memory: "128GB", price: "250$", id: 6 }
]

app.get("/", (req, res) => {
    res.send("Welcome to the online store.(/phones) type this to enter the store");
});

app.get("/phones", (req, res) => {
    res.send(phones);
})

app.get("/phones/:id", (req, res) => {
    const phone = phones.filter((val) => {
        return val.id === +req.params.id;
    })[0];

    res.send(phone)
})

app.post("/create", (req, res) => {
    const length = phones.length;

    if (!req.body.name) {
        res.status(403).send("Error name validation is not true");
        return;
    }

    if (typeof req.body.name !== "string") {
        res.status(403).send("Error name validation is not true. must have string");
        return;
    }
    if (typeof req.body.memory !== "string") {
        res.status(403).send("Error memory validation is not true. must have string");
        return;
    }

    if (typeof req.body.price !== "string") {
        res.status(403).send("Error price validation is not true. must have number");
        return;
    }

    const phone = {
        name: req.body.name,
        data: req.body.data,
        memory: req.body.memory,
        price: req.body.price,
        id: length + 1,
    };

    phones.push(phone);

    res.send("Successfull");
});

app.put("/update/:id", (req, res) => {
    let idx = phones.findIndex((phone) => phone.id === +req.params.id);
    console.log(idx)

    let phon = phones[idx];

    phon.name = req.body.name || phon.name;
    phon.data = req.body.data || phon.data;
    phon.memory = req.body.memory || phon.memory;
    phon.price = req.body.price || phon.price;


    phones[idx] = phon;

    res.status(200).send("successfull");
});

app.delete("/deleted/:id", (req, res) => {
    phones = phones.filter((phone) => {
        return phone.id !== +req.params.id;
    });

    res.send("Deleted successfull");
});

app.listen(port, () => {
    console.log("Server wolking on port " + port)
})