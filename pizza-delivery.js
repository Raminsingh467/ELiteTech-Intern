import React, { useState } from "react";

const PizzaCustomization = () => {
  const [step, setStep] = useState(1);
  const [pizza, setPizza] = useState({
    base: "",
    sauce: "",
    cheese: "",
    veggies: [],
  });

  const bases = ["Thin Crust", "Thick Crust", "Gluten-Free", "Stuffed", "Flatbread"];
  const sauces = ["Tomato", "Alfredo", "Pesto", "BBQ", "Garlic Parmesan"];
  const cheeses = ["Mozzarella", "Cheddar", "Parmesan", "Vegan", "Feta"];
  const veggies = ["Tomatoes", "Onions", "Peppers", "Olives", "Mushrooms", "Spinach"];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSelection = (key, value) => {
    if (key === "veggies") {
      setPizza((prev) => ({
        ...prev,
        veggies: prev.veggies.includes(value)
          ? prev.veggies.filter((item) => item !== value)
          : [...prev.veggies, value],
      }));
    } else {
      setPizza({ ...pizza, [key]: value });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3>Choose Pizza Base</h3>
            {bases.map((base) => (
              <button
                key={base}
                onClick={() => handleSelection("base", base)}
                className={pizza.base === base ? "selected" : ""}
              >
                {base}
              </button>
            ))}
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Choose Sauce</h3>
            {sauces.map((sauce) => (
              <button
                key={sauce}
                onClick={() => handleSelection("sauce", sauce)}
                className={pizza.sauce === sauce ? "selected" : ""}
              >
                {sauce}
              </button>
            ))}
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Select Cheese</h3>
            {cheeses.map((cheese) => (
              <button
                key={cheese}
                onClick={() => handleSelection("cheese", cheese)}
                className={pizza.cheese === cheese ? "selected" : ""}
              >
                {cheese}
              </button>
            ))}
          </div>
        );
      case 4:
        return (
          <div>
            <h3>Pick Veggies</h3>
            {veggies.map((veggie) => (
              <button
                key={veggie}
                onClick={() => handleSelection("veggies", veggie)}
                className={pizza.veggies.includes(veggie) ? "selected" : ""}
              >
                {veggie}
              </button>
            ))}
          </div>
        );
      default:
        return (
          <div>
            <h3>Pizza Summary</h3>
            <p>Base: {pizza.base}</p>
            <p>Sauce: {pizza.sauce}</p>
            <p>Cheese: {pizza.cheese}</p>
            <p>Veggies: {pizza.veggies.join(", ")}</p>
          </div>
        );
    }
  };

  return (
    <div>
      <h2>Create Your Custom Pizza</h2>
      {renderStepContent()}
      <div>
        {step > 1 && <button onClick={handleBack}>Back</button>}
        {step < 5 && <button onClick={handleNext}>Next</button>}
      </div>
    </div>
  );
};

export default PizzaCustomization;

===========================================================
////node .js + express
=========================================================

const express = require("express");
const router = express.Router();
const PizzaOrder = require("../models/PizzaOrder");
const Inventory = require("../models/Inventory");

// Save Pizza Order
router.post("/pizza", async (req, res) => {
  const { base, sauce, cheese, veggies, userId } = req.body;

  try {
    // Deduct inventory
    const inventory = await Inventory.findOne();
    inventory.base[base] -= 1;
    inventory.sauce[sauce] -= 1;
    inventory.cheese[cheese] -= 1;
    veggies.forEach((veggie) => {
      inventory.veggies[veggie] -= 1;
    });

    if (inventory.base[base] < 0 || inventory.sauce[sauce] < 0) {
      return res.status(400).send("Insufficient inventory.");
    }

    await inventory.save();

    // Save the order
    const newOrder = new PizzaOrder({ userId, base, sauce, cheese, veggies });
    await newOrder.save();

    res.status(200).send({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;

====================================================
Endpoint javascript
========================================================

const express = require("express");
const router = express.Router();
const PizzaOrder = require("../models/PizzaOrder");
const Inventory = require("../models/Inventory");

// Save Pizza Order
router.post("/pizza", async (req, res) => {
  const { base, sauce, cheese, veggies, userId } = req.body;

  try {
    // Deduct inventory
    const inventory = await Inventory.findOne();
    inventory.base[base] -= 1;
    inventory.sauce[sauce] -= 1;
    inventory.cheese[cheese] -= 1;
    veggies.forEach((veggie) => {
      inventory.veggies[veggie] -= 1;
    });

    if (inventory.base[base] < 0 || inventory.sauce[sauce] < 0) {
      return res.status(400).send("Insufficient inventory.");
    }

    await inventory.save();

    // Save the order
    const newOrder = new PizzaOrder({ userId, base, sauce, cheese, veggies });
    await newOrder.save();

    res.status(200).send({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
/*
=======================================================================
Database Mongo DB
==========================================================================
*/
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  base: { type: Map, of: Number },
  sauce: { type: Map, of: Number },
  cheese: { type: Map, of: Number },
  veggies: { type: Map, of: Number },
});

module.exports = mongoose.model("Inventory", inventorySchema);
