import Pet from "../models/Pet.js";
import fs from "fs";
import path from "path";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

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

    const createdPet = await Pet.create({
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

export const updatePet = async (req, res) => {
  try {
    const { petid } = req.params;
    const { name, age, breed, color, description, imageLabel, category } =
      req.body;
    const { images, additionalImages } = req.files;

    let imagepath = "";
    let additionalImagesPaths = [];

    // if (images && images.length > 0) {
    //   imagepath = images[0].path;
    // }

    // if (additionalImages && additionalImages.length > 0) {
    //   additionalImagesPaths = additionalImages.map((file) => file.path);
    // }

    const existingPet = await Pet.findById(id);

    if (additionalImagesPaths === 0) {
      additionalImagesPaths = existingPet.additionalImages;
    } else {
      Promise.all(
        existingPet.additionalImages.map(
          async (img) => await fs.unlink(path.join(__dirname, "../", img)),
          (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log("file deleted successfully");
            }
          }
        )
      )
        .then(console.log)
        .then(console.log);
    }

    if (imagepath.length === 0) {
      imagepath = existingPet.image;
    } else {
      await fs.unlink(
        path.join(__dirname, "../", existingPet.image),
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            return;
          }
        }
      );
    }
    const updatedPet = await Pet.findByIdAndUpdate(
      petid,
      {
        name,
        age,
        breed,
        color,
        description,
        imageLabel,
        category,
        image: imagepath,
        additionalImages: additionalImagesPaths,
      },
      { new: true }
    );

    res.json({ mesage: "pet updated", updatedPet });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePet = async (req, res) => {
  try {
    const { petid } = req.params;
    const deletedPet = await Pet.findByIdAndDelete(petid);
    res.json(`deletedPet: ${petid}`);
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
