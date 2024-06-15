// controllers/guideController.js
import Guide from '../models/guideModel.js';

export const addGuide = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { title, author, content, keyword } = req.body;
    const addedBy = req.user.id; 
    const newGuide = await Guide.create({
      Title: title,
      Auther: author,
      Content: content,
      Keyword: keyword,
      AddedBy: addedBy,
      Date: new Date()
    });

    res.status(201).json(newGuide);
  } catch (error) {
    console.error('Error adding guide:', error);
    res.status(500).json({ error: 'Failed to add guide' });
  }
};

export const getAllGuides = async (req, res) => {
  try {
    //include checking the token to check if user is logged in the system
    
//if(!req.user){
          //  return res.status(401).json({ error: 'User not authenticated' });
    const guides = await Guide.findAll();
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guides' });
  }
};

export const getGuideById = async (req, res) => {
  try {
    //include checking the token to check if user is logged in the system
    
//if(!req.user){
          //  return res.status(401).json({ error: 'User not authenticated' });
    const { id } = req.params;
    const guide = await Guide.findByPk(id);
    if (guide) {
      res.status(200).json(guide);
    } else {
      res.status(404).json({ error: 'Guide not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guide' });
  }
};

export const getGuideByTitle = async (req, res) => {
  try {
     //include checking the token to check if user is logged in the system
    
//if(!req.user){
          //  return res.status(401).json({ error: 'User not authenticated' });
    const { title } = req.params; // take it as const {title} = req.query; instead of params for better search handling 
    const guide = await Guide.findOne({ where: { title } });
    if (guide) {
      res.status(200).json(guide);
    } else {
      res.status(404).json({ error: 'Guide not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guide' });
  }
};

export const updateGuide = async (req, res) => {
  try { //include checking the token and the userId that added the guide
    
//if(!req.user){
          //  return res.status(401).json({ error: 'User not authenticated' });
    const { id } = req.params;
    const { title, content, author } = req.body;
    const guide = await Guide.findByPk(id);
    if (guide) {
      guide.title = title;
      guide.content = content;
      guide.author = author;
      await guide.save();
      res.status(200).json(guide);
    } else {
      res.status(404).json({ error: 'Guide not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update guide' });
  }
};

export const deleteGuide = async (req, res) => {
  try {
    //include checking the token and the userId that added the guide
    
//if(!req.user){
          //  return res.status(401).json({ error: 'User not authenticated' });
    const { id } = req.params;
    const guide = await Guide.findByPk(id);
    if (guide) {
      await guide.destroy();
      res.status(200).json({ message: 'Guide deleted successfully' });
    } else {
      res.status(404).json({ error: 'Guide not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete guide' });
  }
};

