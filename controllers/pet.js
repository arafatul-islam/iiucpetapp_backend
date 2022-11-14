import Pet from "../models/Pet.js";

export const createPet = async (req, res) => {
  try {
    console.log(req.files);
    const { name, age, breed, color, description, imageLabel, category } =
      req.body;
    const { images, additionalImages } = req.files;

    let imagepath = "";
    let additionalImagesPaths = [];

    if (images && images.length > 0) {
      imagepath = images[0].path;
    }

    if (additionalImages && additionalImages.length > 0) {
      additionalImagesPaths = additionalImages.map((file) => file.path);
    }

    const createdPet = Pet.create({
      name,
      age,
      breed,
      color,
      description,
      imageLabel,
      category,
      image: imagepath,
      additionalImages: additionalImagesPaths,
    });

    res.json({ mesage: "pet created", createdPet });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOnePet = async (req, res) => {
  try {
    const { petid } = req.params;
    const pet = await Pet.findById(petid);
    res.json(pet);
  } catch (error) {
    res.status(500).json(error);
  }
};
