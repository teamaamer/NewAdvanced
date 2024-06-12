import Product from '../models/product.js';
import Service from '../models/service.js';

export const addProduct = async (req, res) => {
    try {
        const { Name, Type, ProviderName } = req.body;
        const newProduct = await Product.create({ Name, Type, ProviderName });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product !! ' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Type, ProviderName } = req.body;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.Name = Name;
        product.Type = Type;
        product.ProviderName = ProviderName;
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product !!' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product !!' });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to bring products !!' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product by ID !!' });
    }
};

export const addService = async (req, res) => {
    try {
        const { Name, Type, ProviderName } = req.body;
        const newService = await Service.create({ Name, Type, ProviderName });
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add service !!' });
    }
};

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Type, ProviderName } = req.body;
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        service.Name = Name;
        service.Type = Type;
        service.ProviderName = ProviderName;
        await service.save();
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service !!' });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        await service.destroy();
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service !!' });
    }
};

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to bring services !!' });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch service by ID !!' });
    }
};

export const searchByType = async (req, res) => {
    try {
        const { type } = req.query;
        const products = await Product.findAll({ where: { Type: type } });
        const services = await Service.findAll({ where: { Type: type } });
        const result = { products, services };
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search by type !!' });
    }
};

export const searchByName = async (req, res) => {
    try {
        const { name } = req.query;
        const products = await Product.findAll({ where: { Name: name } });
        const services = await Service.findAll({ where: { Name: name } });
        const result = { products, services };
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search by name !!' });
    }
};

export const searchByProviderName = async (req, res) => {
    try {
        const { providerName } = req.query;
        const products = await Product.findAll({ where: { ProviderName: providerName } });
        const services = await Service.findAll({ where: { ProviderName: providerName } });
        const result = { products, services };
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search by provider name !!' });
    }
};

export const getProductsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const products = await Product.findAll({ where: { AddedBy: userId } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to bring products by user' });
    }
};

export const getServicesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const services = await Service.findAll({ where: { AddedBy: userId } });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to bring services by user' });
    }
};