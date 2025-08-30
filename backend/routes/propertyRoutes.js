
import express from 'express';
import connectDB from '../schema/db.js';
import Property from '../schema/schema.js';
const router = express.Router();


router.post('/properties', async(req, res) => {
    const { title, type, description, price, location,URL } = req.body;
    await connectDB();
    try {
        const newProperty =  await Property.create({ title, type, description, price, location, URL });
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create property' });
        
    }
});

router.get('/properties/render', async(req, res) => {
    await connectDB();
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});
router.get('/propertyDetails/:id',async(req,res)=>{
    try {
        const propertyid = req.params.id;

        await connectDB;

        const property = await Property.findById(propertyid);
        if (!property) {
            res.json("property not found ")
            
        } else {
            res.json(property);
        }
        
    } catch (error) {
        console.error("please try again", error)
        
    }




})
export default router;