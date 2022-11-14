import PetCategory from "../models/PetCategory.js";

export const getAllPetCategories = async (req, res) => {
  try {
    const petCategories = await PetCategory.find();
    res.status(200).json(petCategories);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createPetCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const created = await PetCategory.create({
      name,
    });

    res.status(200).json({ message: "Category successfuly created.", created });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const updatePetCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const updateCategory = await PetCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deletePetCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await PetCategory.findByIdAndDelete(id);
    res.status(200).json({ message: `item id: ${id} is deleted`, deleted });
  } catch (error) {
    res.status(400).json(error);
  }
};
