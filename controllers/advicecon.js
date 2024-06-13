import advice from '../models/advice.js';

export const addadvice = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const { Title, Content, Keyword, URL, AddedBy, Date, Type } = req.body;
    const newAdvice = await Advice.create({ Title, Content, Keyword, URL, AddedBy, Date, Type });
    res.status(201).json(newAdvice);

  } catch (error) {
    res.status(500).json({ error: 'Failed to add advice !!' });
  }
};

export const getAlladvices = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const advices = await Advice.findAll();
    res.status(200).json(advices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch advices' });
  }
};

export const getadviceById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { id } = req.params;
    const advice = await Advice.findByPk(id);
    if (advice) {
      res.status(200).json(advice);
    } else {
      res.status(404).json({ error: 'Advice not found' });
    }
  } catch (error) {
    res.status (500).json({ error: 'Failed to bring advice' });
  }
};

export const getadviceByTitle = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { title } = req.query; 
    const advice = await Advice.findOne({ where: { Title: title } });
    if (advice) {
      res.status(200).json(advice);
    } else {
      res.status(404).json({ error: 'Advice not found !!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to bring advice' });
  }
};

export const updateadvice = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { id } = req.params;
    const { Title, Content, Keyword, URL, AddedBy, Date, Type } = req.body;
    const advice = await Advice.findByPk(id);
    if (advice) {
      advice.Title = Title;
      advice.Content = Content;
      advice.Keyword = Keyword;
      advice.URL = URL;
      advice.AddedBy = AddedBy;
      advice.Date = Date;
      advice.Type = Type;
      await advice.save();
      res.status(200).json(advice);
    } else {
      res.status(404).json({ error: 'Advice not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update advice' });
  }
};

export const deleteadvice = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { id } = req.params;
    const advice = await Advice.findByPk(id);
    if (advice) {
      await advice.destroy();
      res.status(200).json({ message: 'Advice deleted successfully' });
    } else {
      res.status(404).json({ error: 'Advice not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete advice' });
  }
};