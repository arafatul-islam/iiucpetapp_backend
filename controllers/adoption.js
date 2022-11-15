import Adoption from "../models/Adoption.js";

export const createAdoption = async (req, res) => {
  try {
    const { firstName, lastName, email, address, phone, pet } = req.body;

    const allAdoption = await Adoption.find();

    const isExist = allAdoption.find((adoption) => adoption.pet == pet);

    if (!isExist) {
      const createdAdoption = await Adoption.create({
        firstName,
        lastName,
        email,
        address,
        phone,
        pet,
      });

      res.json({ message: "adoption created", createdAdoption });
    } else {
      res.json("adoption post already exists");
    }
  } catch (error) {
    res.json(error);
  }
};

export const updateAdoption = async (req, res) => {
  try {
    const { adoptionid } = req.params;
    const updatedAdoption = await Adoption.findByIdAndUpdate(
      adoptionid,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "adoption updated", updatedAdoption });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteAdoption = async (req, res) => {
  try {
    const { adoptionid } = req.params;
    const isExist = await Adoption.findById(adoptionid);
    if (!isExist) {
      res.json("already deleted!!");
    } else {
      const deletedAdoption = await Adoption.findByIdAndDelete(adoptionid);
      res.json(`deletedAdoption: ${adoptionid}`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find();
    res.json(adoptions);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOneAdoption = async (req, res) => {
  try {
    const { adoptionid } = req.params;
    const adoption = await Adoption.findById(adoptionid);
    res.json(adoption);
  } catch (error) {
    res.status(500).json(error);
  }
};
