import shopModel from "../models/shop.js";
class ShopController {
    static getAllShop = async (req, res) => {
        try {
            const allShop = await shopModel.find();

            // Convert Decimal128 to plain number
            const formattedShops = allShop.map(shop => ({
                ...shop._doc,
                product_price: parseFloat(shop.product_price)
            }));

            res.json(formattedShops);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    };

    static createShop = async (req, res) => {
        try {
            const { name, shop_address, product_category, product_price } = req.body;
            const result = new shopModel({
                name: name,
                shop_address: shop_address,
                product_category: product_category,
                product_price: product_price,
            });
            await result.save();
            res.status(200).json({ message: "Shop created successfully..." });
        } catch (error) {
            res.status(400).json({ error: "Invalid shop ID/Not Found" })
        };
    };

    static getsingleShopById = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await shopModel.findById(id);
            if (!result) {
                return res.status(404).json({ error: "Shop not found with this ID" })
            }
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: "Invalid shop ID/Not Found" });
        };
    };

    static updateShopById = async (req, res) => {
        try {
            const updateData = req.body;
            const id = req.params.id;
            const result = await shopModel.findByIdAndUpdate(id, updateData);
            if (!result) {
                return res.status(404).json({ message: "Shop not exist or alreadt Deleted.." });
            }
            res.status(200).send('Shop updated successfully...', result);
        } catch (error) {
            console.log(error.message);
        }
    };

    static deleteShopById = async (req, res) => {
        try {
            const result = await shopModel.findByIdAndDelete(req.params.id);
            if (!result) {
                return res.status(404).json({ message: "Shop Already deleted" });
            }
            res.status(200).json({ message: "Shop deleted successfully..." });
        } catch (error) {
            console.log(error.message);
        };
    };

    static partialupdateShop = async (req, res) => {
        try {
            const updateShop = await shopModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body }, //This updates only the fields provided
                { new: true, runvalidators: true }
            );

            if (!updateShop) {
                return res.status(404).json({ message: "Shop not found" });
            }
            res.json(updateShop);
        } catch (error) {
            res.status(400).json({ error: error.message });
        };
    };
};

export default ShopController;
