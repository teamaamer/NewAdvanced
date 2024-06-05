import Garden from "../models/gardenModel.js";

export async function addGarden(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userId = req.user.id;
    const type = req.user.type;

    if (type != "Manager") {
      return res.status(401).json({ error: "Not permitted to add garden" });
    }
    const { gardenName, description, location, gardenCity, maxMemebrs } =
      req.body;

    if (
      !gardenName ||
      !description ||
      !location ||
      !gardenCity ||
      !maxMemebrs
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const existingGarden = await Garden.findOne({
      where: { Name: gardenName },
    });

    if (existingGarden) {
      return res.status(400).json({ error: "Garden already exists" });
    }

    const garden = await Garden.create({
      Name: gardenName,
      ManagerID: userId,
      Location: location,
      City: gardenCity,
      Description: description,
      MaxMembers: maxMemebrs,
    });
    res.status(200).json({
      garden,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot Add Garden" });
  }
}

export const getAllGardens = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userId = req.user.id;
    const type = req.user.type;

    if (type != "Manager") {
      return res.status(401).json({ error: "Not permitted to add garden" });
    }

    const gardens = await Garden.findAll();
    res.status(200).json(gardens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGardenById = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const userId = req.user.id;
  const type = req.user.type;

  if (type != "Manager") {
    return res.status(401).json({ error: "Not permitted to add garden" });
  }

  const { id } = req.params;
  try {
    const garden = await Garden.findByPk(id);
    if (!garden) {
      return res.status(404).json({ error: "Garden not found" });
    }
    res.status(200).json(garden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGarden = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const userId = req.user.id;
  const type = req.user.type;

  if (type != "Manager") {
    return res.status(401).json({ error: "Not permitted to add garden" });
  }

  const { id } = req.params;
  const { Name, Location, City, Description, MaxMembers } = req.body;

  try {
    const garden = await Garden.findByPk(id);
    if (!garden) {
      return res.status(404).json({ error: "Garden not found" });
    }

    if (garden.Name == Name) {
      return res.status(400).json({ error: "Garden already exists" });
    }

    await garden.update({
      Name: Name,
      Location: Location,
      City: City,
      Description: Description,
      MaxMembers: MaxMembers,
    });
    res.status(200).json(garden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGarden = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const userId = req.user.id;
  const type = req.user.type;

  if (type != "Manager") {
    return res.status(401).json({ error: "Not permitted to add garden" });
  }

  const { id } = req.params;
  try {
    const garden = await Garden.findByPk(id);
    if (!garden) {
      return res.status(404).json({ error: "Garden not found" });
    }
    await garden.destroy();
    res.status(204).json({ message: "Garden deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
